describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('acodemySpotifyFork'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

});
