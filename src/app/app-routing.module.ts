import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms/sms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
 


const routes: Routes = [
     {
        path:'sms',
        component:SmsComponent
     },
     {
      path:'dashboard',
      component:DashboardComponent
   },
   {
      path:'report',
      component:ReportComponent
   },
     

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
