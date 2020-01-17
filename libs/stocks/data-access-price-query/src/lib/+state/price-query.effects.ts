import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import {map, switchMap} from 'rxjs/operators';
import * as fromPriceQueryStateActions  from './price-query.actions';
import {StocksHttpDataService} from "../stocks-http-data.service";
import {
    PriceQueryTransformer
} from "./price-query-transformer.util";
import {PriceQueryPartialState} from "./price-query.entities";

@Injectable()
export class PriceQueryEffects {
    @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
        fromPriceQueryStateActions.PriceQueryActionTypes.FETCH_PRICE_QUERY,
        {
            run: (action:fromPriceQueryStateActions.FetchPriceQuery) => {
                return this.stocksHttpDataService
                    .fetchStocksData(action.payload)
                    .pipe(
                        map(resp => this.priceQueryTransformer.transformPriceQueryResponse(resp)),
                        switchMap(res => [
                            new fromPriceQueryStateActions.SetSelectedSymbol(action.payload.symbol),
                            new fromPriceQueryStateActions
                                .FetchPriceQuerySuccess(res)
                        ])
                    );
            },

            onError: (action: fromPriceQueryStateActions.FetchPriceQuery, error) => {
                return new fromPriceQueryStateActions.PriceQueryFetchError(this.priceQueryTransformer.transformErrorResponse(error,action.payload.symbol,action.payload.period));
            }
        }
    );

    constructor(
        private httpClient: HttpClient,
        private dataPersistence: DataPersistence<PriceQueryPartialState>,
        private stocksHttpDataService: StocksHttpDataService,
        private priceQueryTransformer: PriceQueryTransformer
    ) {}
}
