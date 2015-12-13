import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

export default
  angular
  .module('acodemy.spotify', [
    'ngRoute',
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock);
