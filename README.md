### Task 2

Business requirement: As a user I should be able to type into
the symbol field and make a valid time-frame selection so that
the graph is refreshed automatically without needing to click a button.

### Solution:  developed on top of task 1


1) in stocks.component.ts declare 
    
    private destroy$ = new Subject();
    
2) in stocks.component.ts added below code in init()
    
   this.stockPickerForm.valueChanges.pipe(
               debounceTime(1000),
               distinctUntilChanged(),
               takeUntil(this.destroy$))
               .subscribe(() => {
                   this.fetchQuote();
               });

    a) have used form value changes instead of individual controls value changes.

    b) used debounce() to ensure that when user types quickly in the textbox it should emit a value after a specified time interval has passed without another value being emitted.  

    c) used distinctUntilChanged to get distinct by comparison from the previous item.

    d) used takeUntil is used to unsubscribe.      
            
4) and finally destroy 
     ngOnDestroy(){
        this.destroy$.next();
      }
