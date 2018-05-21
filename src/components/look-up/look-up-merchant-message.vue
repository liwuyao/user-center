<template>
	<div class="look-up-merchant">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/merchantList' }">商户管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">商户查看</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="border-bottom:1px solid gainsboro ;padding: 15px 0;margin-top: 10px;">
					<h3>商户详情</h3>
				</div>
				<div style="margin-top: 20px;">
					<div style="padding: 7px 0;" v-for="(item, index) in data" :key="index">
							<span style="font-size: 15px;color: rgb(116, 184, 250);">{{item.lable}}：</span>
							<span v-if="getData[item.title]" style="padding-left: 10px;color: gray;">
								<span>{{getData[item.title]}}</span>
							</span>
							<span v-else style="padding-left: 10px;color: gray;">暂时无相关信息</span>
					</div>
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
        	return{
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
				this.$axios.get('/ucenter/admin/v1/sys/merchant/'+this.id,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(!res) return;
					if(res.data.state === "000000"){
						this.getData = res.data.data;
						if(this.getData.status = 1){
							this.getData.status = '启用'
						}else{
							this.getData.status = '禁用'
						}
						this.getData.ctime = this.transformationTime(this.getData.ctime);
					}else{
						this.errMessage = res.data.message
//						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			转换时间
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
			},
        }
	}
</script>

<style>
</style>