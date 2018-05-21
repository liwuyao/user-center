<template>
	<div class="client-message">
		<header style="padding: 20px  0 20px 55px;border-bottom:1px solid gainsboro;box-shadow: 0px 2px 10px -8px #888888;">
			<h3>增加商户</h3>
		</header>
		<div style="width: 100%;overflow: hidden;">
			<div class="client-message-content-box" style="padding-bottom: 40px;">
				<div style="padding: 30px 0;">
					<el-breadcrumb separator="/">
					  <el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					  <el-breadcrumb-item :to="{ path: '/merchantList' }">商户管理</el-breadcrumb-item>
					  <el-breadcrumb-item><span style="color: #74b8fa;">{{linkMessage}}</span></el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div v-if="!switchPage">
					<div style="padding: 15px 0 15px 44px;">
						<template>
						  <el-radio v-model="radio" label="1">已有账号</el-radio>
						  <el-radio v-model="radio" label="2">无账号</el-radio>
						</template>
						<p style="font-size: 12px;color: gainsboro;padding: 5px 0;">注：商户账号必须为互联网有效会员用户，如果新增商户已存在乐听云账号，请选择已有账号；如果当前没有乐听云账号，请选择无账号</p>
					</div>
					<div class="client-message-content" v-if="radio == 1">
						<div>
							<div>
								<div style="border: 1px solid gainsboro;display: inline-block;border-radius: 5px;height: 35px;margin-top:20px ;">
									<search-bar :name="'keyword'" v-on:search="searchRes" :placeholder="'输入手机号或用户名查询'" :config="searchConfig"></search-bar>
								</div>
							</div>
						</div>
						<div>
							<h5 style="color: red;font-size: 12px;">{{errMessage}}</h5>
						</div>
						<div style="border-top: 1px solid gainsboro;margin-top: 20px;">
							<h3 style="margin: 10px 0;">填写信息</h3>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
							<div style="padding-left:48px ;">
								<span style="font-size: 14px;">用户名</span>
								<span v-if="ruleForm.username" style="padding-left: 7px;font-size: 14px;">{{ruleForm.username}}</span>
								<span v-else style="padding-left: 7px;font-size: 14px;color: gainsboro;">请查询用户名</span>
							</div>
							<div style="padding-left:20px ;margin: 10px 0 30px 0">
								<span style="font-size: 14px;">用户手机号</span>
								<span v-if="ruleForm.mobile" style="padding-left: 7px;font-size: 14px">{{ruleForm.mobile}}</span>
								<span v-else style="padding-left: 7px;color: gainsboro;font-size: 14px">请查询用户手机号</span>
							</div>
							<el-form-item label="商铺名称" prop="shopName">
							    <el-input v-model="ruleForm.shopName" style="width: 400px;"  placeholder="请输入商户名称"></el-input>
							</el-form-item>
							<el-form-item label="联系人" prop="contacts">
							    <el-input v-model="ruleForm.contacts" style="width: 400px;"  placeholder="请输入联系人"></el-input>
							</el-form-item>
							<el-form-item label="联系人电话" prop="contactNumber">
							    <el-input v-model="ruleForm.contactNumber" style="width: 400px;"  placeholder="请输入联系人电话"></el-input>
							</el-form-item>
							<el-form-item label="联系人地址" prop="contactAddress">
							    <el-input v-model="ruleForm.contactAddress" style="width: 400px;"  placeholder="请输入联系人地址"></el-input>
							</el-form-item>
							</el-form>
						</div>
					</div>
					<div v-if="radio == 2" style="border-top: 1px solid gainsboro;margin-top: 20px;">
						<h3 style="margin: 10px 0;">填写信息</h3>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="用户名" prop="username">
							    <el-input v-model="ruleForm.username" style="width: 400px;"  placeholder="请输入账户名" :disabled='disabled'></el-input>
							</el-form-item>
							<el-form-item label="用户手机号" prop="mobile">
							    <el-input v-model="ruleForm.mobile" style="width: 400px;"  placeholder="请输入账户手机号" :disabled='disabled'></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
							    <el-input v-model="ruleForm.password" style="width: 400px;"  placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="passwordConfirm">
							    <el-input v-model="ruleForm.passwordConfirm" style="width: 400px;"  placeholder="请确认密码"></el-input>
							</el-form-item>
							<el-form-item label="商铺名称" prop="shopName">
							    <el-input v-model="ruleForm.shopName" style="width: 400px;"  placeholder="请输入商户名称"></el-input>
							</el-form-item>
							<el-form-item label="联系人" prop="contacts">
							    <el-input v-model="ruleForm.contacts" style="width: 400px;"  placeholder="请输入联系人"></el-input>
							</el-form-item>
							<el-form-item label="联系人电话" prop="contactNumber">
							    <el-input v-model="ruleForm.contactNumber" style="width: 400px;"  placeholder="请输入联系人电话"></el-input>
							</el-form-item>
							<el-form-item label="联系人地址" prop="contactAddress">
							    <el-input v-model="ruleForm.contactAddress" style="width: 400px;"  placeholder="请输入联系人地址"></el-input>
							</el-form-item>
							</el-form>
					</div>
				</div>
