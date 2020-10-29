<!--
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 12:19:10
 * @LastEditTime: 2020-10-29 16:57:03
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\views\common\login.vue
-->
<template>
  <div class="background">
    <div class="card-class">
      <div class="title-class">
        <h1>Welcome!</h1>
      </div>
      <div class="form-class">
        <div class="out-class">
          <div class="inner-class">
            <a-form-model
              layout="vertical"
              :model="loginForm"
              ref="loginRef"
              :rules="rules"
            >
              <a-form-model-item label="Username" prop="user_name">
                <a-input
                  v-model="loginForm.user_name"
                  placeholder="please input your username"
                />
              </a-form-model-item>
              <a-form-model-item label="Password" prop="user_password">
                <a-input
                  type="password"
                  v-model="loginForm.user_password"
                  @keyup.enter.native="loginClick('loginForm')"
                  placeholder="please input your password"
                />
              </a-form-model-item>
              <a-button
                type="primary"
                class="login-btn-class"
                @click="loginClick('loginForm')"
              >
                Login
              </a-button>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/apis/user";
export default {
  name: "login",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      }
    };
    return {
      rules: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_name: [{ validator: validateUserName, trigger: "change" }],
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_password: [{ validator: validatePass, trigger: "change" }]
      },
      loginForm: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_name: "",
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_password: ""
      }
    };
  },
  computed: {},
  methods: {
    loginClick() {
      console.log(this.$store.state);
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          // alert("submit!");
          login(this.loginForm.user_name, this.loginForm.user_name);
          debugger;

          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              console.log("xxx");
              // this.$router.push({ path: "/" });
            })
            .catch(() => {
              console.log("error");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
*,
:after,
:before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}
.background {
  min-height: 100vh;
  min-width: 100%;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-position: center center;
  background-repeat: no-repeat;
  // position: fixed;
  background-color: #fcfbfa;
}

.card-class {
  max-width: 550px;
  width: 100%;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  flex-direction: column;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 1;
  min-height: 320px;
  border-radius: 3px;
  padding: 20px 0px;
  background: 0% 0% / cover rgba(240, 240, 240, 0.65);
}
.title-class {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
}
.form-class {
  display: flex;
  overflow-y: hidden;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.out-class {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  max-width: 415px;
  width: 100%;
  transform: translate(0px, 0px);
  padding: 32px;
  transition: all 0.25s ease 0s;
  animation: 0.2s ease-out 0s 1 normal none running animation-16t86o;
}
.inner-class {
  max-width: 400px;
  width: 100%;
}
.login-btn-class {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 500;
  font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  height: 32px;
  line-height: 30px;
  vertical-align: middle;
  cursor: pointer;
  color: rgb(255, 255, 255);
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  padding: 0px 16px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(50, 116, 217);
  border-image: initial;
  border-radius: 2px;
  background: linear-gradient(rgb(50, 116, 217) 0%, rgb(31, 96, 196) 100%);
}
.h1 {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 400;
  line-height: 1.1;
}
</style>
