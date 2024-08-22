import { defineStore } from 'pinia';

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    loginData: JSON.parse(localStorage.getItem('loginData')) || {
      consentData: null,
      accountData: [],
      // outros dados iniciais
    },
  }),
  actions: {
    setLoginData(data) {
      this.loginData = data;
      localStorage.setItem('loginData', JSON.stringify(data));
    },
    clearLoginData() {
      this.loginData = {
        consentData: null,
        accountData: [],
        // outros dados iniciais
      };
      localStorage.removeItem('loginData');
    },
  },
});
