import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/public-api';
import {AnalyticsNodeAlarmsCountConfigComponent} from './analytics-node-alarms-count-config.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatLegacyChipsModule} from '@angular/material/legacy-chips';
import { OutputMessageTypeAutocompleteComponent } from './output-message-type-autocomplete.component';
import { AlarmsCountMappingTableComponent } from './alarms-count-mapping-table/alarms-count-mapping-table.component';
import { AlarmsCountMappingDialogComponent } from './alarms-count-mapping-dialog/alarms-count-mapping-dialog.component';



@NgModule({
  declarations: [
    AnalyticsNodeAlarmsCountConfigComponent,
    OutputMessageTypeAutocompleteComponent,
    AlarmsCountMappingTableComponent,
    AlarmsCountMappingDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatLegacyChipsModule
  ],
  exports: [
    AnalyticsNodeAlarmsCountConfigComponent
  ]
})
export class CustomNodesConfigAlarmModule { }
