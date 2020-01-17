import { createFeatureSelector, createSelector } from '@ngrx/store';

import {IPriceQueryState, PRICEQUERY_FEATURE_KEY, priceQueryAdapter} from "./price-query.entities";

const getPriceQueryState = createFeatureSelector<IPriceQueryState>(
    PRICEQUERY_FEATURE_KEY
);

const { selectAll } = priceQueryAdapter.getSelectors();

export const getAllPriceQueries = createSelector(
    getPriceQueryState,
    selectAll
);
