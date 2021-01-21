import store from '@/store';

export function hotModuleUnregisterModule(name: string) {
  if (!name) return;
  // eslint-disable-next-line
  if ((store.state as any)[name]) {
    store.unregisterModule(name);
  }
}
