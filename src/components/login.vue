<template>
	<div class="login-box">
		<div class="login-form">
			<div style="position: relative;">
				<div style="position: absolute;top: -80px;z-index: 2;display: inline-block;width: 107%;left: 50%;transform: translate(-50%,0);">
					<div style="position: relative;">
						<img src="../assets/iocn/logo.png" style="width: 100px;position: absolute;top:-85px;left: 50%;transform: translate(-50%,0);">
						<h1 style="text-align: center;color: white;font-weight: 100;">成都乐听运维中心</h1>
					</div>
				</div>
				<el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" class="demo-ruleForm" style="width: 300px;padding-top:20px">
				  <el-form-item  prop="username">
				    <el-input type="text" v-model="ruleForm2.username"  placeholder="请输入手机号或用户名" ></el-input>
				  </el-form-item>
				  <el-form-item prop="password">
				    <el-input type="password" v-model="ruleForm2.password" placeholder="请输入密码" id="keydown"></el-input>
				  </el-form-item>
				  <el-form-item style="margin-top: 50px;">
				    <el-button type="primary" @click="login('ruleForm2')" style="width: 100%;">登录</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'login',
	  data(){
//	         		密码验证
       		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        }else{
		        	callback();
		        }
		      };
//			    手机号验证
			var moblie = (rule, value, callback) =>{
				var reg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
			        if (value === '') {
			          	callback(new Error('请输入手机号或用户名'));
			        } else if(!reg.test(value)){
			          	callback(new Error('请输入正确的手机号或用户名'));
			        }else{
			            callback();
			        }
			}
      return {
      	code:'',
        ruleForm2: {
          username: '',
          password: ''
        },
         rules: {
		        username: [
		         	{validator: moblie, trigger: 'blur',required: true},
		            { required: true, message: '请输入用户名', trigger: 'blur' },
		            { min: 2, max: 20, message: '2-20位', trigger: 'blur' }
		        ],
		        password: [
	            	{ validator: validatePass, trigger: 'blur',required: true}
	            ]
		    }
      };
	},
	 created(){
//	 	this.getCode()
////	 	document.cookie = "token=0ff8f380e010415f83c9892ae7ed2cc8;expires=Thu, 18 Dec 2019 12:00:00 GMT; path=/";
////	 	console.log(document.cookie)
	 },
	 mounted: function () {
		  this.$nextTick(() =>{
		    var elm = document.getElementById('keydown');
		   		elm.onkeydown=(e)=>{
		   			var event = event || e;
		   			if(event.keyCode == 13){
		   				this.login('ruleForm2');
		   			}
		   		}
		  })
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
//    getCode(){
//    	this.$axios.get(this.getMyWeb.url.getCaptchaImageUrl, this.getMyWeb.axios.aAjaxConfig).then((res)=>{
//    		this.code = res.data.data.base64
//    	}).catch(function(err){
//                  self.$message.error('接口请求出错');
//                  console.error(err);
//        })
//    },
      login(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
				    let content = this.ruleForm2;
		    		var send = this.Qs.stringify(content);
					this.$axios.post('/ucenter/admin/login',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					        if(res.data.state === '000000'){
					        	var data = res.data.data;
								localStorage.letingUserName = data.mobile;
								localStorage.letingAvatar= data.avatar;
					        	this.$router.push('home');
					        }else{
					        	this.$message.error(res.data.message);
					        }
			      	}).catch((err)=>{
			                    this.$message.error('登录失败请重新登录');
			    })
          } else {
            this.$message.error('请填写正确用户名或密码');
          }
        });
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