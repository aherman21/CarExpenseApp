import React, { createContext, useState, useContext } from 'react';

//this makes the fare to be a global variable so that it can be used in both MainScreen and SetFareScreen when navigating back and forth

const FareContext = createContext({
    fare: '0.05', // Default value
    setFare: () => {},
  });

export const useFare = () => useContext(FareContext);

export const FareProvider = ({ children }) => {
  const [fare, setFare] = useState('0.05');

  return (
    <FareContext.Provider value={{ fare, setFare }}>
      {children}
    </FareContext.Provider>
  );
};