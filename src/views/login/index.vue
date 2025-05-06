<template>
  <v-container class="login-container bg-white d-flex flex-column align-center justify-center">
    <h1 class="text-h4 mb-4 text-center">登录</h1>
    <v-form ref="form" class="w-100">
      <v-text-field v-model="phone" label="手机号" :rules="phoneRules" />
      <v-text-field v-model="idCard" label="身份证号" :rules="idCardRules" />
      <v-text-field v-model="verifyCode" label="验证码" :rules="verifyCodeRules">
        <template #append-inner>
          <v-btn :loading="captchaLoading" @click="getVerifyCode">获取验证码</v-btn>
        </template>
      </v-text-field>
      <v-btn :loading="loading" variant="elevated" color="primary" size="large" class="mt-2 w-100" @click="handleLogin">
        登录
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const form = ref();
const phone = ref('');
const verifyCode = ref('');
const idCard = ref('');
const loading = ref(false);
const captchaLoading = ref(false);

const router = useRouter();

const phoneRules = [
  (value: string) => !!value || '手机号不能为空',
  (value: string) => /^1[3-9]\d{9}$/.test(value) || '请输入正确的手机号',
];

const verifyCodeRules = [
  (value: string) => !!value || '验证码不能为空',
  (value: string) => /^[0-9]{6}$/.test(value) || '请输入正确的验证码',
];

const idCardRules = [
  (value: string) => !!value || '身份证号不能为空',
  (value: string) => /^[0-9]{17}[xX0-9]$/.test(value) || '请输入正确的身份证号',
];

const login = async () => {
  loading.value = true;
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify({
      phone: phone.value,
      idCard: idCard.value,
      verifyCode: verifyCode.value,
    }),
  });
  const result = await res.json();
  if (result.code === 200) {
    router.push('/');
  }
  loading.value = false;
};

const getVerifyCode = async () => {
  captchaLoading.value = true;
  await fetch('/api/verifyCode', {
    method: 'post',
    body: JSON.stringify({
      phone: phone.value,
    }),
  });
  captchaLoading.value = false;
};

const handleLogin = () => {
  form.value.validate().then(
    (valid: {
      valid: boolean;
      errors: {
        id: number | string;
        errorMessages: string[];
      }[];
    }) => {
      console.log(valid);
      if (valid.valid) {
        login();
      }
    },
  );
};
</script>

<style lang="css" scoped>
.login-container {
  height: 100vh;
}
</style>
