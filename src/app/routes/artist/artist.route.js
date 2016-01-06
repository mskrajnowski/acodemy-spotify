export function routerConfig($routeProvider) {
  'ngInject';

  $routeProvider.when('/artist', {templateUrl: 'app/routes/artist/artist.html'});
}
