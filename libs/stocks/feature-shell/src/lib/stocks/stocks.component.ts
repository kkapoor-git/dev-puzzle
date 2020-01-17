import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceQueryFacade} from '@coding-challenge/stocks/data-access-price-query';
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;

  private destroy$ = new Subject();
  private quotes$: Observable<any> = this.priceQuery.priceQueries$;

  private timePeriods: any = [
    {viewValue: 'All available data', value: 'max'},
    {viewValue: 'Five years', value: '5y'},
    {viewValue: 'Two years', value: '2y'},
    {viewValue: 'One year', value: '1y'},
    {viewValue: 'Year-to-date', value: 'ytd'},
    {viewValue: 'Six months', value: '6m'},
    {viewValue: 'Three months', value: '3m'},
    {viewValue: 'One month', value: '1m'}
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.onValueChanges();
  }

  private onValueChanges(): void {
    this.stockPickerForm.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
        .subscribe(() => {
          this.fetchQuote();
        });
  }

  private fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const {symbol, period} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
