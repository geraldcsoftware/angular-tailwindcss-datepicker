import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';



@NgModule({
  declarations: [DatePickerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
