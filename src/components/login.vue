<template>
	<div class="login-box">
		<div class="login-form">
			<div style="position: relative;">
				<div style="position: absolute;top: -100px;z-index: 2;display: inline-block;width: 107%;left: 50%;transform: translate(-50%,0);">
					<h1 style="text-align: center;color: white;">用户中心后台管理系统</h1>
				</div>
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm" style="width: 300px;">
				  <el-form-item  prop="pass">
				    <el-input type="text" v-model="ruleForm2.username"  placeholder="请输入账号" ></el-input>
				  </el-form-item>
				  <el-form-item prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.password" placeholder="请输入密码"></el-input>
				  </el-form-item>
				  <el-form-item prop="checkPass" style="position: relative;">
				    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入验证码" style="width: 100px;"></el-input>
				    <img :src="code" v-on:click="getCode()" style="width: 60px;position: absolute;right: 90px;top: -3px;"/>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="login()" style="width: 100%;">提交</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'login',
	  data () {
	      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      	code:'',
        ruleForm2: {
          username: '',
          password: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
	},
	 created(){
//	 	this.getCode()
////	 	document.cookie = "token=0ff8f380e010415f83c9892ae7ed2cc8;expires=Thu, 18 Dec 2019 12:00:00 GMT; path=/";
////	 	console.log(document.cookie)
	 },
	 methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCode(){
      	this.$axios.get(this.getMyWeb.url.getCaptchaImageUrl, this.getMyWeb.axios.aAjaxConfig).then((res)=>{
      		this.code = res.data.data.base64
      	}).catch(function(err){
                    self.$message.error('接口请求出错');
                    console.error(err);
          })
      },
      login(){
      	let content = this.ruleForm2;
		    	   var send = this.Qs.stringify(content);
					this.$axios.post('api/ucenter/admin/login',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
							this.$router.push('home');
			      	}).catch(function(err){
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			       })
      }
    }
}
</script>

<style scoped>
	.login-box{
		background: #324157;
		height: 100%;
		position: relative;
	}
	.login-form{
		padding: 15px 30px;
		background: white;
		position: absolute;
		left: 50%;
		top: 50%;
		border: 1px solid white;
		border-radius: 3px;
		transform: translate(-50%,-50%);
	}
</style>