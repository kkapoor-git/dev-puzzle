export interface IPriceQueryRequest{
  symbol?: string;
  period?: string;
  fromDate?: string;
  toDate?: string
}
export interface IPriceQueryResponse {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  uOpen: number;
  uClose: number;
  uHigh: number;
  uLow: number;
  uVolume: number;
  change: number;
  changePercent: number;
  label: string;
  changeOverTime: number;
}

export interface IPriceQuery {
  date: string;
  dateNumeric: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  label: string;
  changeOverTime: number;
}

export interface IPriceQueryError {
  errorDetails: string;
  symbol: string;
  timePeriod: string
}
