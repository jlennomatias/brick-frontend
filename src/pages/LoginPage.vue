<template>
  <q-page class="login-page">
    <div class="login-container">
      <q-img src="../assets/img/f-icon.png" class="login-logo" />
      <q-item-label class="login-title text-title">
        Faça seu login
      </q-item-label>

      <q-input
        v-model="cpfCnpj"
        label="CPF ou CNPJ"
        outlined
        maxlength="18"
        class="login-input"
      />

      <q-input
        v-model="password"
        label="Senha"
        outlined
        :type="showPassword ? 'text' : 'password'"
        class="login-input"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            @click="togglePasswordVisibility"
          />
        </template>
      </q-input>

      <q-btn label="Logar" color="primary" class="login-button" @click="login">
        <q-spinner v-if="loading" color="white" />
      </q-btn>

      <q-btn
        label="Cancelar"
        color="negative"
        flat
        class="login-button"
        @click="cancel"
      >
        <q-spinner v-if="loading" color="white" />
      </q-btn>
      <div class="error-message" v-if="errorMessage">
        Erro: {{ errorMessage }}
      </div>
    </div>
  </q-page>
</template>

<script src="./LoginPageScript.js"></script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-logo {
  max-width: 200px;
  margin-bottom: 30px;
}

.login-title {
  font-size: 28px;
  margin-bottom: 30px;
}

.login-input {
  margin-bottom: 20px;
  font-size: 18px;
}

.login-button {
  width: 100%;
  margin-top: 15px;
  font-size: 18px;
  padding: 12px;
}
</style>
