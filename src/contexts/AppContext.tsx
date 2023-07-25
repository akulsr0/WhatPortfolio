import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { IInvestment } from "../types";

interface IAppContext {
  investments: IInvestment[];
  setInvestments: React.Dispatch<React.SetStateAction<IInvestment[]>>;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [investments, setInvestments] = useState<IInvestment[]>(() => {
    const savedInvestmentsStr = localStorage.getItem("@investments");
    const savedInvestments = savedInvestmentsStr
      ? JSON.parse(savedInvestmentsStr)
      : [];
    return savedInvestments;
  });

  const contextVal = useMemo(
    () => ({
      investments,
      setInvestments,
    }),
    [investments]
  );

  return (
    <AppContext.Provider value={contextVal}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const contextData = useContext(AppContext);
  if (contextData == null) {
    throw new Error("Use `useAppContext` within AppProvider");
  }
  return contextData;
};
