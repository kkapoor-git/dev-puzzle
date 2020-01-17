import * as fromPriceQueryStateActions  from './price-query.actions';
import {IPriceQuery} from "../interfaces/price-query-data.interface";
import {initialState, IPriceQueryState, priceQueryAdapter} from "./price-query.entities";


export function priceQueryReducer(
    state: IPriceQueryState = initialState,
    action: fromPriceQueryStateActions.PriceQueryActionUnion
): IPriceQueryState {
  switch (action.type) {

    case fromPriceQueryStateActions.PriceQueryActionTypes.FETCH_PRICE_QUERY_SUCCESS : {
      return priceQueryAdapter.addAll(<IPriceQuery[]>action.payload, {
        ...state,
        isLoaded: true});

    }
    case fromPriceQueryStateActions.PriceQueryActionTypes.SET_SELECTED_SYMBOL: {
      return {
        ...state,
        selectedSymbol: action.payload.toString()
      };
    }
    case fromPriceQueryStateActions.PriceQueryActionTypes.FETCH_PRICE_QUERY_ERROR : {
      return priceQueryAdapter.removeAll(state);
    }
  }
  return state;
}
