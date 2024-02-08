import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState, isDefinedAndNotNull} from '@core/public-api';
import {
  AliasEntityType,
  EntityType,
  RuleNodeConfiguration,
  RuleNodeConfigurationComponent,
  ServiceType
} from '@shared/public-api';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'tb-analytics-node-alarms-count-config',
  templateUrl: './analytics-node-alarms-count-config.component.html',
  styleUrls: []
})
export class AnalyticsNodeAlarmsCountConfigComponent extends RuleNodeConfigurationComponent {

  alarmsCountConfigForm: FormGroup;
  propagationEntityTypes: Array<EntityType | AliasEntityType>;
  serviceType: ServiceType.TB_RULE_ENGINE;
  addMappingForm: FormGroup;
  alarmStatusList = ['Active Unacknowledged', 'Active Acknowledged', 'Cleared Unacknowledged', 'Cleared Acknowledged'];
  severityFilterList = ['Major', 'Warning', 'Minor', 'Critical', 'Indeterminate'];
  typesFilterList = [];
  isDialogOpen = false;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    super(store);
  }

  protected configForm(): FormGroup {
    return this.alarmsCountConfigForm;
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    this.alarmsCountConfigForm = this.fb.group({
      alarmsCountMappings: new FormArray([configuration.alarmsCountMappings]),
      countAlarmsForPropagationEntities: [configuration.countAlarmsForPropagationEntities, [Validators.required]],
      propagationEntityTypes: [configuration.propagationEntityTypes, [Validators.required]],
      outMsgType: [configuration.outMsgType, [Validators.required]],//?
      queueName: [configuration.queueName, [Validators.required]],
    });
  }

  addAlarmCountMappings(){
    const alarmsCountMappingsArray = this.alarmsCountConfigForm.get('alarmsCountMappings') as FormArray;

    this.addMappingForm = this.fb.group({
      target: new FormControl(null, [Validators.required]),
      typesList: new FormControl(null, [Validators.required]),
      severityList: new FormControl(null, [Validators.required]),
      statusList: new FormControl(null, [Validators.required]),
      latestInterval: new FormControl(null, [Validators.required])
    });

    alarmsCountMappingsArray.push(this.addMappingForm);
  }


  remove(status: any, type: string){
    if(type === 'status'){
      const statuses = this.alarmsCountConfigForm.get('alarmsCountMappings').value.statusList;
      const index = statuses.indexOf(status);

      if(index >= 0){
        statuses.splice(index, 1);

        this.alarmsCountConfigForm.get('alarmsCountMappings').value.statusList.setValue(statuses);
      }
    }
    else if(type === 'severity'){
      const severities = this.alarmsCountConfigForm.get('alarmsCountMappings').value.statusList;
      const index = severities.indexOf(status);

      if(index >= 0){
        severities.splice(index, 1);

        this.alarmsCountConfigForm.get('alarmsCountMappings').value.statusList.setValue(severities);
      }
    }
    else if(type === 'type'){
      const types = this.alarmsCountConfigForm.get('alarmsCountMappings').value.typesList;
      const index = types.indexOf(status);

      if(index >= 0){
        types.splice(index, 1);

        this.alarmsCountConfigForm.get('alarmsCountMappings').value.typesList.setValue(types);
      }
    }

  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.typesFilterList.push({name: value});
    }

    event.chipInput?.clear();
  }


  protected prepareInputConfig(configuration: RuleNodeConfiguration): RuleNodeConfiguration {
    return {
      alarmsCountMappings: isDefinedAndNotNull(configuration?.alarmsCountMappings) ? configuration.alarmsCountMappings : null,
      countAlarmsForPropagationEntities: isDefinedAndNotNull(configuration?.countAlarmsForPropagationEntities) ?
        configuration.countAlarmsForPropagationEntities : null,
      propagationEntityTypes: isDefinedAndNotNull(configuration?.propagationEntityTypes) ? configuration.propagationEntityTypes : null,
      outMsgType: isDefinedAndNotNull(configuration?.outMsgType) ? configuration.outMsgType : null,
      queueName: isDefinedAndNotNull(configuration?.queueName) ? configuration.queueName : null,
    };
  }

  openDialog(){
  this.isDialogOpen= true;
  }
}
