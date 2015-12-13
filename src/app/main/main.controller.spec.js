describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('acodemy.spotify'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

});
