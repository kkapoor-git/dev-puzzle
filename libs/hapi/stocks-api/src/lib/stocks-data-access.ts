import axios from 'axios';
import {loadConfig} from "../../../data-access-config/src";
import {HttpRequest, IPriceQueryRequest, IPriceQueryResponse} from "./interfaces/stocks-api-interfaces";

export class StocksDataAccess {
  constructor() {}

  private static getStocksRequest(priceRequest: IPriceQueryRequest) : HttpRequest<any> {

   const configData = loadConfig();
   if (priceRequest.isCustomDates && priceRequest.period === 'max') {
     return {
       url:configData.apiURL+'/beta/stock/'+priceRequest.symbol+'/chart/max?token='+configData.apiKey,
     };
   } else {
     return {
       url: configData.apiURL + '/beta/stock/' + priceRequest.symbol + '/chart/' + priceRequest.period + '?token=' + configData.apiKey,
     };
   }

  }

  public async invokeCallForData(priceRequest: IPriceQueryRequest): Promise<IPriceQueryResponse>{
    try {
      return await axios.get(StocksDataAccess.getStocksRequest(priceRequest).url);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


