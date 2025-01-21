"use client";

import { useEffect, useRef, useState } from "react";
import { useChartContext } from "@/context/ChartContext";
import { getPremiumIndex } from "@/lib/binance";
import { ema, hlc3, iwma } from "@/lib/calculation";
import type { LineData } from "@/lib/types";

interface ChartProps {
  symbol: string;
}

const drawChart = (
  canvas: HTMLCanvasElement,
  ema: LineData[],
  iwma: LineData[]
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  // scaleの設定
  const padding = 0.03;
  const max = Math.max(...ema.map((d) => d.value), 0.06 + padding);
  const min = Math.min(...ema.map((d) => d.value), -0.04 - padding);
  const offsetMax = Math.max(Math.abs(max), Math.abs(min));
  const yScale = canvas.height / 2 / offsetMax;
  const xScale = canvas.width / ema.length;
  const mid = 0;

  // iwmaの最後の値によって色を変えた枠線を描画する
  const lastIwmaValue = iwma[iwma.length - 1].value;
  let color = "rgba(34, 197, 94, 1)";
  switch (true) {
    case lastIwmaValue < -0.04:
      color = "rgba(239, 68, 68, 1)";
      break;
    case lastIwmaValue < 0:
      color = "rgba(249, 115, 22, 1)";
      break;
    case lastIwmaValue < 0.06:
      color = "rgba(59, 130, 246, 1)";
      break;
    default:
      break;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // midが中心になるようにする
  ctx.beginPath();
  const yOffset = mid * yScale - canvas.height / 2;
  ctx.translate(0, yOffset);

  // ema plot
  // ctx.strokeStyle = "rgba(101, 228, 43, 1)";
  // ctx.lineWidth = 1;
  // ctx.moveTo(0, canvas.height - ema[0].value * yScale);
  // for (let i = 1; i < ema.length; i++) {
  //   ctx.lineTo(i * xScale, canvas.height - ema[i].value * yScale);
  // }
  // ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "rgb(215, 245, 49)";
  ctx.lineWidth = 1;
  ctx.moveTo(0, canvas.height - iwma[0].value * yScale);
  for (let i = 1; i < iwma.length; i++) {
    ctx.lineTo(i * xScale, canvas.height - iwma[i].value * yScale);
  }
  ctx.stroke();

  // zero line
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();

  // 半透明のグレーの長方形を描画する
  ctx.fillStyle = "rgba(252, 252, 252, 0.05)";
  ctx.fillRect(0, canvas.height - 0.06 * yScale, canvas.width, 0.1 * yScale);
  ctx.restore();
};

export function Chart({ symbol }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useChartContext();
  const [chartData, setChartData] = useState<{
    emaData: LineData[];
    iwmaData: LineData[];
  } | null>(null);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPremiumIndex(symbol);
      const emaData = ema(data, 6);
      const iwmaData = iwma(hlc3(data), 96);
      setChartData({ emaData, iwmaData });
    };
    fetchData();
  }, [symbol]);

  // draw
  useEffect(() => {
    if (!canvasRef.current || !chartData) return;
    const canvas = canvasRef.current;
    drawChart(canvas, chartData.emaData, chartData.iwmaData);
  }, [symbol, chartData, width, height]);

  return (
    <div>
      <span className="text-white text-sm">{symbol}</span>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
