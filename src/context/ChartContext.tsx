import { createContext, useContext, useState } from "react";
import type { Timeframe } from "@/lib/types";

type ChartContextType = {
  width: number;
  height: number;
  timeframe: Timeframe;
  updateSetting: (width: number, height: number) => void;
  setTimeframe: (timeframe: Timeframe) => void;
};

export const ChartContext = createContext<ChartContextType>({
  width: 200,
  height: 60,
  timeframe: '24h',
  updateSetting: () => {},
  setTimeframe: () => {},
});

export const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(60);
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');

  const updateSetting = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  return (
    <ChartContext.Provider value={{ width, height, timeframe, updateSetting, setTimeframe }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);
