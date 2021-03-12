import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CalendarView } from './calendar-view';
import { DAYS, MONTH_NAMES } from './constants';
import { Subject } from 'rxjs';

const DATE_FORMAT = 'DD-MMM-YYYY';
@Component({
  selector: 'app-datepicker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  private _touched = new Subject<boolean>();
  pickerInput: FormControl = new FormControl('');
  showDatepicker = false;

  view: CalendarView = 'CALENDAR';
  weekDays = DAYS;
  years: number[] = [];
  months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  monthNames = MONTH_NAMES;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: number;
  calendarDays: any[] = [];
  calendarOffset = 0;
  value: Date;

  @Input()
  placeholder: string = '';

  @Input()
  max: moment.MomentInput;

  @Input()
  min: moment.MomentInput;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    const date = moment();

    this.selectedDate = date.date();
    this.selectedMonth = date.month();
    this.selectedYear = date.year();

    this.value = date.toDate();
  }

  writeValue(obj: any): void {
    const dateValue = moment(obj);
    if (dateValue.isValid()) {
      this.pickerInput.setValue(dateValue.format(DATE_FORMAT));
      this.selectedYear = dateValue.year();
      this.selectedMonth = dateValue.month();
      this.selectedDate = dateValue.date();
      this.value = dateValue.toDate();
    }
  }

  registerOnChange(fn: any): void {
    this.pickerInput.valueChanges
      .pipe(
        map((value) => {
          return moment(value, DATE_FORMAT);
        }),
        map((d) => {
          if (d.isValid()) {
            return d;
          }
          return undefined;
        })
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this._touched.asObservable().subscribe((touched) => fn(touched));
  }

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (e: Event) => {
      if (this.showDatepicker && !this.elementRef.nativeElement.contains(e.target)) {
        this.showDatepicker = false;
        this.setTouched();
      }
    });
  }

  ngOnInit() {
    this.initializePicker();
  }

  initializePicker() {
    const startDate = moment({
      year: this.selectedYear,
      month: this.selectedMonth,
      date: this.selectedDate,
    });
    const maxDate = this.max ? moment(this.max) : startDate.add(11, 'years');
    const minDate = this.min
      ? moment(this.min)
      : this.max
        ? moment(this.max).add(-11, 'years')
        : startDate.add(-11, 'years');

    const years = [];
    for (let i = minDate.year(); i <= maxDate.year(); i++) {
      years.push(i);
    }
    this.years = years;
    this.prepareCalendarDays();
  }

  toggleYearSelection() {
    this.view = 'YEAR';
    // calculate starting year from start date
  }

  toggleMonthSelection() {
    this.view = 'MONTH';
    //
  }

  previous() {
    switch (this.view) {
      case 'YEAR': {
        this.previousYearSelection();
        break;
      }
    }
  }

  next() {
    switch (this.view) {
      case 'YEAR': {
        this.nextYearSelection();
        break;
      }
    }
  }

  setTouched() {
    this._touched.next(true);
  }

  previousYearSelection() {
    const currentYearSelection = this.years;
    const minYear = Math.min(...currentYearSelection);

    const newYearRange = [];
    for (let i = minYear - 12; i < minYear; i++) {
      newYearRange.push(i);
    }

    this.years = newYearRange;
  }

  nextYearSelection() {
    const currentYearSelection = this.years;
    const maxYear = Math.max(...currentYearSelection);

    const newYearRange = [];
    for (let i = maxYear + 1; i <= maxYear + 12; i++) {
      newYearRange.push(i);
    }

    this.years = newYearRange;
  }

  selectYear(year: number, event$: Event) {
    event$.stopPropagation();
    this.selectedYear = year;
    this.view = 'MONTH';
    this.prepareCalendarDays();
  }

  selectMonth(month: number, event$: Event) {
    event$.stopPropagation();
    this.selectedMonth = month;
    this.view = 'CALENDAR';
    this.prepareCalendarDays();
  }

  selectDate(d: number, event: Event) {
    event.stopPropagation();
    this.selectedDate = d;
    const date = moment({
      year: this.selectedYear,
      month: this.selectedMonth,
      date: d,
    });
    this.value = date.toDate();

    this.prepareCalendarDays();

    this.pickerInput.setValue(date.format(DATE_FORMAT));
    this.showDatepicker = false;
  }

  selectToday(event: Event) {
    event.stopPropagation();

    const today = moment();
    this.selectedDate = today.date();
    this.selectedMonth = today.month();
    this.selectedYear = today.year();

    this.value = today.toDate();

    this.view = 'CALENDAR';
    this.prepareCalendarDays();

    this.pickerInput.setValue(today.format(DATE_FORMAT));
    this.showDatepicker = false;
  }

  prepareCalendarDays() {
    const month = moment({
      month: this.selectedMonth,
      year: this.selectedYear,
      date: 1,
    });
    const selectedDate = month.clone().date(this.selectedDate);
    this.calendarOffset = month.weekday();
    const today = moment();

    const daysInMonth = month.daysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = month.clone().date(i);
      days.push({
        day: i,
        enabled: day.isAfter(this.min) && day.isBefore(this.max),
        isToday: day.isSame(today, 'day'),
        isSunday: day.weekday() === 0,
        isSelected: day.isSame(selectedDate, 'day'),
      });
    }

    this.calendarDays = days;
  }

  arrayOfLength(n: number): Array<number> {
    const array = new Array(n);
    for (let i = 0; i < array.length; i++) {
      array[i] = i;
    }
    return array;
  }
}
