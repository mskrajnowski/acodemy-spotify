/// <reference path="../../.tmp/typings/angular-ui-router/angular-ui-router.d.ts" />

declare module angular.ui.stateHelper {
  interface IState extends angular.ui.IState {
    children?: Array<IState>;
  }

  interface IOptions {
    keepOriginalNames: boolean;
    siblingTraversal: boolean;
  }

  interface IStateHelperProvider {
    state(state: IState, options?: IOptions): void;
  }

  interface IStateHelper {

  }
}
