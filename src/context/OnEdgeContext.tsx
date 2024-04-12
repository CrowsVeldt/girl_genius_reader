import { createContext, useState } from "react";

type OnEdgeContextType = {
  getOnEdge: () => boolean;
  changeOnEdge: (value: boolean) => void;
};

export const OnEdgeContext = createContext<OnEdgeContextType>(
  null as unknown as OnEdgeContextType
);

const OnEdgeProvider = ({ children }: { children: any }) => {
  const [onEdge, setOnEdge] = useState(true);

  const getOnEdge = () => {
    return onEdge;
  };

  const changeOnEdge = (value: boolean) => {
    setOnEdge(value);
  };

  const value = {
    getOnEdge,
    changeOnEdge,
  };

  return (
    <OnEdgeContext.Provider value={value}>{children}</OnEdgeContext.Provider>
  );
};

export default OnEdgeProvider;
