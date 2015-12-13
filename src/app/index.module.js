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
