import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './usage.page.html',
  host: { class: 'flex-grow' }
})
export class UsagePage {

  dateControl = new FormControl();

}
