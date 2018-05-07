<template>
	<div class="userModify" style="height: 100%;overflow: hidden;">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;height:100%;overflow: auto;" class="modifyTab">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/" style="margin-bottom: 10px;">
					<el-breadcrumb-item :to="{ path: '/userCenter' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/userCenter' }">用户管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">用户修改</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="overflow: hidden;margin-top: 20px;width: 300px;border: 1px solid gainsboro;position: absolute;right: 0;top: 105px;border-radius: 5px;">
					<div style="padding: 15px 35px;">
						<h4>账号信息</h4>
					</div>
					<div style="padding: 0 25px;position: relative;">
						<div style="padding-left: 10px;margin: 10px 0;">
							<span>手机号：</span><span>{{modifyMessage.mobile}}</span>
						</div>
						<div style="padding-left: 10px;margin: 10px 0;">
							<span>用户名：</span><span>{{modifyMessage.memberName}}</span>
						</div>
						<img :src="modifyMessage.avatar" style="width: 60px;height: 60px;position: absolute;top: -32px;right: 20px;"/>
					</div>
				</div>
				<template>
					  <el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="修改信息" name="first">
					    	<div class="userModify-message" style="position: relative;padding-bottom: 50px">
								<el-form :model="modifyMessage" :rules="rules" ref="modifyMessage" label-width="100px" class="demo-ruleForm">
									<el-form-item label="昵称" style="margin: 30px 0;">
										<el-input v-model="modifyMessage.nickname" style="width: 400px;" :disabled="disabled" placeholder="请填写昵称"></el-input>
									</el-form-item>
									<el-form-item label="生日" style="margin: 30px 0;">
										<el-date-picker type="date" placeholder="选择日期" v-model="modifyMessage.birthday" style="width: 400px;"></el-date-picker>
									</el-form-item>
									<el-form-item label="性别" style="margin: 30px 0;">
										<el-radio-group v-model="modifyMessage.gender" :disabled="disabled">
										    <el-radio label="0">男</el-radio>
										    <el-radio label="1">女</el-radio>
										    <el-radio label="2">保密</el-radio>
										</el-radio-group>
									</el-form-item>
									<div style="overflow: hidden;margin: 20px 0;">
										<div style="display: inline-block;">
											<el-form-item label="职业">
												<el-input v-model="modifyMessage.career" style="width: 400px;" :disabled="disabled" placeholder="请填写职业">></el-input>
											</el-form-item>
										</div>
										<div style="display: inline-block;">
										    <el-form-item label="公司">
												<el-input v-model="modifyMessage.company" style="width: 400px;" :disabled="disabled" placeholder="请填写公司"></el-input>
											</el-form-item>
										</div>
									</div>
									<div style="overflow: hidden;margin: 20px 0;">
										<div style="display: inline-block;">
											<el-form-item label="所在地">
												<el-input v-model="modifyMessage.location" style="width: 400px;" :disabled="disabled" placeholder="请填写所在地"></el-input>
											</el-form-item>
										</div>
										<div style="display: inline-block;">
											<el-form-item label="家乡">
												<el-input v-model="modifyMessage.hometown" style="width: 400px;" :disabled="disabled" placeholder="请填写家乡"></el-input>
											</el-form-item>
										</div>
									</div>
									<el-form-item label="邮箱" style="margin: 20px 0;" prop="email">
										<el-input v-model="modifyMessage.email" style="width: 400px;border-color: #c0c4cc !important;" :disabled="disabled" placeholder="请填写邮箱" ></el-input>
									</el-form-item>
									<el-form-item label="个人说明" style="margin-top: 30px;">
										<el-input type="textarea" v-model="modifyMessage.personalSignature" placeholder="个人说明" :disabled="disabled" style="width: 600px;"></el-input>
									</el-form-item>
								</el-form>
								<div style="position: absolute;top: -14px;right: 410px;width: 235px;">
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
									<el-button type="primary" style="position: absolute;right: 100px;" v-on:click="modify('modifyMessage')">确认修改</el-button>
								</div>
							</div>
					    </el-tab-pane>
					    <el-tab-pane label="修改密码" name="second">
					    	<div class="pass-message">
					<!--			<h1>此功能尚未开放</h1>-->
								<el-form :model="passMessage" :rules="rules2" ref="passMessage" label-width="100px" class="demo-ruleForm" style="margin-top: 20px;">
									<el-form-item label="当前密码" prop="currentMemberPassword">
									    <el-input type="text" v-model="passMessage.currentMemberPassword"  style="width: 400px;" ></el-input>
									</el-form-item>
									<el-form-item label="新密码" prop="newPassword">
									    <el-input type="password" v-model="passMessage.newPassword" style="width: 400px;" ></el-input>
									</el-form-item>
									<el-form-item label="确认密码" prop="newPasswordConfirm">
									    <el-input type="password" v-model="passMessage.newPasswordConfirm" style="width: 400px;"></el-input>
									</el-form-item>
								</el-form>
								<div style="height: 50px;position: relative;">
										<el-button type="primary" style="position: absolute;left: 403px;" v-on:click="resetPassWrod('passMessage')">确认修改</el-button>
								</div>
							</div>
					    </el-tab-pane>
					  </el-tabs>
				</template>
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
//        		     		密码验证
       		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.passMessage.newPasswordConfirm !== '') {
		            this.$refs.passMessage.validateField('passwordConfirm');
		          }
		          callback();
		        }
		      };
