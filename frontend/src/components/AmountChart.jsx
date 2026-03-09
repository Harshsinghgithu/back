import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AmountChart = ({ data, type = 'customer_id' }) => {
  if (!data || !data.all_records) return null;

  // Aggregate amounts by customer_id or merchant_id
  const amounts = data.all_records.reduce((acc, record) => {
    const key = record[type];
    const amount = record.amount || 0;
    if (!acc[key]) {
      acc[key] = { total: 0, count: 0, avg: 0 };
    }
    acc[key].total += amount;
    acc[key].count += 1;
    acc[key].avg = acc[key].total / acc[key].count;
    return acc;
  }, {});

  // Convert to array and sort by total amount (top 10)
  const chartData = Object.entries(amounts)
    .map(([id, stats]) => ({
      id: id.toString(),
      total: Number(stats.total.toFixed(2)),
      count: stats.count,
      average: Number(stats.avg.toFixed(2))
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10); // Top 10

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {type === 'customer_id' ? 'Customer' : 'Merchant'}: {label}
          </p>
          <p style={{ margin: 0, color: '#666' }}>
            Total Amount: ${data.total.toLocaleString()}
          </p>
          <p style={{ margin: 0, color: '#666' }}>
            Transaction Count: {data.count}
          </p>
          <p style={{ margin: 0, color: '#666' }}>
            Average: ${data.average.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Top 10 {type === 'customer_id' ? 'Customers' : 'Merchants'} by Total Amount
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Amount ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmountChart;