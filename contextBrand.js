import { createContext, useContext, useState } from 'react';

const CarBrandContext = createContext();

export const CarBrandProvider = ({ children }) => {
  const [selectedBrandName, setSelectedBrandName] = useState(null);

  return (
    <CarBrandContext.Provider value={{ selectedBrandName, setSelectedBrandName }}>
      {children}
    </CarBrandContext.Provider>
  );
};

export const useBrandService = () => useContext(CarBrandContext);
