import {StocksDataAccess} from "./stocks-data-access";
import {CacheClient} from "./cache-client";
import {isNullOrUndefined} from "util";
import {IPriceQueryRequest, IPriceQueryResponse} from "./interfaces/stocks-api-interfaces";


export class StocksService {
    private readonly dataAccess: StocksDataAccess;
    private cache: CacheClient;

    constructor() {
        this.dataAccess = new StocksDataAccess();
        const ttl = 60 * 60; // cache for 1 Hour
        this.cache = new CacheClient(ttl); // Create a new cache service instance
    }

    async getStocks(priceRequest: IPriceQueryRequest) {
        const cacheKey = (priceRequest.isCustomDates)
            ? priceRequest.symbol + '-' + priceRequest.period + '-' + priceRequest.fromDate + '-' + priceRequest.toDate
            : priceRequest.symbol + '-' + priceRequest.period;

        let processedResponse: any = [];
        let response = await this.cache.get(cacheKey);
        if (isNullOrUndefined(response)) { // if cache not exist....
          try {
            response = await this.dataAccess.invokeCallForData(priceRequest); // fetch data from api...
          }
          catch (e) {
           throw e; // can form exception and handle it more gracefully..
          }
            if (!isNullOrUndefined(response)) {
                if (priceRequest.isCustomDates) { // if request has custom dates , filterData from query...
                    processedResponse = <IPriceQueryResponse>response['data'].filter
                    (s => {
                        return new Date(s.date) >= new Date(priceRequest.fromDate) && new Date(s.date) <= new Date(priceRequest.toDate)
                    });
                } else { // if custom dates are not present then just map response....
                    processedResponse = response['data'];
                }
                console.log('Setting up cache for Key', cacheKey);
                this.cache.set(cacheKey, processedResponse);

            }
        } else { // if cache key exists serve from cache....
            processedResponse = response;
            console.log('Serving from cache key', cacheKey);
        }
        return processedResponse;
    }


}
