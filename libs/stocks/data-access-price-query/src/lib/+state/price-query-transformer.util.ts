import {map, pick} from 'lodash-es';
import {parse} from 'date-fns';
import {
    IPriceQuery,
    IPriceQueryError,
} from "../interfaces/price-query-data.interface";
import {Injectable} from "@angular/core";

@Injectable()
export class PriceQueryTransformer {
    constructor(){}

    public transformPriceQueryResponse(
        response: any
    ): IPriceQuery[] {
        return map(
            response,
            responseItem =>
                ({
                    ...pick(responseItem, [
                        'date',
                        'open',
                        'high',
                        'low',
                        'close',
                        'volume',
                        'change',
                        'changePercent',
                        'label',
                        'changeOverTime'
                    ]),
                    dateNumeric: parse(responseItem.date).getTime()
                } as IPriceQuery)
        );
    }

    public  transformErrorResponse(error: any, symbol: string, timePeriod: string): IPriceQueryError {
        return {
            errorDetails: error,
            symbol: symbol,
            timePeriod: timePeriod
        };
    }
}
