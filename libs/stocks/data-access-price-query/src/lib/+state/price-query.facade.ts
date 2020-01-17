import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPriceQueryStateActions  from './price-query.actions';
import {getAllPriceQueries} from './price-query.selectors';
import { map, skip } from 'rxjs/operators';
import {IPriceQueryRequest} from "../interfaces/price-query-data.interface";
import {PriceQueryPartialState} from "./price-query.entities";

@Injectable()
export class PriceQueryFacade {

  priceQueries$ = this.store.pipe(
      select(getAllPriceQueries),
      skip(1),
      map(priceQueries =>
          priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
      )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, period: string) {

    const queryRequest: IPriceQueryRequest = {
      period: period,
      symbol: symbol
    };

    this.store.dispatch(new fromPriceQueryStateActions.FetchPriceQuery(queryRequest));
  }
}
