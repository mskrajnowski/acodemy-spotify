import main from './main/main.route';

export function routerConfig (
  stateHelperProvider: angular.ui.stateHelper.IStateHelperProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider
) {
  'ngInject';

  stateHelperProvider.state(main);
  $urlRouterProvider.otherwise('/');
}
