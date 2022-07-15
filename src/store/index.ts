import { defineStore } from 'pinia';

const store = defineStore('root', {
  state() {
    return {
      __IS_FIRST_TIME: true
    }
  },
});

export default store