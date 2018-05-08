<template>
	<div class="header">
		<div class="header-box">
			<div style="overflow: hidden;height: 100%;display: inline-block;position: relative;width: 300px;margin-left: 40px;">
				<img src="../../assets/iocn/logo.png" style="width: 55px;height: 55px;position: absolute;top: 50%;transform: translate(0,-50%);"/>
				<span style="position: absolute;top: 50%;transform: translate(0,-50%);left: 70px;font-size: 20px;color: #407dc0;">成都乐听运维中心</span>
			</div>
			<div style="overflow: hidden;display: inline-block;height: 45px;position: absolute;right: 50px;top: 50%;transform: translate(0,-50%);">
			<img :src='headerUrl' style="width: 45px;height: 45px;border-radius:50% ;float: left;"/>
			<div style="display: inline-block;height: 100%;line-height: 45px;float: left;">
				<span style="margin: 0 15px;">{{userName}}</span>
				<span style="cursor: pointer;" v-on:click="logout()">退出</span>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vheader',
		data(){
			return{
				userName:'',
				headerUrl:''
			}
		},
		created(){
			this.userName = localStorage.letingUserName;
			this.headerUrl = localStorage.letingAvatar;
		},
		methods:{
			logout(){
				let content = localStorage.letingUserName;
		    	let send = this.Qs.stringify(content);
				this.$axios.post('/ucenter/admin/logout',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
							console.log(res);
							this.$message({
					          message: res.data.message,
					          type: 'success'
					        });
							setTimeout(()=>{
								this.$router.push('/login');
							},500)
			      	}).catch((err)=>{
			                    this.$message.error(err.data.message);
			                    console.error(err);
			    })
			}
		}
	}
</script>
<style scoped>
	.header{
	}
	.header-box{
		position: relative;
		height: 66px;
		border-bottom: solid 1px #e6e6e6;
		box-shadow: 0px 2px 10px -8px #888888
	}
</style>