<template>
	<div class="look-up-order-replace">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/orderList' }">订单管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">商户订单更换记录</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="padding: 15px 0;margin-top: 10px;">
					<h4>订单更换记录</h4>
				</div>
				<div style="padding-bottom: 10px;">
					<span>订单ID：{{this.id}}</span>
				</div>
				<div v-for="item in getData" style="border: 1px solid gainsboro;width: 900px;margin-bottom: 15px;">
					<div style="background: gainsboro;padding: 10px 0;position: relative;">
						<span style="color: red;padding-left: 15px;">
							<i class="el-icon-warning" style="color: red;font-size: 15px;"></i>
							当前更换状态：
							<span v-if="item.status == '0'">更换中</span>
							<span v-else-if="item.status == '1'">拒绝更换</span>
							<span v-else-if="item.status == '2'">完成更换</span>
							<span v-else-if="item.status == '3'">同意更换</span>
							<span v-else-if="item.status == '1'">线下沟通</span>
						</span>
						<span style="position: absolute;right: 0;padding-right: 15px;" >
								处理时间：{{transformationTime(item.handleTime)}}
							<span style="margin-left: 30px;">完成时间：{{transformationTime(item.finishTime)}}</span>
						</span>
					</div>
					<div style="padding: 15px;">
						<div style="margin: 15px 0;">
							<span>更换记录ID：1234567</span>
						</div>
						<div style="display: flex;flex-direction:row;margin: 15px 0;">
							<div>
								<span>更换原因</span>
							</div>
							<div style="flex: 1;padding-left: 30px;">
								<p>{{item.replaceReason}}</p>
							</div>
						</div>
						<div style="display: flex;flex-direction:row;margin: 20px 0;">
							<div>
								<span>商家回复</span>
							</div>
							<div style="flex: 1;padding-left: 30px;">
								<div>
									<p>{{item.refuseReason}}</p>
									<p style="color: gainsboro;">商家没做任何回复</p>
								</div>
								<div style="overflow: hidden;margin-top: 15px;">
									<div style="background: red;float: right;" class="btn" v-on:click="handle({name:'refuse',id:item.id})">拒绝</div>
									<div style="background: green;float: right;margin: 0 10px;" class="btn" v-on:click="handle({name:'agree',id:item.id})">同意</div>
								</div>
							</div>
						</div>
						<!--<div style="margin-top: 10px;padding-bottom: 10px;">
							<p style="padding-bottom: 10px;"><span style="font-weight: bolder;">商家回复</span></p>
							<p style="padding: 5px 0;">{{item.refuseReason}}</p>
						</div>-->
						<div style="padding-top:15px ;">
							<span style="color: gainsboro;font-size:13px;">更换前文件地址：{{item.originalUrl}}</span>
						</div>
					</div>
<!--					<div style="text-align: right;"><span>完成时间：{{transformationTime(item.finishTime)}}</span></div>-->
				</div>
			</div>
		</div>
<!--		提示框-->
		<el-dialog
		  :title="dialogMessage.title"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <div style="height: 30px;line-height: 30px;position: relative;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;"></i>
		  	<span style="padding-left:10px;">
		  		{{dialogMessage.message}}
		  	</span>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogBtn()">确 定</el-button>
		</span>
</el-dialog>
	</div>
</template>

<script>
	import vHeader from '../home/header.vue'
	export default {
		components:{
           vHeader
        },
        data(){
        	return{
        		dialogVisible:false,
        		dialogMessage:{
        			name:'',
        			id:'',
        			message:'',
        			title:''
        		},
        		headerUrl:'',
        		getData:{
        			clientName:'hello',
        			clientKey:'11',
        			clientType:'互联网',
        			clientContent:''
        		},
        		id:'',
        		data:[
        			{
        				lable:'账户名',
        				title:'username'
        			},
        			{
        				lable:'手机号',
        				title:'mobile'
        			},
        			{
        				lable:'商户名',
        				title:'shopName'
        			},
        			{
        				lable:'联系人',
        				title:'contacts'
        			},
        			{
        				lable:'联系电话',
        				title:'contactNumber'
        			},
        			{
        				lable:'联系地址',
        				title:'contactAddress'
        			},
        			{
        				lable:'创建时间',
        				title:'ctime'
        			},
        			{
        				lable:'商户状态',
        				title:'status'
        			},
        		]
        	}
        },
        created(){
        	var _url = window.location.href;
    		var theRequest = new Object(); 
    		var index = _url.indexOf('?')+1
    		var str = _url.substr(index); 
    		var strs = str.split("&"); 
    		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
//			通过url查询id
			this.id = theRequest.id;
			console.log(this.id);
        	this.getMerchantMessage();
        },
        methods:{
     	//		获取商户信息
			getMerchantMessage(){
				var content = {
					orderId: this.id 
				}
				this.$axios.get('/ucenter/admin/v1/order/replace/record',{params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(!res) return;
					console.log(res);
					if(res.data.state === "000000"){
						this.getData = res.data.data;
					}else{
						this.errMessage = res.data.message
//						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			拒绝和同意函数
			handle(data){
				this.dialogMessage = data;
				if(data.name =='refuse'){
					this.dialogMessage.message = '确认要拒绝退换么？';
					this.dialogMessage.title = '拒绝'
				}
				if(data.name =='agree'){
					this.dialogMessage.message = '确认要同意退换么？';
					this.dialogMessage.title = '同意'
				}
				this.dialogVisible = true;
			},
			dialogBtn(){
				var src;
				if(this.dialogMessage.name == 'refuse'){
					src = '/ucenter/admin/v1/order/replace/offline/communicated'
				}
				if(this.dialogMessage.name == 'agree'){
					src = 'ucenter/admin/v1/order/replace/admin/pass'
				}
				var content = {
					recordId: this.dialogMessage.id
				}
		    	var send = this.Qs.stringify(content);
				this.$axios.post(src,send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					        if(res.data.state === '000000'){
					        	this.dialogVisible = false;
					        	  this.$message({
							          message: res.data.message,
							          type: 'success'
							        });
					        }else{
					        	this.$message.error(res.data.message);
					        }
			      	}).catch((err)=>{
			                    this.$message.error('登录失败请重新登录');
			    	})
			},
//			转换时间
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
			},
        }
	}
</script>

<style scoped>
	.look-up-order-replace .btn{
		color: white;
		display: inline-block;
		padding: 2px 3px;
		font-size: 13px;
		border-radius:5px ;
		cursor: pointer;
	}
</style>