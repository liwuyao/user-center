<template>
	<div class="look-up-client">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/home' }">应用管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">应用查看</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="height: 500px;margin-top: 30px;">
					<!--<el-form :model="getData"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item v-for="(item, index) in data" :label="item.lable" :key="index">
					  	<span>{{getData[item.title]}}</span>
					  </el-form-item>
					</el-form>-->
					<div style="padding: 7px 0;" v-for="(item, index) in data" :key="index">
						<span style="font-size: 18px;color: gray;">{{item.lable}}：</span>
						<span v-if="getData[item.title]">{{getData[item.title]}}</span>
						<span v-else>暂时无相关信息</span>
					</div>
					<img src="http://img3.duitang.com/uploads/item/201505/26/20150526002859_c2yKG.thumb.700_0.jpeg"  style="position: absolute;right: 260px;top: 50px;width: 150px;"/>
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
        		getData:{
        			clientName:'hello',
        			clientKey:'11',
        			clientType:'互联网',
        			clientContent:''
        		},
        		id:'',
        		data:[
        			{
        				lable:'应用名称',
        				title:'clientName'
        			},
        			{
        				lable:'clientKey',
        				title:'clientKey'
        			},
        			{
        				lable:'应用类型',
        				title:'clientType'
        			},
        			{
        				lable:'应用描述',
        				title:'clientContent'
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
        	this.getUserMessage();
        },
        methods:{
//      	获取数据
        	 getUserMessage(){
				this.$axios.get('/ucenter/admin/client/'+this.id,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					var data = res.data.data;
					this.getData = data;
					if(this.getData.clientType == 0){
						this.getData.clientType = "互联网";
					}
					if(this.getData.clientType == 0){
						this.getData.clientType = "系统应用";
					}
		      	}).catch(function(err){
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
        }
	}
</script>

<style>
</style>