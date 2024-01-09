
import React, { createContext, useState } from 'react';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export default BrandContext;
