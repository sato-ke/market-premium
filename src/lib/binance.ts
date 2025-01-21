import type { Market } from "ccxt";
import ccxt from "ccxt";
import type { ChartData, Symbol, KlineResponse } from "./types";

const exchange = new ccxt.binanceusdm();

export async function getSymbols(): Promise<Symbol[]> {
  const markets = await exchange.loadMarkets();
  console.log(markets);
  return Object.values(markets)
    .filter(
      (market): market is Market =>
        market !== undefined &&
        market.quote === "USDT" &&
        market.swap &&
        (market.active !== undefined ? market.active : true)
    )
    .map((market) => ({
      symbol: market?.id?.toString() || "",
      baseAsset: market?.base?.toString() || "",
      quoteAsset: market?.quote?.toString() || "",
    }));
}

export async function getOHLCV(
  symbol: string,
  timeframe = "1m"
): Promise<ChartData[]> {
  const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, 1440);
  return ohlcv.map(([timestamp, open, high, low, close]) => ({
    time: Math.floor((timestamp ?? 0) / 1000),
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
  }));
}

export async function getPremiumIndex(symbol: string): Promise<ChartData[]> {
  const params = {
    symbol,
    interval: "5m",
  };
  const ohlcv = (await exchange.fapiPublicGetPremiumIndexKlines(
    params
  )) as KlineResponse;
  return ohlcv.map(([timestamp, open, high, low, close]) => ({
    time: Math.floor((timestamp ?? 0) / 1000),
    open: Number(open) * 100,
    high: Number(high) * 100,
    low: Number(low) * 100,
    close: Number(close) * 100,
  }));
}
