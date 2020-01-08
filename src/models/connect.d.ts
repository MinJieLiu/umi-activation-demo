import { Action, AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';

export type Reducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;

export { GlobalModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: { [key: string]: boolean | undefined };
}

export interface ConnectState {
  loading: Loading;
  global: GlobalModelState;
}

export interface Route {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?<K = any>(action: AnyAction): K;
}
