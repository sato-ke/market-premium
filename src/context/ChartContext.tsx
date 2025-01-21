import { createContext, useContext, useState } from "react";

type ChartContextType = {
  width: number;
  height: number;
  updateSetting: (width: number, height: number) => void;
};

export const ChartContext = createContext<ChartContextType>({
  width: 200,
  height: 60,
  updateSetting: () => {},
});

export const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(60);

  const updateSetting = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  return (
    <ChartContext.Provider value={{ width, height, updateSetting }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);
