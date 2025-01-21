"use client";
import { useState, useEffect } from "react";
import { Chart } from "@/components/Chart";
import { ChartSettingForm } from "@/components/ChartSettingForm";
import { ChartProvider } from "@/context/ChartContext";
import { getSymbols } from "@/lib/binance";

export default function Page() {
  const [symbols, setSymbols] = useState<string[]>([]);
  useEffect(() => {
    getSymbols().then((symbols) => {
      setSymbols(symbols.map((symbol) => symbol.symbol));
    });
  }, []);
  return (
    <ChartProvider>
      <div className="container mx-auto px-2">
        <ChartSettingForm />
        <div className="flex flex-wrap gap-0.5">
          {symbols.map((symbol) => (
            <div key={symbol}>
              <Chart symbol={symbol} />
            </div>
          ))}
        </div>
      </div>
    </ChartProvider>
  );
}
