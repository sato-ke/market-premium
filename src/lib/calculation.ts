import type { ChartData, LineData } from "./types";

export function ema(data: ChartData[], period: number): LineData[] {
  const ema = [data[0].close];
  for (let i = 1; i < data.length; i++) {
    const k = 2 / (period + 1);
    ema.push(data[i].close * k + ema[i - 1] * (1 - k));
  }
  return ema.map((value, index) => ({
    time: data[index].time,
    value,
  }));
}

export function hlc3(data: ChartData[]): LineData[] {
  return data.map(({ time, high, low, close }) => ({
    time,
    value: (high + low + close) / 3,
  }));
}

export function sma(data: ChartData[], period: number): LineData[] {
  const sma = [data[0].close];
  for (let i = 1; i < data.length; i++) {
    sma.push(
      (data[i].close +
        sma[i - 1] * period -
        (i >= period ? data[i - period].close : 0)) /
        period
    );
  }
  return sma.map((value, index) => ({
    time: data[index].time,
    value,
  }));
}

export function iwma(data: LineData[], period: number): LineData[] {
  // index weighted moving average
  // 新しいデータの重みを大きくするために、インデックスを使用して重みを計算する
  // 重みは、1からperiodまでのインデックスの逆数の合計で割ったもの
  const weights = Array.from({ length: period }, (_, i) => 1 / (i + 1));
  const weightsSum = weights.reduce((acc, weight) => acc + weight, 0);
  const iwma = [data[0].value];
  for (let i = 1; i < data.length; i++) {
    const sum = weights.reduce((acc, weight, index) => {
      const dataIndex = i - index;
      if (dataIndex >= 0) {
        return acc + data[dataIndex].value * weight;
      }
      return acc;
    }, 0);
    iwma.push(sum / weightsSum);
  }
  return iwma.map((value, index) => ({
    time: data[index].time,
    value,
  }));
}
