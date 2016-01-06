export function routerConfig($routeProvider) {
  'ngInject';

  $routeProvider.when('/album', {templateUrl: 'app/routes/album/album.html'});
}
