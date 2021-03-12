import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerModule } from '@components/date-picker';
import { ThemeSwitcherModule } from '@components/theme-switcher';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsagePage } from './pages/usage/usage.page';

@NgModule({
  declarations: [
    AppComponent,
    UsagePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ThemeSwitcherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
