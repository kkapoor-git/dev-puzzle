### Task 4
Technical requirement: the server `stocks-api` should be used as a proxy
to make calls. Calls should be cached in memory to avoid querying for the
same data. If a query is not in cache we should call-through to the API.

### Solution: developed on top of task 3

1) created a new route /stocks in main.ts at stocks-api

2) created a hapi lib 

    a) data-access-config - lib to fetch config values.
    
    b) stocks-api - lib to fetch stocks data , broken down further 
    
        i) Cache Client - a cache wrapper class having two methods i.e. get and set.I am here using Node-cache which is simple and fast.
        
        ii) Stocks Service - this service responsibility is 
            - create cache key based on inputs.
            - check that request key exists in cache or not
            - If cache key is not found it initiates a fetch call and then sets data in cache
            - once it recives data it checks if date ranges are passed , it filters the data and then sets in cache before returning
        
        iii) Stocks Data Access 
            - first loads the config and then rads the api endpoint and creates one based on inputs.
            - it then initiates a http call to fetch stocks , I am here using Axios to make Http call.   
        
### Angular changes 
 1) modified StocksHttpDataService to call hapi endpoint /stocks to fetch data.
 2) added a config entry for new proxy  
 3) removed filtering Logic from angular and moved to proxy
