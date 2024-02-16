import { Component, EventEmitter, Inject, InjectionToken, OnInit, Output, SkipSelf } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'thingsboard/src/app/core/core.state';
import {DialogComponent} from "./dialog.component";

@Component({
  selector: 'tb-al-dialog',
  templateUrl: './al-dialog.html',
  styleUrls: []
})
export class AlDialogComponent extends DialogComponent<AlDialogComponent, boolean> implements OnInit {

  alarmsCountMappingFormGroup: FormGroup;
  isAdd = false;
  alarmStatusList = ['Active Unacknowledged', 'Active Acknowledged', 'Cleared Unacknowledged', 'Cleared Acknowledged'];
  severityFilterList = ['Major', 'Warning', 'Minor', 'Critical', 'Indeterminate'];
  typesFilterList = [];
  specifyInterval = false;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              protected translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              //@SkipSelf() private errorStateMatcher: ErrorStateMatcher,
              public dialogRef: MatDialogRef<AlDialogComponent, boolean>,
              public fb: FormBuilder) {

    super(store, router, dialogRef);
    this.buildForm();

  }

  ngOnInit(){
  }

  buildForm(){
    this.alarmsCountMappingFormGroup = this.dialogData;
    console.log(this.alarmsCountMappingFormGroup);
  }


  save(){
    if(!this.alarmsCountMappingFormGroup.invalid){

      const alarmMappingObj = {
        target: this.alarmsCountMappingFormGroup.value.target,
        typesList: this.alarmsCountMappingFormGroup.value.typesList,
        severityList: this.alarmsCountMappingFormGroup.value.severityList,
        statusList: this.alarmsCountMappingFormGroup.value.statusList,
        latestInterval: this.alarmsCountMappingFormGroup.value.latestInterval
      };

      this.dialogRef.close(false);
    }
  }



  cancel(): void {
    this.dialogRef.close(null);
  }

  remove(status: any, type: string){
    if(type === 'status'){
      const statuses = this.alarmsCountMappingFormGroup.get('statusList').value;

      const index = statuses.indexOf(status);

      if(index >= 0){
        statuses.splice(index, 1);

        this.alarmsCountMappingFormGroup.get('statusList').setValue(statuses);
      }
    }
    else if(type === 'severity'){
      const severities = this.alarmsCountMappingFormGroup.get('severityList').value;

      const index = severities.indexOf(status);

      if(index >= 0){
        severities.splice(index, 1);

        this.alarmsCountMappingFormGroup.get('severityList').setValue(severities);
      }
    }
    else if(type === 'type'){
      const types = this.alarmsCountMappingFormGroup.get('typesList').value;

      const index = types.indexOf(status);

      if(index >= 0){
        types.splice(index, 1);

        this.alarmsCountMappingFormGroup.get('typesList').setValue(types);
      }
    }

  }

  checkSpecifyInterval(event: boolean){
    this.specifyInterval ? this.specifyInterval = false : this.specifyInterval = true;

    if(event === true){

      this.alarmsCountMappingFormGroup.get('latestInterval').setValidators(Validators.required);

      this.alarmsCountMappingFormGroup.updateValueAndValidity();
    }
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.typesFilterList.push({name: value});
    }

    event.chipInput?.clear();
  }

}



