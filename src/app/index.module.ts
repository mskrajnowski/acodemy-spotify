/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../typings/angular-ui-state-helper.d.ts" />

import main from './main/main.module';

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

export default
  angular
  .module('acodemy.spotify', [
    'ui.router',
    'ui.router.stateHelper',

    main.name,
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock);
