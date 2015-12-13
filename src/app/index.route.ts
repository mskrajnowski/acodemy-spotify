export function routerConfig (
  $routeProvider: angular.route.IRouteProvider
) {
  'ngInject';

  $routeProvider.otherwise('/');
}
