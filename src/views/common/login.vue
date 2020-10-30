<!--
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 12:19:10
 * @LastEditTime: 2020-10-30 10:19:26
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\views\common\login.vue
-->
<template>
  <div class="background">
    <div class="card-class">
      <div class="title-class">
        <h1>Welcome</h1>
      </div>
      <div class="form-class">
        <div class="out-class">
          <div class="inner-class">
            <a-form-model
              layout="vertical"
              ref="ruleForm"
              :model="form"
              :rules="rules"
            >
              <a-form-model-item label="username" prop="username">
                <a-input
                  v-model="form.username"
                  placeholder="please input your username"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item label="password" prop="userPassword">
                <a-input
                  type="password"
                  v-model="form.userPassword"
                  @keyup.enter.native="onSubmit"
                  placeholder="please input your password"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  type="primary"
                  @click="onSubmit"
                  class="login-btn-class"
                >
                  Login
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        userPassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input user name",
            trigger: "blur"
          }
        ],
        userPassword: [
          {
            required: true,
            message: "Please input user password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Login", this.form)
            .then(() => {
              this.$notification.success({
                message: "Login success",
                description: ""
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            })
            .catch(error => {
              console.log("error", error);
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
