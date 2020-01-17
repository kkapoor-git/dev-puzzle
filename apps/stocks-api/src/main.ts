/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import {Server} from 'hapi';
import {StocksService} from "../../../libs/hapi/stocks-api/src/lib/stocks-service";
import {isNullOrUndefined} from "util";
import {IPriceQueryRequest} from "../../../libs/hapi/stocks-api/src/lib/interfaces/stocks-api-interfaces";

const init = async () => {
  const stocksService = new StocksService();

  const server = new Server({
    port: 3333,
    host: 'localhost',
    "routes": {
      "cors": true
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/stocks',
    handler: async (request, h) => {
      const query = request.query;
      let response: any = '';

      if (query) {
        const priceRequest: IPriceQueryRequest = {
          period: !isNullOrUndefined(query['period'])
              ? query['period'].toString() : '',
          symbol: !isNullOrUndefined(query['symbol'])
              ? query['symbol'].toString() : '',
          isCustomDates: !isNullOrUndefined(query['isCustomDates'])
              ? query['isCustomDates'] === 'true' : false,
          fromDate: !isNullOrUndefined(query['fromDate'])
              ? query['fromDate'].toString() : '',
          toDate: !isNullOrUndefined(query['toDate'])
              ? query['toDate'].toString() : ''
        };

        response = h.response(await stocksService.getStocks(priceRequest));
        response.type('application/json');

        return response;
      }
    }
  });

  await server.start()
  ;
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
