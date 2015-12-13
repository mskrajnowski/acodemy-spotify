import main from './main/main.route';

export function routerConfig (stateHelperProvider, $urlRouterProvider) {
  'ngInject';

  stateHelperProvider.state(main);
  $urlRouterProvider.otherwise('/');
}
