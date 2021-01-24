<template>
  <div class="background">
    <div class="card-class">
      <div class="title-class">
        <h1>Welcome</h1>
      </div>
      <div class="form-class">
        <div class="out-class">
          <div class="inner-class">
            <el-form :model="loginForm"
                    :rules="rules" ref="loginForm"
                    label-position="top"
                    size="mini"
                    label-width="100px" >
              <el-form-item label="USERNAME" prop="username">
                <el-input size="small"
                          prefix-icon="el-icon-user"
                          v-model="loginForm.username"
                          placeholder="PLEASE INPUT YOUR USERNAME"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="PASSWORD" prop="password">
                <el-input size="small" v-model="loginForm.password"
                          prefix-icon="el-icon-s-tools"
                          placeholder="PLEASE INPUT YOUR PASSSWORD"
                          show-password
                          clearable> </el-input>
              </el-form-item>
              <el-button class="login-btn-class" @click="onSubmit('loginForm')">LOGIN</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: 'USERNAME IS REQUIRED',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'PASSWORD IS REQUIRED',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      console.log('formNmae', formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.$notify({
                title: 'Login success',
                message: '@yhkl-dev',
                type: 'success'
              })
              // this.$notification.success({
              //   message: 'Login success',
              //   description: ''
              // })
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            })
            .catch(error => {
              this.$notify({
                title: 'Login failed',
                message: error,
                type: 'error'
              })
            })
        } else {
          this.$notify({
            title: 'Login failed',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
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
  /* // position: fixed; */
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
  padding: 32px;
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
  transition: all 0.25s ease 0s;
  animation: 0.2s ease-out 0s 1 normal none running animation-16t86o;
}
.inner-class {
  width: 100%;
  padding-bottom: 16px;
}
.login-btn-class {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 500;
  font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  height: 10px;
  line-height: 30px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgb(50, 116, 217);
  border-radius: 3px;
  background: linear-gradient(rgb(50, 116, 217) 0%, rgb(31, 96, 196) 100%);
  color: rgb(255, 255, 255);
  -webkit-box-pack: center;
  justify-content: center;
  width: 90%;
}
.h1 {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 400;
  line-height: 1.1;
}
</style>
