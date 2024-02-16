import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/public-api';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { OutputMessageTypeAutocompleteComponent } from './output-message-type-autocomplete.component';
import { TestNodeComponent } from './test-node.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {AlDialogComponent} from './alarms-count-mapping-dialog/al-dialog';







@NgModule({
  declarations: [
    OutputMessageTypeAutocompleteComponent,
    TestNodeComponent,
    AlDialogComponent,

    //TimeintervalComponent
    //  QueueAutocompleteComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ]
    ,
  exports: [
    TestNodeComponent
    //AnalyticsNodeAlarmsCountConfigComponent
  ]
})
export class CustomNodesConfigAlarmModule { }
