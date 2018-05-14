<template>
	<div class="user-message">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;">
			<div style="padding: 30px 0;">
					<el-breadcrumb separator="/">
					  <el-breadcrumb-item :to="{ path: '/userCenter' }">用户中心</el-breadcrumb-item>
					  <el-breadcrumb-item :to="{ path: '/userCenter' }">用户管理</el-breadcrumb-item>
					  <el-breadcrumb-item><span style="color: #74b8fa;">{{linkMessage}}</span></el-breadcrumb-item>
					</el-breadcrumb>
					<div class="user-message-content">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<div style="padding: 22px 35px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
								<h4>账号信息</h4>
							</div>
							<el-form-item label="手机号" prop="mobile">
							    <el-input v-model="ruleForm.mobile" style="width: 400px;" :disabled="disabled" placeholder="请输入手机号"></el-input>
							</el-form-item>
							<el-form-item label="用户名" prop="memberName">
							    <el-input v-model="ruleForm.memberName" style="width: 400px;" :disabled="disabled" placeholder="请输入用户名（2-20位）"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
						    	<el-input type="password" v-model="ruleForm.password" auto-complete="off" style="width: 400px;" :disabled="disabled" placeholder="请输入密码至少6位数"></el-input>
						    </el-form-item>
						    <el-form-item label="确认密码" prop="passwordConfirm">
						        <el-input type="password" v-model="ruleForm.passwordConfirm" auto-complete="off" style="width: 400px;" :disabled="disabled"  placeholder="两次密码要一致"></el-input>
						    </el-form-item>
							<el-form-item label="用户类型" prop="memberType">
							    <el-radio-group v-model="ruleForm.memberType" :disabled="disabled">
							        <el-radio label= '0'>互联网</el-radio>
							        <el-radio label= '1'>系统应用</el-radio>
							    </el-radio-group>
							</el-form-item>
							<el-form-item label="用户角色" prop="memberRole">
							    <el-radio-group v-model="ruleForm.memberRole" :disabled="typeDisable">
							        <el-radio label="0">普通用户</el-radio>
							        <el-radio label="1">管理员</el-radio>
							    </el-radio-group>
							</el-form-item>
							<div style="padding: 22px 35px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
								<h4>详细信息</h4>
							</div>
							<el-form-item label="昵称" prop="nickname">
							    <el-input v-model="ruleForm.nickname" style="width: 400px;" :disabled="disabled" placeholder="请填写昵称（可以不填）"></el-input>
							</el-form-item>
							<el-form-item label="生日" prop="nickname">
							    <el-date-picker type="date" placeholder="选择日期" v-model="birthday" style="width: 400px;" :disabled="disabled"></el-date-picker>
							</el-form-item>
							<el-form-item label="性别">
							    <el-radio-group v-model="ruleForm.gender" :disabled="disabled">
							        <el-radio label="0">男</el-radio>
							        <el-radio label="1">女</el-radio>
							        <el-radio label="2">保密</el-radio>
							    </el-radio-group>
							</el-form-item>
							<div style="overflow: hidden;">
								<div style="display: inline-block;">
									<el-form-item label="职业">
									    <el-input v-model="ruleForm.career" style="width: 400px;" :disabled="disabled" placeholder="请填写职业（可以不填）"></el-input>
									</el-form-item>
								</div>
								<div style="display: inline-block;">
									<el-form-item label="公司">
									    <el-input v-model="ruleForm.company" style="width: 400px;" :disabled="disabled" placeholder="请填写公司（可以不填）"></el-input>
									</el-form-item>
								</div>
							</div>
							<div style="overflow: hidden;">
								<div style="display: inline-block;">
									<el-form-item label="所在地">
									    <el-input v-model="ruleForm.location" style="width: 400px;" :disabled="disabled"  placeholder="请填写所在地（可以不填）"></el-input>
									</el-form-item>
								</div>
								<div style="display: inline-block;">
									<el-form-item label="家乡">
									    <el-input v-model="ruleForm.hometown" style="width: 400px;" :disabled="disabled"  placeholder="请填写家乡（可以不填）"></el-input>
									</el-form-item>
								</div>
							</div>
							<el-form-item label="邮箱" prop="email">
							    <el-input v-model="ruleForm.email" style="width: 400px;" :disabled="disabled"  placeholder="请填写邮箱（可以不填）"></el-input>
							</el-form-item>
							<el-form-item label="个人说明" style="margin-top: 30px;">
							    <el-input type="textarea" v-model="ruleForm.personalSignature" placeholder="输入个人描述（可以不填）" :disabled="disabled" style="width: 600px;"></el-input>
							</el-form-item>
							<div style="position: absolute;top: 85px;right: 120px;width: 235px;">
								<el-upload
								  class="avatar-uploader"
								  action="http://192.168.1.220:9201/ucenter/upload/common/image"
								  name ="uploadFile"
								  :data="updateMessage"
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
	import vHeader from '../home/header.vue'
	export default {
	   components:{
           vHeader
       },
       data(){
//     		密码验证
       		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else if (value.length < 6){
		          callback(new Error('密码至少6位数'));
		        }else {
		          if (this.ruleForm.passwordConfirm !== '') {
		            this.$refs.ruleForm.validateField('passwordConfirm');
		          }
		          callback();
		        }
		      };
//		     确认密码验证
		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.password) {
		          callback(new Error('两次输入密码不一致!'));
		        }else {
		          callback();
		        }
		      };
