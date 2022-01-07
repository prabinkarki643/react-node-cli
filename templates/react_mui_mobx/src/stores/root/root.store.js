import { globalStore } from "../global"
import { sessionStore } from '../session/session.store';


class RootStore {
    globalStore=globalStore
    sessionStore=sessionStore

   constructor() {
       //Do some initial stuffs
   }
}

export const rootStore = new RootStore()