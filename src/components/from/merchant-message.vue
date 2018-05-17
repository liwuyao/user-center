<template>
	<div class="client-message">
		<header style="padding: 20px  0 20px 55px;border-bottom:1px solid gainsboro;box-shadow: 0px 2px 10px -8px #888888;">
			<h3>增加商户</h3>
		</header>
		<div style="width: 100%;overflow: hidden;">
			<div class="client-message-content-box">
				<div style="padding: 30px 0;">
					<el-breadcrumb separator="/">
					  <el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					  <el-breadcrumb-item :to="{ path: '/merchantList' }">商户管理</el-breadcrumb-item>
					  <el-breadcrumb-item><span style="color: #74b8fa;">{{linkMessage}}</span></el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="client-message-content">
					<!--<div style="padding: 22px 35px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
							<h4>增加商户</h4>
					</div>-->
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="账户名" prop="username">
						    <el-input v-model="ruleForm.username" style="width: 400px;"  placeholder="请输入账户名"></el-input>
						</el-form-item>
						<el-form-item label="账户手机号" prop="mobile">
						    <el-input v-model="ruleForm.mobile" style="width: 400px;"  placeholder="请输入账户手机号"></el-input>
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
						<el-form-item label="ID">
						    <el-input v-model="ruleForm.id" style="width: 400px;"  placeholder="请输入ID(不填将自动生成)"></el-input>
						</el-form-item>
					  	<div style="height: 50px;position: relative;">
					  		<el-button type="primary" style="position: absolute;right: 70px;" v-if="htmlId == 'addMerchant'" v-on:click="sendClientMessage('ruleForm')">确认增加</el-button>
					  		<el-button type="primary" style="position: absolute;right: 70px;" v-if="htmlId == 'modify'" v-on:click="modifyMessage('ruleForm')">确认修改</el-button>
					  	</div>
					</el-form>
					<template>
					  <el-select
					    v-model="value9"
					    multiple
					    filterable
					    remote
					    reserve-keyword
					    placeholder="请输入关键词"
					    :remote-method="remoteMethod"
					    :loading="loading">
					    <el-option
					      v-for="item in options4"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	export default {
		components:{
           vDialog
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
		    return {
		    	clientSecretStatu:false,
		    	clientSecret:'',
		    	updateMessage:{
		    		objType:'0101'
		    	},
		    	dialogReset:false,
		    	test:false,
		    	imageUrl: '',
		    	htmlId:'',
		    	userId:'',
		    	disabled:false,
		    	linkMessage:'增加商户',
		    	resetWord:'',
		        ruleForm: {
		          username: '',
		          mobile:'',
		          shopName: '',
		          contacts: '',
		          contactNumber:'',
		          contactAddress:'',
		          id:''
		        },
		        dialogConfig:{
				       		message:'clientSecret已重置',
				       		type:'prompt',
				       		style:'',
				       		state:false
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
		        },
		         options4: [],
		        value9: [],
		        list: [],
		        loading: false,
		        states: ["Alabama", "Alaska", "Arizona",
		        "Arkansas", "California", "Colorado",
		        "Connecticut", "Delaware", "Florida",
		        "Georgia", "Hawaii", "Idaho", "Illinois",
		        "Indiana", "Iowa", "Kansas", "Kentucky",
		        "Louisiana", "Maine", "Maryland",
		        "Massachusetts", "Michigan", "Minnesota",
		        "Mississippi", "Missouri", "Montana",
		        "Nebraska", "Nevada", "New Hampshire",
		        "New Jersey", "New Mexico", "New York",
		        "North Carolina", "North Dakota", "Ohio",
		        "Oklahoma", "Oregon", "Pennsylvania",
		        "Rhode Island", "South Carolina",
		        "South Dakota", "Tennessee", "Texas",
		        "Utah", "Vermont", "Virginia",
		        "Washington", "West Virginia", "Wisconsin",
		        "Wyoming"]
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
			this.userId = theRequest.id;
//			if(this.htmlId =='look'){
//				this.linkMessage = "查看应用"
//				this.getUserMessage();
//				this.disabled = true;
//			}
			if(this.htmlId == 'modify'){
				this.disabled = true;
				this.linkMessage = "修改应用";
				this.getUserMessage();
			};
    	},
    	 methods: {
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
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
	      
//	      	获取数据
	        getUserMessage(){
				this.$axios.get('/ucenter/admin/client/'+this.userId,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						var data = res.data.data;
						this.ruleForm = data;
						for(let i in data){
							if(i == 'clientGrantType'){
								if(data.clientGrantType == 1){
									this.ruleForm.clientType = 'COMMON_CLIENT';
								}
								if(data.clientGrantType == 3){
									this.ruleForm.clientType = 'SYSTEM_CLIENT';
								}
							}else{
								this.ruleForm[i] = data[i];
							}
						}
						this.imageUrl = this.ruleForm.thumbnail;
					}else{
						this.$message.error(res.data.messag);
					}
		      	}).catch(function(err){
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
										this.$router.go(-1)
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
					    	     content.clientKey = this.ruleForm.clientKey;
					    	     content.clientName = this.ruleForm.clientName;
					    	     content.clientId = this.ruleForm.clientId;
					    	var send = "?"+this.Qs.stringify(content);
					    	   	console.log(send);
					    	this.$axios.put('/ucenter/admin/client/'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					    		if(res.data.state === "000000"){
					    			this.ruleForm = res.data.data;
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
//		    重置钥密
			resetPassWord(){
				var content = {
					clientId:this.userId
				}
				var send = "?"+this.Qs.stringify(content);
				this.$axios.put('/ucenter/admin/client/secretReset/'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
								if(res.data.state === "000000"){
									this.resetWord = res.data.message;
									this.dialogReset = false;
								}else{
									 this.$message.error(res.data.messag);
								}
					      	}).catch((err)=>{
					                    this.$message.error('接口请求出错');
					        })
			},
//			测试
//			test2(){
//				console.log(2)
//				this.$axios.post('/updata/upload/common/image',this.getMyWeb.axios.aAjaxConfig).then((res)=>{
//								console.log(res)
//					      	}).catch((err)=>{
//					                    this.$message.error('接口请求出错');
//					        })
//			},
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