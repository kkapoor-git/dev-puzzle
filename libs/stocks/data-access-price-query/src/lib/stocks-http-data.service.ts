import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IPriceQueryRequest, IPriceQueryResponse} from './interfaces/price-query-data.interface';
import {HttpClient} from "@angular/common/http";
import {StocksAppConfig, StocksAppConfigToken} from "@coding-challenge/stocks/data-access-app-config";
import {isNullOrUndefined} from "util";

@Injectable()
export class StocksHttpDataService {

  constructor(protected httpClient: HttpClient ,
              @Inject(StocksAppConfigToken) private env: StocksAppConfig,){}

  public fetchStocksData(queryRequest: IPriceQueryRequest): Observable<IPriceQueryResponse> {

    const isCustomDates = (!isNullOrUndefined(queryRequest.fromDate) && !isNullOrUndefined(queryRequest.toDate));

    return this.httpClient.get<IPriceQueryResponse>
    (
        `${this.env.hapiApiURL}?symbol=${queryRequest.symbol}&period=${queryRequest.period}&isCustomDates=${isCustomDates}&fromDate=${queryRequest.fromDate}&toDate=${queryRequest.toDate}`
    );
  }
}