//		     确认密码验证
		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.passMessage.newPassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
        	return{
        		updateMessage:{
		    		objType:'0101'
		    	},
        		activeName: 'first',
        		imageUrl: '',
			    htmlId:'',
			    userId:'',
			    disabled:false,
			    userMessage:{
			    	mobile:'',
			    	memberName:'',
			    	memberType:''
			    },
        		modifyMessage:{
        			
        		},
        		passMessage:{
        			currentMemberPassword:'',
        			newPassword:'',
        			newPasswordConfirm:'',
        			memberId:'',
        		},
        		rules: {
		            nickname: [
		            	{ min: 2, max: 10, message: '2-20位', trigger: 'blur' }
		            ],
		            email:[
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					]
			    },
			    rules2: {
			    	currentMemberPassword:[
			    		{ required: true, message: '密码不能为空', trigger: 'blur' },
			    	],
			        newPassword: [
		            	{  required: true, message: '密码不能为空', trigger: 'blur' },
		            	{ validator: validatePass, trigger: 'blur',required: true}
		            ],
		            newPasswordConfirm: [
		            	{  required: true, message: '密码不能为空', trigger: 'blur' },
		            	{ validator: validatePass2, trigger: 'blur',required: true}
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
			this.getUserMessage()
    	},
        methods: {
		    handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        this.modifyMessage.avatar = this.imageUrl;
		        this.$message({
		          message: '头像上传成功',
		          type: 'success'
		        });
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
	      	getUserMessage(){
				this.$axios.get('/ucenter/admin/member/'+this.userId+'/detail',this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === '000000'){
						var data = res.data.data;
						data.memberType = String(data.memberType);
				        data.memberRole = String(data.memberRole);
				 		data.gender = String(data.gender);
						this.modifyMessage = data;
					}else{
						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			修改信息
	        modify(formName){
		    	 this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	var birthday = new Date(this.modifyMessage.birthday);
			          		birthday = this.getMyWeb.timestampToTime(birthday);
			          		this.modifyMessage.birthday = birthday;
			          		this.modifyMessage.gender = Number(this.modifyMessage.gender);
			            	var content = this.modifyMessage;
					    	content.memberId = this.userId;
					    	var send = "?"+this.Qs.stringify(content);
					    	console.log(content);
					    	this.$axios.put('/ucenter/admin/member/'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					    		if(res.data.state === '000000'){
							      	this.$message({
							          message: '用户信息修改成功',
							          type: 'success'
							        });
					    		}else{
							        this.$message.error(res.data.message);
					    		}

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
		    resetPassWrod(formName){
		    	this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	var content = this.passMessage;
		    				content.memberId = this.userId;
					    	var send = "?"+this.Qs.stringify(content);
					    	console.log(content);
					    	this.$axios.put('/ucenter/admin/member/passwordUpdate'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					    		if(res.data.state === '000000'){
							       this.$message({
							          message: '密码修改成功',
							          type: 'success'
							        });
									console.log(res);
					    		}else{
							        this.$message.error(res.data.message);
					    		}

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
//		    选项卡回调函数
			handleClick(tab, event) {
//			        console.log(tab, event);
			}
	    }
	}
</script>

<style>
	.userModify-content-box{
		width: 1250px;
		margin: 0 auto;
	}
	.userModify .modifyTab::-webkit-scrollbar{
		width:0px;height:0px;
	}
	.userModify .el-input__inner{
		border-color: #dcdfe6 !important;
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