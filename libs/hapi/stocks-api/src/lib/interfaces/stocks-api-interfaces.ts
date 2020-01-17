export interface IPriceQueryRequest{
    symbol?: string;
    period?: string;
    isCustomDates?: boolean;
    fromDate?: string;
    toDate?:string;
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

export interface HttpRequest<T> {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: {};
}
