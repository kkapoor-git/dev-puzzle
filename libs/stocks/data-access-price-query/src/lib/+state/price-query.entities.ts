import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {IPriceQuery} from "../interfaces/price-query-data.interface";

export const PRICEQUERY_FEATURE_KEY = 'priceQuery';

export interface PriceQueryPartialState {
  readonly [PRICEQUERY_FEATURE_KEY]: IPriceQueryState;
}

export interface IPriceQueryState extends EntityState<IPriceQuery> {
  selectedSymbol: string;
  isLoaded: Boolean;
  errorDetails: string;
}

export const priceQueryAdapter: EntityAdapter<IPriceQuery> = createEntityAdapter<
  IPriceQuery
  >({
  selectId: (priceQuery: IPriceQuery) => priceQuery.dateNumeric,
  sortComparer: sortByDateNumeric
});

 function sortByDateNumeric(a: IPriceQuery, b: IPriceQuery): number {
  return a.dateNumeric - b.dateNumeric;
}

export const initialState: IPriceQueryState = priceQueryAdapter.getInitialState({
  selectedSymbol: '',
  isLoaded: false,
  errorDetails: ''
});