//			    手机号验证
		    var validateMobile = (rule, value, callback) => {
		 	   	var reg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
			        if (value === '') {
			          callback(new Error('请输入手机号'));
			        } else if(!reg.test(value)){
			          	callback(new Error('请输入正确的手机号'));
			        }else{
			            callback();
			        }
			      };
       	return{
       		updateMessage:{
		    		objType:'0101'
		    	},
       		imageUrl: '',
		    htmlId:'',
		    userId:'',
		    disabled:false,
       		linkMessage:"增加用户",
       		typeDisable:false,
       		oldType:'',
       		birthday:'',
       		ruleForm: {
		          mobile: '',
		          memberName: '',
		          memberType:'',
				  memberRole:'',
				  password:'',
				  passwordConfirm:'',
				  nickname:'',
				  gender:'',
				  career:'',
				  company:'',
				  location:'',
				  hometown:'',
				  email:'',
				  personalSignature:''
		    },
		    rules: {
		    	memberType:[
		    		{ required: true, message: '请选择', trigger: 'blur' },
		    	],
		    	memberRole:[
		    		{ required: true, message: '请选择', trigger: 'blur' },
		    	],
		        mobile: [
		            {validator: validateMobile, trigger: 'blur',required: true}
		        ],
		        memberName: [
		            { required: true, message: '请输入用户名', trigger: 'blur' },
		            { min: 2, max: 20, message: '2-20位', trigger: 'blur' }
		        ],
		        password: [
	            	{ validator: validatePass, trigger: 'blur',required: true},
	            	{ min: 6, message: '密码长度不小于6', trigger: 'blur' }
	            ],
	            passwordConfirm: [
	            	{ validator: validatePass2, trigger: 'blur',required: true}
	            ],
	            nickname: [
	            	{ min: 2, max: 10, message: '2-20位', trigger: 'blur' }
	            ],
	            email:[
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
				this.linkMessage = "查看用户"
				this.getUserMessage();
				this.disabled = true;
			}
			if(this.htmlId == 'modify'){
				this.linkMessage = "修改用户";
				this.getUserMessage();
			};
    	},
    	watch: {
    		'ruleForm.memberType':function(val, oldVal){
    			if(val == '0'){
    				this.ruleForm.memberRole = '0';
    				this.typeDisable = true;
    			}else{
    				this.typeDisable = false;
    			}
    			
    		}
    	},
       	methods: {
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	        this.$message({
	          message: '头像上传成功',
	          type: 'success'
	        });
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
				this.$axios.get('/ucenter/admin/member/'+this.userId+'/detail',this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						var data = res.data.data;
						data.memberType = String(data.memberType);
				        data.memberRole = String(data.memberRole);
						this.ruleForm = data;
					}else{
						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//	      增加
	       sendClientMessage(formName){
	       		 this.$refs[formName].validate((valid) => {
			          if (valid) {
			          		if(this.birthday){
			          			var birthday = new Date(this.birthday);
			          		    birthday = this.getMyWeb.timestampToTime(birthday);
			          		    this.ruleForm.birthday = birthday;
			          		}
			            	let content = this.ruleForm;
			            	content.memberType = Number(content.memberType);
			            	content.memberRole = Number(content.memberRole);
					    	var send = this.Qs.stringify(content)
						    this.$axios.post('/ucenter/admin/member',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
									if(res.data.state === "000000"){
										this.$router.go(-1)
									}else{
										this.$message.error(res.data.message);
										  this.$refs['ruleForm'].resetFields();
								          this.ruleForm.memberType = '';
								          this.ruleForm.memberRole = '';
									}
						      	}).catch((err)=>{
						                    this.$message.error('接口请求出错');
						                    console.error(err);
						       })
			          } else {
			             this.$message.error('表单填写格式不对，请重新填写');
			             this.$refs['ruleForm'].resetFields();
			             this.ruleForm.memberType = '';
			             this.ruleForm.memberRole = '';
			             return false;
			          }
			        });
		   },
//			修改
		    modifyMessage(formName){
		    	 this.$refs[formName].validate((valid) => {
			          if (valid) {
			          		if(this.birthday){
			          			var birthday = new Date(this.birthday);
			          		    birthday = this.getMyWeb.timestampToTime(birthday);
			          		    this.ruleForm.birthday = birthday;
			          		}
			            	var content = this.ruleForm;
					    	    content.memberType = Number(content.memberType);
			            		content.memberRole = Number(content.memberRole);
					    	var send = "?"+this.Qs.stringify(content);
					    	this.$axios.put('/ucenter/admin/member/'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
								if(res.data.state === "000000"){
									this.ruleForm = res.data.data;
									this.$router.go(-1)
								}else{
									this.$message.error(res.data.messag);
									this.$refs['ruleForm'].resetFields();
								          this.ruleForm.memberType = '';
								          this.ruleForm.memberRole = '';
								}
					      	}).catch((err)=>{
					                    this.$message.error('接口请求出错');
					                    console.error(err);
					        })
			          } else {
				             this.$message.error('表单填写格式不对，请重新填写');
				             this.$refs['ruleForm'].resetFields();
				             this.ruleForm.memberType = '';
				             this.ruleForm.memberRole = '';
				             return false;
			          }
			       });
		    },
	   }
	}
</script>

<style >
	.user-message-content{
		padding:0 45px 45px 45px;
		position: relative;
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