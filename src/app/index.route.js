import main from './main/main.route.js';

export function routerConfig (stateHelperProvider, $urlRouterProvider) {
  'ngInject';

  stateHelperProvider.state(main);
  $urlRouterProvider.otherwise('/');
}
