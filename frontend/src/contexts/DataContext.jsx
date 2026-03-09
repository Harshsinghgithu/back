import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState(null);

  const updateData = (data) => {
    setUploadedData(data);
  };

  const clearData = () => {
    setUploadedData(null);
  };

  return (
    <DataContext.Provider value={{ uploadedData, updateData, clearData }}>
      {children}
    </DataContext.Provider>
  );
};