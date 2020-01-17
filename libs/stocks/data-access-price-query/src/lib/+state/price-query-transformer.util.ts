import {map, pick} from 'lodash-es';
import {parse} from 'date-fns';
import {
    IPriceQuery,
    IPriceQueryError,
    IPriceQueryRequest,
    IPriceQueryResponse
} from "../interfaces/price-query-data.interface";
import {isNullOrUndefined} from "util";
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

    public filterDataByDateRange(request: IPriceQueryRequest, response: any): IPriceQueryResponse[] {
        const respData: IPriceQueryResponse[] = [];
        if (!isNullOrUndefined(request.fromDate) && !isNullOrUndefined(request.toDate)) {
            respData.push(response.filter(s => {
                return new Date(s.date) >= new Date(request.fromDate) && new Date(s.date) <= new Date(request.toDate)
            }));
        } else {
            respData.push(response);
        }

        return respData;
    }
}
