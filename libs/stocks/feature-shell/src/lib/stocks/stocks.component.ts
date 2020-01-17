import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceQueryFacade} from '@coding-challenge/stocks/data-access-price-query';
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {isNullOrUndefined} from "util";
import {formatDate} from "@angular/common";

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  private currentDate = new Date();
  private minDate: any;
  private fromDate: any;
  private toDate: any;
  private diffDays: number;
  private destroy$ = new Subject();
  private quotes$: Observable<any> = this.priceQuery.priceQueries$;
  private displayCustomDates: Boolean = false;
  private period: string;

  private timePeriods = [
    {viewValue: 'All available data', value: 'max', inDays: 1825},
    {viewValue: 'Five years', value: '5y', inDays: 730},
    {viewValue: 'Two years', value: '2y', inDays: 365},
    {viewValue: 'One year', value: '1y', inDays: 180},
    {viewValue: 'Year-to-date', value: 'ytd'},
    {viewValue: 'Six months', value: '6m', inDays: 90},
    {viewValue: 'Three months', value: '3m', inDays: 30},
    {viewValue: 'One month', value: '1m', inDays: 5},
    {viewValue: 'Custom dates', value: 'custom'},
    {viewValue: '5 days', value: '5d', inDays: 1}
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.onValueChanges();
  }

  private onValueChanges() {
    this.stockPickerForm.controls.symbol.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
        .subscribe(() => {
          this.fetchQuote();
        });

    this.stockPickerForm.get('period').valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
        .subscribe((selectedValue) => {
          if (selectedValue === 'custom') {
            this.displayCustomDates = true;
            this.stockPickerForm.controls.fromDate.enable();
            this.stockPickerForm.controls.toDate.enable();
          } else {
            this.displayCustomDates = false;
            this.stockPickerForm.controls.fromDate.reset();
            this.stockPickerForm.controls.toDate.reset();
            this.stockPickerForm.controls.fromDate.disable();
            this.stockPickerForm.controls.toDate.disable();
            this.period = selectedValue;
            this.fromDate = undefined;
            this.toDate = undefined;
            this.fetchQuote();
          }
        });

    this.stockPickerForm.controls.fromDate.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
        .subscribe((fromDateVal) => {
          if (!isNullOrUndefined(fromDateVal)) {
            this.minDate = fromDateVal;
            this.period = this.calculatePeriod(fromDateVal);
            this.fromDate = formatDate(fromDateVal, 'yyyy-MM-dd', 'en-us');
            this.fetchQuote();
          }
        });

    this.stockPickerForm.controls.toDate.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
        .subscribe((toDateValue) => {
          if (!isNullOrUndefined(toDateValue)) {
            this.toDate = formatDate(toDateValue, 'yyyy-MM-dd', 'en-us');
            this.fetchQuote();
          }
        });
  }

  private fetchQuote() {
    const {fromDate, symbol} = this.stockPickerForm.value;
    if (this.fromDate && this.toDate && this.fromDate >this.toDate) {
      this.stockPickerForm.controls.toDate.setValue(fromDate);
    } else {
      if (this.stockPickerForm.valid) {
        console.log('going to fetch values');
        this.priceQuery.fetchQuote(symbol, this.period,
            this.fromDate, this.toDate);
      }
    }
  }

  // this method will help us determining the period , never a good idea to query max
  private calculatePeriod(fromDate: string): string {
    const dateDifference = Math.abs((new Date() as any) - (new Date(fromDate) as any));
    this.diffDays = Math.ceil(dateDifference / (1000 * 3600 * 24));
    return this.timePeriods.filter(s => s.inDays <= this.diffDays).map(m => m.value)[0];
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
