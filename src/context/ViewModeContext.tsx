import React, { createContext, useContext, useState, useEffect } from 'react';

interface ViewModeContextType {
  isPhoneSimulator: boolean;
  setPhoneSimulator: React.Dispatch<React.SetStateAction<boolean>>;
  togglePhoneSimulator: () => void;
  isMobileView: boolean;
}

const ViewModeContext = createContext<ViewModeContextType>({
  isPhoneSimulator: false,
  setPhoneSimulator: () => {},
  togglePhoneSimulator: () => {},
  isMobileView: false,
});

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPhoneSimulator, setPhoneSimulator] = useState<boolean>(false);
  const [isScreenMobile, setIsScreenMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePhoneSimulator = () => {
    setPhoneSimulator((prev) => !prev);
  };

  // Mobile mode is true if explicitly viewing through Phone Simulator OR on a real mobile screen (< 768px)
  const isMobileView = isPhoneSimulator || isScreenMobile;

  return (
    <ViewModeContext.Provider
      value={{
        isPhoneSimulator,
        setPhoneSimulator,
        togglePhoneSimulator,
        isMobileView,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => useContext(ViewModeContext);
