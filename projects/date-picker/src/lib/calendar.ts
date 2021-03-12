import * as moment from 'moment';

export class Calendar {
  getDaysInMonth(month: number, year: number) {
    return moment({ year, month, date: 1 }).daysInMonth();
  }
}
