import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponentsModule } from '@home/components/public-api';
import {
  TranslateService
} from '@ngx-translate/core';
import addCustomNodesLocaleEnglish from './locale/custom-nodes-locale.constant';
import { SharedModule } from '@shared/public-api';
import {CustomNodesConfigAlarmModule} from './components/alarms/custom-nodes-config-alarm.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeComponentsModule
  ],
  exports: [
    CustomNodesConfigAlarmModule
  ],
  declarations: [
  ]
})
export class CustomNodesConfigModule {

  constructor(translate: TranslateService) {
    addCustomNodesLocaleEnglish(translate);
  }

}
