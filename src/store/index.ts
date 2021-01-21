import type { App } from 'vue';
import {
  createStore,
  // createLogger, Plugin
} from 'vuex';
import { config } from 'vuex-module-decorators';

config.rawError = true;
// const plugins: Plugin<any>[] = isDev ? [createLogger()] : [];

const store = createStore({
  // modules: {},
  // 生产环境下不需要开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  // plugins,
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
