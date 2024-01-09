import { createContext, useContext, useState } from 'react';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [selectedModel, setSelectedModelName] = useState(null); // Add selectedModel state

  return (
    <CarContext.Provider value={{  selectedModel, setSelectedModelName }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => useContext(CarContext);
