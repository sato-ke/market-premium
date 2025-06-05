import { useChartContext } from "@/context/ChartContext";
import type { Timeframe } from "@/lib/types";
import { FormEvent, useState } from "react";

export const ChartSettingForm = () => {
  const { width, height, timeframe, updateSetting, setTimeframe } = useChartContext();
  const [formWidth, setFormWidth] = useState(width);
  const [formHeight, setFormHeight] = useState(height);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSetting(formWidth, formHeight);
  };

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
  };

  const timeframeOptions: { value: Timeframe; label: string }[] = [
    { value: '1h', label: '1時間' },
    { value: '4h', label: '4時間' },
    { value: '24h', label: '24時間' },
    { value: '1w', label: '1週間' },
  ];

  return (
    <form onSubmit={handleSubmit} className="mb-2 p-2 border rounded">
      <div className="flex items-center gap-2">
        <label className="flex items-center">
          Width:
          <input
            type="number"
            value={formWidth}
            onChange={(e) => setFormWidth(Number(e.target.value))}
            className="border ml-2 px-2 py-1 text-black"
          />
        </label>
        <label className="flex items-center">
          Height:
          <input
            type="number"
            value={formHeight}
            onChange={(e) => setFormHeight(Number(e.target.value))}
            className="border ml-2 px-2 py-1 text-black"
          />
        </label>
        <label className="flex items-center">
          時間軸:
          <select
            value={timeframe}
            onChange={(e) => handleTimeframeChange(e.target.value as Timeframe)}
            className="border ml-2 px-2 py-1 text-black"
          >
            {timeframeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          更新
        </button>
      </div>
    </form>
  );
};
