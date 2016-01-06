export function routerConfig($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {templateUrl: 'app/routes/home/home.html'});
}
