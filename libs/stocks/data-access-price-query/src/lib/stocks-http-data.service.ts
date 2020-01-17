import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IPriceQueryRequest, IPriceQueryResponse} from './interfaces/price-query-data.interface';
import {HttpClient} from "@angular/common/http";
import {StocksAppConfig, StocksAppConfigToken} from "@coding-challenge/stocks/data-access-app-config";

@Injectable()
export class StocksHttpDataService {

  constructor(protected httpClient: HttpClient ,
              @Inject(StocksAppConfigToken) private env: StocksAppConfig,){}

  public fetchStocksData(queryRequest: IPriceQueryRequest): Observable<IPriceQueryResponse> {
    return this.httpClient.get<IPriceQueryResponse>
    (`${this.env.apiURL}/beta/stock/${queryRequest.symbol}/chart/${
        queryRequest.period
    }?token=${this.env.apiKey}`)
  }
}
