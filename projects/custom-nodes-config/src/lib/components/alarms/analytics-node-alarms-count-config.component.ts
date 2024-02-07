import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState, isDefinedAndNotNull} from '@core/public-api';
import {
  AliasEntityType,
  EntityType,
  RuleNodeConfiguration,
  RuleNodeConfigurationComponent,
  ServiceType
} from '@shared/public-api';

@Component({
  selector: 'tb-analytics-node-alarms-count-config',
  templateUrl: './analytics-node-alarms-count-config.component.html',
  styleUrls: []
})
export class AnalyticsNodeAlarmsCountConfigComponent extends RuleNodeConfigurationComponent {

  alarmsCountConfigForm: FormGroup;
  propagationEntityTypes: Array<EntityType | AliasEntityType>;
  serviceType: ServiceType.TB_RULE_ENGINE;
  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    super(store);
  }

  protected configForm(): FormGroup {
    return this.alarmsCountConfigForm;
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    this.alarmsCountConfigForm = this.fb.group({
      alarmsCountMappings: [configuration.alarmsCountMappings, [Validators.required]],//?
      countAlarmsForPropagationEntities: [configuration.countAlarmsForPropagationEntities, [Validators.required]],
      propagationEntityTypes: [configuration.propagationEntityTypes, [Validators.required]],
      outMsgType: [configuration.outMsgType, [Validators.required]],//?
      queueName: [configuration.queueName, [Validators.required]],
    });
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
}
