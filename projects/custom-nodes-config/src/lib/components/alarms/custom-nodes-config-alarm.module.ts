import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/public-api';
import {AnalyticsNodeAlarmsCountConfigComponent} from './analytics-node-alarms-count-config.component';



@NgModule({
  declarations: [
    AnalyticsNodeAlarmsCountConfigComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AnalyticsNodeAlarmsCountConfigComponent
  ]
})
export class CustomNodesConfigAlarmModule { }
