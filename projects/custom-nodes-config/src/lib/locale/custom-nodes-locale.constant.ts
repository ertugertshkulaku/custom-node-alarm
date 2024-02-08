import { TranslateService } from '@ngx-translate/core';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default function addCustomNodesLocaleEnglish(translate: TranslateService) {

    const enUS = {
      tb: {
        rulenode: {
          'msg-key': 'Message key',
          'input-key': 'Input key',
          'output-key': 'Output key'
        }
      }
    };
    translate.setTranslation('en_US', enUS, true);
}
