import { Action } from '@ngrx/store';
import {IPriceQueryRequest, IPriceQuery, IPriceQueryError} from "../interfaces/price-query-data.interface";

export interface IPriceQueryDataActions extends Action {
  type: string;
  payload?: IPriceQuery | IPriceQueryError | any
}

export enum PriceQueryActionTypes {
  FETCH_PRICE_QUERY = '[PriceQuery] Get Query Data',
  FETCH_PRICE_QUERY_SUCCESS = '[PriceQuery] Get Query Data Success',
  FETCH_PRICE_QUERY_ERROR = '[PriceQuery] Get Query Data Error',
  SET_SELECTED_SYMBOL = '[PriceQuery] Set Selected Symbol',
}

export class FetchPriceQuery implements IPriceQueryDataActions {
  public readonly type: PriceQueryActionTypes = PriceQueryActionTypes.FETCH_PRICE_QUERY;
  constructor(public payload: IPriceQueryRequest) {}
}

export class FetchPriceQuerySuccess implements IPriceQueryDataActions {
  public readonly type: PriceQueryActionTypes = PriceQueryActionTypes.FETCH_PRICE_QUERY_SUCCESS;
  constructor(public payload: IPriceQuery[]) {}
}

export class PriceQueryFetchError implements IPriceQueryDataActions {
  public readonly type: PriceQueryActionTypes = PriceQueryActionTypes.FETCH_PRICE_QUERY_ERROR;
  constructor(public payload: IPriceQueryError) {}
}

export class SetSelectedSymbol implements IPriceQueryDataActions {
  readonly type = PriceQueryActionTypes.SET_SELECTED_SYMBOL;
  constructor(public payload: string) {}
}

export type PriceQueryActionUnion = FetchPriceQuery
    | FetchPriceQuerySuccess
    | PriceQueryFetchError
    | SetSelectedSymbol;
