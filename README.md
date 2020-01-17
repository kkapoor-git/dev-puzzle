### Task 3
Business requirement: As a user I want to choose custom dates
so that I can view the trends within a specific period of time.

### Solution:  developed on top of task 2

1) added a custom dates option in time period drop down

2) on custom dates selection from time period drop down, material date-picker option for From and To dated will be visible on UI .

3) please note that I have used individual form valueChanges subscription instead of using one for complete form (as done in Task 2) , just wanted to avoid complexity and improve code readability but certainly it can be done with a single form values change subscription.

4) In in stocks.component..ts I am calling onValueChanges from ngOnInit which is listening to individual field changes and eventually calling fetchQuote() method.

5) I have to do below code because all fields are required and when user selects anything else then 'Custom dates' then we have to disable and reset from and to fields.
                            this.stockPickerForm.controls.fromDate.reset();
                            this.stockPickerForm.controls.toDate.reset();
                            this.stockPickerForm.controls.fromDate.disable();
                            this.stockPickerForm.controls.toDate.disable();

6) I have added days in timePeriods[] (which is used to bind the dropdown) , reason is it will help in determining what time period to pass to api , I dont want to call api with time period max  

7) when user selects from date, I am calculating its difference with today's date and then filtering the appropriate timeperiod from timeperiods array , which would ensure max call is avoided.

8) for example assume today is January 16 and user selects January 10 then i calculate the days in difference i.e 6 days which means it is under 30 days data , so imitate a  1m call and filter out data based on from date and to date.

9) from stocksHttpDataService when we get response back in effects , I have used a flatMap which calls filterDataByDateRange and filters data if from and to date is present else returns data as is.

10) below validation rules are implemented 
    
    a) in both From and To fields i have added [max]="this.currentDate" which means that date selection is not allowed after today's date.
   
    b) in To field have added [min] = "this.minDate" , (minDate is from date selected) which ensures that "to" cannot be before "from".
    
    c) if from date is greater than today's date then I am changing the 'from' date i.e. ensuring both dates are same i.e. both will have to date. 
