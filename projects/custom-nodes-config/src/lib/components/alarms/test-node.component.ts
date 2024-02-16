import { Component, TemplateRef, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState, isDefinedAndNotNull} from '@core/public-api';
import {
  AliasEntityType,
  EntityType,
  RuleNodeConfiguration,
  RuleNodeConfigurationComponent,
} from '@shared/public-api';
import { ServiceType } from '@shared/models/queue.models';
import { Timewindow } from '@shared/models/time/time.models';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AlDialogComponent} from './alarms-count-mapping-dialog/al-dialog';

@Component({
  selector: 'tb-test-node',
  templateUrl: './test-node.component.html',
  styleUrls: []
})
export class TestNodeComponent extends RuleNodeConfigurationComponent {

  testfrm: string = ''

  alarmsCountConfigForm: FormGroup;
  propagationEntityTypes: Array<EntityType | AliasEntityType>;
  alarmsCountMappingFormGroup: FormGroup;
  alarmStatusList = ['Active Unacknowledged', 'Active Acknowledged', 'Cleared Unacknowledged', 'Cleared Acknowledged'];
  severityFilterList = ['Major', 'Warning', 'Minor', 'Critical', 'Indeterminate'];
  typesFilterList = [];
  alarmMappingObject = {};
  alarmsCountMappingsList: any;
  dialogRef: any;
  specifyInterval = false;
  timewindow: Timewindow;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;


  constructor(protected store: Store<AppState>,
              private fb: FormBuilder,
              private dialog: MatDialog
              ) {
    super(store);
  }

  protected configForm(): FormGroup {
    return this.alarmsCountConfigForm;
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    console.log(configuration, 'Configuration');

    this.alarmsCountConfigForm = this.fb.group({
      alarmsCountMappings: this.fb.array([]),
      countAlarmsForPropagationEntities: new FormControl(configuration?.countAlarmsForPropagationEntities),
      propagationEntityTypes: new FormControl(configuration?.propagationEntityTypes),
      outMsgType:new FormControl(configuration?.outMsgType),
      queueName: new FormControl(configuration?.queueName),
      latestInterval: new FormControl(null),
      specifyInterval: new FormControl(this.specifyInterval),
    });
    this.addAlarmCountMappings()
  }
  addAlarmCountMappings(){
    this.alarmsCountMappingFormGroup = this.fb.group({
      target: new FormControl(null, [Validators.required]),
      typesList: new FormControl(null),
      severityList: new FormControl(null),
      statusList: new FormControl(null),
      specifyInterval: new FormControl(this.specifyInterval),
      latestInterval: new FormControl(null)
});
    this.alarmsCountMappingsList = this.alarmsCountConfigForm.get('alarmsCountMappings') as FormArray;
    this.alarmsCountMappingsList.push(this.createCountMappingsForm());
  }

  createCountMappingsForm(): FormGroup{
   return this.alarmsCountMappingFormGroup = this.fb.group({
          target: new FormControl(null, [Validators.required]),
          typesList: new FormControl(null),
          severityList: new FormControl(null),
          statusList: new FormControl(null),
          specifyInterval: new FormControl(this.specifyInterval),
          latestInterval: new FormControl(null)
    });
  }




  saveMapping(){
    console.log(this.alarmsCountMappingFormGroup, "MAp form");

      let alarmMappingObj = {
        target: this.alarmsCountMappingFormGroup.value.target,
        typesList: this.alarmsCountMappingFormGroup.value.typesList,
        severityList: this.alarmsCountMappingFormGroup.value.severityList,
        statusList: this.alarmsCountMappingFormGroup.value.statusList,
        latestInterval: this.alarmsCountMappingFormGroup.value.latestInterval
      }

      this.alarmMappingObject = alarmMappingObj;

      console.log(this.alarmMappingObject, " Mapping obj");
     this.dialogRef.close();

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

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toString();

    if (value) {
      this.typesFilterList.push(value);
      this.alarmsCountMappingFormGroup.get('typesList').setValue(this.typesFilterList);
    }
    event.chipInput?.clear();
  }

  checkSpecifyInterval(event: boolean){
    this.specifyInterval ? this.specifyInterval = false : this.specifyInterval = true;

    if(event === true){

      this.alarmsCountMappingFormGroup.get('latestInterval').setValidators(Validators.required);

      this.alarmsCountMappingFormGroup.updateValueAndValidity();
    }
  }

//   specifyIntervalChange() {
//     this.specifyInterval ? (this.alarmsCountMappingFormGroup.get("latestInterval").setValue(10, {
//         emitEvent: !0
//     }),
//     this.alarmsCountMappingFormGroup.get("latestInterval").enable({
//         emitEvent: !0
//     })) : (this.alarmsCountMappingFormGroup.get("latestInterval").setValue(0, {
//         emitEvent: !0
//     }),
//     this.alarmsCountMappingFormGroup.get("latestInterval").disable({
//         emitEvent: !0
//     })),
//     this.alarmsCountMappingFormGroup.get("latestInterval").markAsDirty()
// }


  protected prepareInputConfig(configuration: RuleNodeConfiguration): RuleNodeConfiguration {
    return {
      alarmsCountMappings: isDefinedAndNotNull(configuration?.alarmsCountMappings) ? configuration?.alarmsCountMappings : null,
      countAlarmsForPropagationEntities: isDefinedAndNotNull(configuration?.countAlarmsForPropagationEntities) ?
      configuration.countAlarmsForPropagationEntities : null,
      propagationEntityTypes: isDefinedAndNotNull(configuration?.propagationEntityTypes) ? configuration.propagationEntityTypes : null,
      outMsgType: isDefinedAndNotNull(configuration?.outMsgType) ? configuration.outMsgType : null,
      queueName: isDefinedAndNotNull(configuration?.queueName) ? configuration.queueName : null,
    };
  }

  openDialog(){
    this.addAlarmCountMappings();
    console.log(this.alarmsCountMappingFormGroup)
    this.dialogRef = this.dialog.open(AlDialogComponent, {
      width: 'auto',
      data: this.alarmsCountMappingFormGroup
    });

    this.dialogRef.afterClosed().subscribe(result => {

    });



  }

  cancel(): void {
    const alarmsCountMappings = this.alarmsCountConfigForm.get('alarmsCountMappings') as FormArray;
    const lastIndex = alarmsCountMappings.length - 1;
    alarmsCountMappings.removeAt(lastIndex);

    this.dialogRef.close();
  }

  editMapping(index: any, mapping: any){
    console.log(mapping, "EDIT Mapping", index);

  }

  removeMapping(index: number) {
    const alarmsCountMappings = this.alarmsCountConfigForm.get('alarmsCountMappings') as FormArray;
    alarmsCountMappings.removeAt(index);
}

}
