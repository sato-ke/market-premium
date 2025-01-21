export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Symbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export type KlineResponse = [
  number, // timestamp
  string, // open
  string, // high
  string, // low
  string, // close
  string, // ignore
  number, // closeTime
  string, // ignore
  number, // count
  string, // ignore
  string, // ignore
  string // ignore
][];

export interface LineData {
  time: number;
  value: number;
}
