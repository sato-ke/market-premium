import { useChartContext } from "@/context/ChartContext";
import { FormEvent, useState } from "react";

export const ChartSettingForm = () => {
  const { width, height, updateSetting } = useChartContext();
  const [formWidth, setFormWidth] = useState(width);
  const [formHeight, setFormHeight] = useState(height);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSetting(formWidth, formHeight);
  };

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
