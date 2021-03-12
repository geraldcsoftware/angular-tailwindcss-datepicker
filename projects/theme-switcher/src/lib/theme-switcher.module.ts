import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeSwitcherComponent } from './theme-switcher.component';



@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ThemeSwitcherComponent]
})
export class ThemeSwitcherModule { }
