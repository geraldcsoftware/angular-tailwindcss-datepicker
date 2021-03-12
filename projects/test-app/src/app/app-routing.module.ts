import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsagePage } from './pages/usage/usage.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsagePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