<!--				修改部分-->
				<div v-if="switchPage">
					<div style="border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
						<h3 style="margin: 10px 0;">修改信息</h3>
					</div>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="账户名">
							    <el-input v-model="ruleForm.username" style="width: 400px;"  placeholder="请输入账户名" disabled=true></el-input>
							</el-form-item>
							<el-form-item label="账户手机号">
							    <el-input v-model="ruleForm.mobile" style="width: 400px;"  placeholder="请输入账户手机号" disabled=true></el-input>
							</el-form-item>
							<el-form-item label="商户名称" prop="shopName">
							    <el-input v-model="ruleForm.shopName" style="width: 400px;"  placeholder="请输入商户名称"></el-input>
							</el-form-item>
							<el-form-item label="联系人" prop="contacts">
							    <el-input v-model="ruleForm.contacts" style="width: 400px;"  placeholder="请输入联系人"></el-input>
							</el-form-item>
							<el-form-item label="联系人电话" prop="contactNumber">
							    <el-input v-model="ruleForm.contactNumber" style="width: 400px;"  placeholder="请输入联系人电话"></el-input>
							</el-form-item>
							<el-form-item label="联系人地址" prop="contactAddress">
							    <el-input v-model="ruleForm.contactAddress" style="width: 400px;"  placeholder="请输入联系人地址"></el-input>
							</el-form-item>
						</el-form>
				</div>
				<div style="height: 50px;position: relative;">
					  		<el-button type="primary" style="position: absolute;right: 120px;" v-if="htmlId == 'addMerchant'" v-on:click="sendClientMessage('ruleForm')">确认增加</el-button>
					  		<el-button type="primary" style="position: absolute;right: 120px;" v-if="htmlId == 'modify'" v-on:click="modifyMessage('ruleForm')">确认修改</el-button>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	import searchBar from '../search/search-bar';
	export default {
		components:{
           vDialog,searchBar
       },
		 data() {
		 	   	 var validateMobile = (rule, value, callback) => {
			 	   	var reg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
				        if(!reg.test(value)){
				          	callback(new Error('请输入正确的手机号'));
				        }else{
				            callback();
				        }
				      };
//				/     		密码验证
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
		    return {
		    	radio:'1',
		    	htmlId:'',
		    	userId:'',
		    	merchantId:'',
		    	disabled:false,
		    	linkMessage:'增加商户',
		    	resetWord:'',
		    	haveMessage:false,
		    	switchPage:false,
		    	errMessage:'',
		        ruleForm: {
		          username: '',
		          mobile:'',
		          password:'',
		          passwordConfirm:'',
		          shopName: '',
		          contacts: '',
		          contactNumber:'',
		          contactAddress:'',
		          id:''
		        },
		        searchConfig:{
		        	clear:true,
		        	changeTime:'',
		        },
		        rules: {
		          username: [
		            { required: true, message: '账户名不能为空', trigger: 'blur' },
		          ],
		          mobile: [
		            { required: true, message: '手机号不能为空', trigger: 'blur' },
		            {validator: validateMobile, trigger: 'blur',required: true}
		          ],
		          shopName: [
		            { required: true, message: '商户名不能为空', trigger: 'blur' },
		          ],
		          contacts: [
		            { required: true, message: '联系人不能为空', trigger: 'blur' },
		          ],
		          contactNumber: [
		            { required: true, message: '联系人电话不能为空', trigger: 'blur' },
		            { min: 8, max: 11, message: '联系电话格式不对', trigger: 'blur' },
		          ],
		          contactAddress: [
		            { required: true, message: '联系人地址不能为空', trigger: 'blur' },
		          ],
		          password: [
	            	{ validator: validatePass, trigger: 'blur',required: true},
	            	{ min: 6, message: '密码长度不小于6', trigger: 'blur' }
		            ],
		            passwordConfirm: [
		            	{ validator: validatePass2, trigger: 'blur',required: true}
		            ],
		        },
		    }
    	},
    	created(){
//  		获取id
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
			this.merchantId = theRequest.id;
//			if(this.htmlId =='look'){
//				this.linkMessage = "查看应用"
//				this.getUserMessage();
//				this.disabled = true;
//			}
			if(this.htmlId == 'modify'){
				this.switchPage = true;
				this.linkMessage = "修改商户";
				this.getMerchantMessage()
			};
    	},
    	watch: {
    		radio:function(){
    			if(this.radio == '2'){
    				this.disabled = false;
    				this.haveMessage = false;
    				this.errMessage = "";
    				for(let i in this.ruleForm){
    					this.ruleForm[i] = ""
    				}
    			}
    		}
    	},
    	 methods: {	      
//	      	获取数据用户
	       getUserMessage(){
				this.$axios.get('/ucenter/admin/member/querySimpleMemberForBase',{params:this.userId},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						var data = res.data.data;
							if(data){
								this.ruleForm.username = data.memberName;
								this.ruleForm.mobile = data.mobile;
								this.ruleForm.id = data.memberId;
//								this.haveMessage = true;
								this.errMessage = '';
//								this.disabled = true;
							}else{
								this.haveMessage = false;
								this.errMessage = "没有此用户"
							}
					}else{
						this.ruleForm.username ='';
								this.ruleForm.mobile = '';
								this.ruleForm.id = '';
						this.errMessage = res.data.message
//						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//		获取商户信息
			getMerchantMessage(){
				this.$axios.get('/ucenter/admin/v1/sys/merchant/'+this.merchantId,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(!res) return;
					if(res.data.state === "000000"){
						this.ruleForm = res.data.data;
					}else{
						this.errMessage = res.data.message
//						this.$message.error(res.data.message);
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
			          	    this.ruleForm.thumbnail = this.getMyWeb.url.headerUrl;
			            	let content = this.ruleForm;
					    	var send = this.Qs.stringify(content);
						    this.$axios.post('/ucenter/admin/v1/sys/merchant',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
									if(res.data.state === "000000"){
										 this.$message({
									          message: res.data.message,
									          type: 'success'
									        });
									        this.$refs['ruleForm'].resetFields();
									        this.ruleForm.username = '';
									        this.ruleForm.mobile = '';
									        this.searchConfig.changeTime = new Date();
									}else{
										this.$message.error(res.data.message);
									}
						      	}).catch((err)=>{
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
			            		for(let i in this.ruleForm){
			            			if(i != 'status' && i != 'ctime'){
			            				content[i] = this.ruleForm[i];
			            			}
			            		}
					    	var send = "?"+this.Qs.stringify(content);
					    	this.$axios.put('/ucenter/admin/v1/sys/merchant'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					    		if(res.data.state === "000000"){
					    			this.$message({
									          message: res.data.message,
									          type: 'success'
									        });
									this.$router.go(-1)
					    		}else{
					    			this.$message.error(res.data.messag);
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
//			remoteMethod(query) {
//				console.log(query);
//		        if (query !== '') {
//		          this.loading = true;
//		          setTimeout(() => {
//		            this.loading = false;
//		            this.options4 = this.list.filter(item => {
//		              return item.label.toLowerCase()
//		                .indexOf(query.toLowerCase()) > -1;
//		            });
//		          }, 200);
//		        } else {
//		          this.options4 = [];
//		        }
//		      },
		    searchRes(data){
 					this.userId = data;
 					this.getUserMessage();
 			},
			uperror(){
				console.log('mmp')
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