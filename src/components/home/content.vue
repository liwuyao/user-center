<template>
	<div class="content">
		<div style="height: 100%;display: flex;flex-direction:row ;">
			<div  class="side-bar-content">
		    <v-bar :message ="routerMessage"></v-bar>
			</div>
			<div  style="height: 100%;overflow: auto;">
				<div  id="routerBox">
					<router-view style="overflow: hidden;"></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vBar from './slide-Bar';
	export default {
		name: 'vcontent',
		components:{
           vBar
       },
		data(){
			return{
				slidBarStatus:false,
				contentLeft:1,
				contentRight:23,
				routerMessage:[
//						{
//							icon:'iconfont icon-el-icon-karakal-yingyong slide-bar2-icon',
//							name:'应用管理',
//							index:'',
//							child:[
//								{
//									title:'应用中心',
//									index:'/home'
//								},
//								{
//									title:'测试demo',
//									className:'right-select1',
//									list:[
//										{
//											name:'无极剑圣',
//											index:'/slide'
//										}
//									]
//								},
//								{
//									title:'测试demo',
//									className:'right-select5',
//									list:[
//										{
//											name:'应用中心',
//											index:'/slide'
//										}
//									]
//								}
//							]
//						},
						{   icon:'iconfont icon-el-icon-karakal-yingyong slide-bar2-icon',
							name:'应用中心',
							blank:true,
							index:'/home'
						},
						{
							icon:'el-icon-location slide-bar2-icon',
							name:'用户管理',
							blank:true,
							index:'/usercenter'
						},
					]
			}
		},
		created(){
			setTimeout(()=>{
				var elm = document.querySelector('.content');
				var elm2 = document.getElementById('routerBox');
				var width = window.screen.width+'px';
					elm.style.width = width;
					elm2.style.width = window.screen.width-60-17 +'px';
			},100)
		},
		 computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
       },
		methods: {
		}
	}
</script>

<style scoped>
	.content{
		height: 100%;
		overflow: hidden;
	}
	.content .side-bar-content{
		display: inline-block;
		height: 100%;
	}
	.content .side-bar-content .el-menu{
		border-right: none !important;
	}
	.side-bar-text{
		width: 100%;
		text-align: center;
	}
	.side-bar-icon{
		position: absolute;
		left: 20%;
		top:50%;
		transform: translate(0,-50%);
	}
</style>