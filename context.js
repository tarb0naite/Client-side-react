import { createContext, useContext, useState } from 'react';

const SubServiceContext = createContext();

export const SubServiceProvider = ({ children }) => {
  const [selectedSubService, setSelectedSubService] = useState(null);

  return (
    <SubServiceContext.Provider value={{ selectedSubService, setSelectedSubService }}>
      {children}
    </SubServiceContext.Provider>
  );
};

export const useSubService = () => useContext(SubServiceContext);
