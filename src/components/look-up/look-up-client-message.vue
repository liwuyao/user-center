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
				<!--<div style="height: 500px;margin-top: 30px;">
					<div style="padding: 7px 0;" v-for="(item, index) in data" :key="index">
						<span style="font-size: 18px;color: gray;">{{item.lable}}：</span>
						<span v-if="getData[item.title]">{{getData[item.title]}}</span>
						<span v-else>暂时无相关信息</span>
					</div>
					<img :src="getData.avatar"  style="position: absolute;right: 260px;top: 50px;width: 150px;"/>
				</div>-->
				<div style="margin-top: 30px;display: flex;flex-direction: row;">
					<div style="padding: 50px;">
						<img :src="getData.thumbnail"  style="right: 260px;top: 50px;width: 150px;"/>
						<p style="text-align: center;">
							<span style="color: rgb(116, 184, 250);">应用名称：</span>
							<span v-if="getData.clientName">{{getData.clientName}}</span>
							<span v-else>无名称</span>
						</p>
					</div>
					<div style="flex: 1;padding-left: 30px;border-left: 1px solid gainsboro;">
						<div style="padding: 7px 0;" v-for="(item, index) in data" :key="index">
							<span style="font-size: 15px;color: rgb(116, 184, 250);">{{item.lable}}：</span>
							<span v-if="getData[item.title]" style="padding-left: 10px;color: gray;">{{getData[item.title]}}</span>
							<span v-else style="padding-left: 10px;color: gray;">暂时无相关信息</span>
						</div>
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
        				lable:'状态',
        				title:'state'
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
        			{
        				lable:'创建时间',
        				title:'createTime'
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
					if(res.data.state === "000000"){
						var data = res.data.data;
						this.getData = data;
						if(this.getData.clientType == 0){
							this.getData.clientType = "互联网";
						}
						if(this.getData.clientType == 0){
							this.getData.clientType = "系统应用";
						}
						if(this.getData.state == 0){
							this.getData.state =  "启用"
						}else{
							this.getData.state =  "禁用"
						}
						this.getData.createTime = this.transformationTime(this.getData.createTime);
					}else{
						this.$message.error('res.data.message');
					}
		      	}).catch(function(err){
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