import { Effect, Model } from 'dva';
import { omit } from 'lodash';
import { Reducer } from '@/models/connect';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface IMenuItem {
  id: number;
  url: string;
  title: string;
}

const mockMenuList: IMenuItem[] = [
  {
    id: 1,
    url: '/user-info',
    title: '用户列表',
  },
  {
    id: 2,
    url: '/test/hello',
    title: '测试',
  },
  {
    id: 3,
    url: '/test/hello?result=world',
    title: '测试带参数',
  },
];

/**
 * 全局状态
 */
export interface GlobalModelState {
  collapsed: boolean;
  menuList: any[];
  userInfo: { [key: string]: any };
}

export interface GlobalModelType extends Model {
  state: GlobalModelState;
  effects: {
    getGlobalData: Effect;
  };
  reducers: {
    saveByName: Reducer<GlobalModelState>;
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    clear: Reducer<GlobalModelState>;
  };
}

const initialState = {
  collapsed: false,
  menuList: [],
  userInfo: {
    email: 'example@example.com',
  },
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initialState,

  effects: {
    *getGlobalData(_, { call, put }) {
      yield call(sleep, 100);
      yield put({
        type: 'saveByName',
        menuList: mockMenuList,
      });
    },
  },

  reducers: {
    saveByName(state, action) {
      return { ...state, ...omit(action, ['type']) };
    },
    changeLayoutCollapsed(state, { payload }) {
      localStorage.setItem('global__Menu__collapsed', String(+payload));
      return {
        ...state,
        collapsed: payload,
      };
    },
    clear() {
      return initialState;
    },
  },

  subscriptions: {},
};

export default GlobalModel;
