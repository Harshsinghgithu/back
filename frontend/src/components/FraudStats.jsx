import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const FraudStats = ({ summary }) => {
  if (!summary) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color: '#6c757d'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
        <p style={{ margin: '0', fontSize: '16px' }}>No statistics available. Upload transaction data to see fraud analysis.</p>
      </div>
    );
  }

  const data = [
    {
      name: 'Normal Transactions',
      value: summary.total_transactions - summary.fraud_count,
      color: '#00b894',
      percentage: (((summary.total_transactions - summary.fraud_count) / summary.total_transactions) * 100).toFixed(1)
    },
    {
      name: 'Fraudulent Transactions',
      value: summary.fraud_count,
      color: '#d63031',
      percentage: ((summary.fraud_count / summary.total_transactions) * 100).toFixed(1)
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold', color: data.color }}>
            {data.name}
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Count: {data.value} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '25px',
        padding: '15px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>📊 Fraud Detection Overview</h3>
        <p style={{ margin: '0', opacity: '0.9', fontSize: '14px' }}>
          Analysis of {summary.total_transactions} transactions
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          height: '300px'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {data.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: `2px solid ${item.color}`
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: item.color
              }}></div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#495057' }}>
                {item.name}: {item.value} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>

        <div style={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>
            Fraud Detection Rate
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: summary.fraud_count > 0 ? '#d63031' : '#00b894'
          }}>
            {((summary.fraud_count / summary.total_transactions) * 100).toFixed(2)}%
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '5px' }}>
            {summary.fraud_count > 0 ? '⚠️ Fraud detected in transactions' : '✅ All transactions appear legitimate'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudStats;