<template>
	<div class="client-message">
		<header style="padding: 20px  0 20px 55px;border-bottom:1px solid gainsboro;box-shadow: 0px 2px 10px -8px #888888;">
			<h3>应用中心</h3>
		</header>
		<div style="width: 100%;overflow: hidden;">
			<div class="client-message-content-box">
				<div style="padding: 30px 0;">
					<el-breadcrumb separator="/">
					  <el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					  <el-breadcrumb-item :to="{ path: '/home' }">应用管理</el-breadcrumb-item>
					  <el-breadcrumb-item><span style="color: #74b8fa;">{{linkMessage}}</span></el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="client-message-content">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<div style="padding: 22px 35px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
							<h4>基本信息</h4>
						</div>
						<el-form-item label="应用名称" prop="clientName">
						    <el-input v-model="ruleForm.clientName" style="width: 400px;" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item label="clientKey" prop="clientKey">
						    <el-input style="width: 400px;"  v-model="ruleForm.clientKey" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item label="应用类型">
						    <el-radio-group v-model="ruleForm.clientType" :disabled="disabled">
						        <el-radio label="互联网"></el-radio>
						        <el-radio label="系统应用"></el-radio>
						    </el-radio-group>
						</el-form-item>
						 <el-form-item label="活动形式" prop="clientContent" style="margin-top: 30px;">
						    <el-input type="textarea" v-model="ruleForm.clientContent" placeholder="应用描述" :disabled="disabled"></el-input>
						 </el-form-item>
						 <div style="padding: 22px 35px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
							<h4>安全信息</h4>
						</div>
						<el-form-item label="授权类型">
						    <el-radio-group v-model="ruleForm.authType">
						        <el-radio label="密码模式"></el-radio>
						        <el-radio label="授权码模式"></el-radio>
						    </el-radio-group>
						</el-form-item>
						<el-form-item label="钥密">
						    <el-input style="width: 400px;" :disabled='true' :placeholder="ruleForm.passWord"></el-input>
						    <span class="resetPassWord">重置钥密</span>
						    <p style="color: skyblue;font-size: 12px;">注：clientSecret是校验应用开发者身份的钥密，具有极高的安全性，切记勿把密码直接交给第三方开发者或直接储存在代码中</p>
						</el-form-item>
						<el-form-item label="有效期" >
						    <el-input v-model="ruleForm.termOfValidity" style="width: 315px;"></el-input>
						    <div style="display: inline-block;margin-left: 125px;">
						    	<span>RefreshToken有效期</span>
						    	<el-input  style="width: 315px;margin-left: 25px;" placeholder="30天"></el-input>
						    </div>
						</el-form-item>
						<el-form-item label="行业选择" >
						    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						      <el-option label="互联网" value="shanghai"></el-option>
						      <el-option label="现代物业" value="beijing"></el-option>
						      <el-option label="电子商务业" value="beijing"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<div style="position: absolute;top: 85px;right: 120px;width: 235px;">
					  		<el-upload
							  class="avatar-uploader"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="imageUrl" :src="imageUrl" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<p style="font-size: 12px;color: gainsboro;">平台图为非必上传，点击可完成上传，只支持PNG，JPG格式，文件不能超过2M</p>
					  	</div>
					  	<div style="height: 50px;position: relative;">
					  		<el-button type="primary" style="position: absolute;right: 100px;" v-if="htmlId == 'addClient'" v-on:click="sendClientMessage('ruleForm')">确认增加</el-button>
					  		<el-button type="primary" style="position: absolute;right: 100px;" v-if="htmlId == 'modify'" v-on:click="modifyMessage('ruleForm')">确认修改</el-button>
					  	</div>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created(){
			var userId = this.$route.params.id;
			console.log(userId);
		},
		 data() {
		 	   	var validatePass = (rule, value, callback) => {
		 	   	var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
			        if (value === '') {
			          callback(new Error('请输入密码'));
			        } else if(!reg.test(value)){
			          	callback(new Error('密码为数字和字母组成'));

			        }else{
			            callback();
			        }
			      };
		    return {
		    	imageUrl: '',
		    	htmlId:'',
		    	userId:'',
		    	disabled:false,
		    	linkMessage:'增加应用',
		        ruleForm: {
		          clientName: '',
		          clientKey: '',
		          thumbnail:null,
		          clientContent: ''
		        },
		        rules: {
		          clientName: [
		            { required: true, message: '请输入活动名称', trigger: 'blur' },
		            { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          clientKey: [
		            { required: true, message: '请输入钥密', trigger: 'change' },
		            { min: 5, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' },
		            { validator: validatePass, trigger: 'blur' }
		          ],
		          termOfValidity: [
		            { required: true, message: '请输入活动名称', trigger: 'blur' },
		            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],
		          type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ],
		          clientContent: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ]
		        }
		      }
    	},
    	created(){
    		this.htmlId = this.$route.params.id;
    		var _url = window.location.href;
    		var theRequest = new Object(); 
    		var index = _url.indexOf('?')+1
    		var str = _url.substr(index); 
    		var strs = str.split("&"); 
    		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
//			通过url查询id
			this.userId = theRequest.id;
			if(this.htmlId =='look'){
				this.linkMessage = "查看应用"
				this.getUserMessage();
				this.disabled = true;
			}
			if(this.htmlId == 'modify'){
				this.linkMessage = "修改应用";
				this.getUserMessage();
			};
    	},
    	 methods: {
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	        console.log("ok");
	      },
	      beforeAvatarUpload(file) {
	        const isJPG = file.type === 'image/jpeg';
	        const isPNG = file.type === 'image/png';
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG && !isPNG) {
	          this.$message.error('上传头像图片只能是 JPG或PNG格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
	      },
	      
//	      	获取数据
	        getUserMessage(){
				this.$axios.get('api/ucenter/admin/client/'+this.userId,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					var data = res.data.data;
					this.ruleForm = data;
					console.log(data);
		      	}).catch(function(err){
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//	      增加
	       sendClientMessage(formName){
	       		 this.$refs[formName].validate((valid) => {
			          if (valid) {
			            	let content = this.ruleForm;
					    	var send = this.Qs.stringify(content)
					    	console.log(send);
						    this.$axios.post('api/ucenter/admin/client',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
									console.log(res);
									this.$router.go(-1)
						      	}).catch(function(err){
						                    this.$message.error('接口请求出错');
						                    console.error(err);
						       })
			          } else {
			             this.$message.error('表单填写格式不对，请重新填写');
			            return false;
			          }
			        });
		   },
//			修改
		    modifyMessage(formName){
		    	 this.$refs[formName].validate((valid) => {
			          if (valid) {
			            	var content = {};
					    	     content.clientKey = this.ruleForm.clientKey;
					    	     content.clientName = this.ruleForm.clientName;
					    	     content.clientId = this.ruleForm.clientId;
					    	var send = "?"+this.Qs.stringify(content);
					    	   	console.log(send);
					    	this.$axios.put('api/ucenter/admin/client/'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
								this.ruleForm = res.data.data;
								console.log(res);
								this.$router.go(-1)
					      	}).catch(function(err){
					                    this.$message.error('接口请求出错');
					                    console.error(err);
					        })
			          } else {
			             this.$message.error('表单填写格式不对，请重新填写');
			            return false;
			          }
			       });
		    }
	   }
	}
</script>

<style>
	.client-message-content-box{
		width: 1250px;
		margin: 0 auto;
	}
	.client-message-content{
		padding:0 45px 45px 45px;
		position: relative;
	}
	.resetPassWord{
		margin-left: 20px;
		cursor: pointer;
		color: #52a6f9;
	}
	.resetPassWord:hover{
		color:#0e60b0;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
   }
   .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
   }
   .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 235px;
    height: 145px;
    line-height: 145px;
    text-align: center;
   }
   .avatar {
    width: 235px;
    height: 145px;
    display: block;
   }
</style>