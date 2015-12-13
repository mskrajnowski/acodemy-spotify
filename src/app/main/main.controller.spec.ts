import { MainController } from './main.controller';

describe('controllers', () => {
  let vm: MainController;

  beforeEach(angular.mock.module('acodemy.spotify'));

  beforeEach(inject(($controller: angular.IControllerService) => {
    vm = $controller('MainController');
  }));
});
