import store from '@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '@/helper/vuexHelper';
import notationList from '@/lib/notations';

const NAME = 'notation';
hotModuleUnregisterModule(NAME);

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Notation extends VuexModule {
  private currentNotationIndex = 0

  private playStatus = false

  get getCurrentNotationIndex() {
    return this.currentNotationIndex
  }

  get getCurrentNotation() {
    return notationList[this.currentNotationIndex]
  }

  get getPlayStatus() {
    return this.playStatus
  }

  @Mutation
  commitCurrentNotation(item: number): void {
    this.currentNotationIndex = item;
  }

  @Mutation
  commitPlayStatus(item: boolean): void {
    this.playStatus = item;
  }

  @Action
  playNotation(item: number): void {
    this.commitCurrentNotation(item)
    this.commitPlayStatus(true)
  }

  @Action
  pauseNotation(): void {
    this.commitPlayStatus(false)
  }
}
export const notationStore = getModule<Notation>(Notation);
