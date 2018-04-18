<template>
	<div>
		<el-input v-model="zhuce.clientKey" placeholder="请输入内容"></el-input>
		<el-input v-model="zhuce.clientSecret" placeholder="请输入内容"></el-input>
		<button v-on:click="zhuche()">注册</button>
		<button v-on:click="test()">测试</button>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				zhuce:{
					clientKey:'test-comp1',
					clientSecret:'5496db31a9404066a45728999f432f0b',
					mobile:'18380418077',
					memberName:'xyz151',
					memberType:1,
					memberRole:1,
					password:'123456',
					passwordConfirm:'123456'
				}
			}
		},
		 methods:{
			zhuche(){
		    	let content = this.zhuce;
		    	   var send = this.Qs.stringify(content)
		    	   	console.log(send);
					this.$axios.post('api/ucenter/admin/member',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
						console.log(res);
			      	}).catch(function(err){
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			       })
		   },
		   test(){
				this.$axios({url:'api/ucenter/admin/client',method: "get", headers:{Cookie: "cookie1=value; cookie2=value; cookie3=value;"}}).then((res)=>{
						console.log(res);
			      	}).catch(function(err){
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			       })
		   }
		}
	}
</script>

<style>
</style>