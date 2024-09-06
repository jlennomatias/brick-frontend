import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authToken: JSON.parse(localStorage.getItem("authToken")) || {
      tokenData: null,
      // outros dados iniciais
    },
  }),
  actions: {
    setAuthToken(data) {
      this.authToken = data;
      localStorage.setItem("authToken", JSON.stringify(data));
    },
    clearAuthToken() {
      this.authToken = {
        tokenData: null,
        // outros dados iniciais
      };
      localStorage.removeItem("authToken");
    },
  },
});
