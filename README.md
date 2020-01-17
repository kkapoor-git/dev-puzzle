### Task 1

Please provide a short code review of the base `master` branch:

1. What is done well?

   following things are done well 
   
   1) Nx workspace
   2) Ngrx usage 
   3) Lazy Loaded Module
   3) Smart and Presentational Component
   

2. What would you change?
   
   
   1) NGRX structure i.e.taking entities out to its own file (for readability and understanding)
   2) http call should be pushed out to separate service as a wrapper
   3) response transformation should be done in effects rather than reducer (reducer should only push data to store)
   4) error message should be shown if invalid symbol is entered.
   5) use of Interface types wherever possible (I like using interfaces over types)
   6) NGRX actions should be changed little bit to be presented in a better way.
   7) Angular unit test are failing that needs to fixed (have just fixed app.component one)
   8) Less or saas instead of css and responsive page
   9) Keep key to some server 
   10) Button click to form submit
   11) Use of constants
  

3. Are there any code smells or problematic implementations?
    
    - Application was not binding data to chart because in chart component there was an issue in *ngif i.e. data was used which dosent exist , I have fixed that.
    
    - for code smells there was a subscription in charts component which was not unsubscribed , I have removed that and instead I have used this.data$ | async  ,
     the async pipe marks the component to be checked for changes. When the component gets destroyed, the async pipe unsubscribe's automatically to avoid potential memory leaks.
     
     
