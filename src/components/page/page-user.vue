<template>
	<div class="page-user">
		<div class="page-user-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box">
					<router-link to='user/addClient'  style="display:block;">
						<v-button :message="btnMessage.add"></v-button>	  	
					</router-link>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.delete"></v-button>
					<v-dialog :config="btnMessage.delete.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="btn-box-default" :class="{btnActive:!btnMessage.disable.disable}">
					<el-button class="btn-elm-box" :disabled='btnMessage.disable.disable'>
					<i :class="btnMessage.disable.icon"></i>
					禁止
					</el-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes" v-if="!btnMessage.disable.disable"></v-dialog>
				</div>
				<div class="btn-box-default" :class="{btnActive:!btnMessage.able.disable}">
					<el-button class="btn-elm-box" :disabled='btnMessage.able.disable'>
					<i :class="btnMessage.able.icon"></i>
					启用
					</el-button>
					<v-dialog :config="btnMessage.able.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes" v-if="!btnMessage.able.disable"></v-dialog>
				</div>
				<!--<div class="btn-box">
					<v-button :message="btnMessage.disable"></v-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.able"></v-button>
					<v-dialog :config="btnMessage.able.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>-->
			</div>
			<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'用户状态'" class="page-user-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'name'" v-on:search="searchRes" :placeholder="'输入手机号查询或用户名'"></search-bar>
				</div>
			</div>
			<div style="padding-bottom:50px ;overflow: hidden;">
				<v-table :message='tableData' v-on:tableRes="tableRes" :searchMessage="tableData.searchMessage" :selectMessage="tableData.selectMessage" :updateMessage="tableData.update"></v-table>
			</div>
		</div>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	import selectButton from '../button/button-select';
	import vButton from '../button/button';
	import searchBar from '../search/search-bar';
	import vHead from '../home/header';
	import vTable from '../table/table';
	export default {
	  name: 'pageUser',
	  components:{
           vDialog,selectButton,searchBar,vTable,vButton
       },
	   data(){
       	return{
       		tableSelect:[],
       		tableData:{
       			selectShow:true,
       			update:[],
       			searchMessage:{},
       			selectMessage:{},
       			urlMessage:{
       				name:null,
        			status:'',
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/member',
       			listConfig:[
       				{
       					lable:'手机号码',
       					width:'250',
       					prop:'mobile'
       				},
       				{
       					lable:'用户名',
       					prop:'memberName'
       				},
       				{
       					lable:'昵称',
       					prop:'nickname'
       				},
       				{
       					lable:'性别',
       					width:'120',
       					prop:'gender'
       				},
       				{
       					lable:'注册时间',
       					prop:'registerTime'
       				},
       				{
       					lable:'状态',
       					prop:'status'
       				}
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'memberId'
       				},
       				linkTo:[
	       				{
	       					name:'查看',
	       					src:'/lookUser',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-chakan'
	       				},
	       				{
	       					name:'修改',
	       					src:'/userModify',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-xiugai'
	       				},
       				],
       				dialog:[
				       	{
				       		name:"mobile",
				       		type:"delete",
				       		title:'删除',
				       		idName:'memberId',
				       		urlSearch:'memberIds',
				       		src:"/ucenter/admin/member",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-iconfontshanchu5'
				       	}
	       			]
       			}
       		},
       		btnMessage:{
       			add:{
       				name:"增加",
		       		type:"add",
		       		icon:"button-icon iconfont icon-el-icon-karakal-zengjia",
		       		formConfig:{
		       			name:"增加",
		       			type:"add",
		       			classType:'',
		       			style:'button'
		       		}
       			},
       			delete:{
       				name:"删除",
		       		type:"delete",
		       		icon:"button-icon iconfont icon-el-icon-karakal-iconfontshanchu5",
		       		formConfig:{
		       			idName:'memberId',
		       			urlSearch:'memberIds',
		       			src:"/ucenter/admin/member",
		       			name:"mobile",
		       			type:"delete",
		       			classType:'',
		       			style:''
		       		}
       			},
       			disable:{
       				name:"禁用",
		       		type:"disable",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-jinyong",
		       		formConfig:{
		       			title:'禁用提示',
		       			idName:'memberId',
		       			urlSearch:'memberIds',
		       			src:"/ucenter/admin/member/disable",
		       			name:"mobile",
		       			type:"disable",
		       			classType:'',
		       			style:''
		       		}
       			},
       			able:{
       				name:"启用",
		       		type:"able",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-qiyong",
		       		formConfig:{
		       			title:'启用提示',
		       			idName:'memberId',
		       			urlSearch:'memberIds',
		       			src:"/ucenter/admin/member/enable",
		       			name:"mobile",
		       			type:"able",
		       			classType:'',
		       			style:''
		       		}
       			}
       		},
       		selectMessage:[
		        { value: '-1',
		          label: '全部'
		        },
		        { value: '0',
		          label: '启用'
		        },
		        { value: '1',
		          label: '禁用'
		        },
       		],
	        isActive:false
       	}
       },
        methods:{
//     	sendFrom(a){
//     		console.log(a.b)
//     	},
//		列表信息返回
 		tableRes(data){
 			this.tableSelect = data;
 			var able = [];
 			var disable = [];
 			if(data.length == 0){
 				this.btnMessage.disable.disable = true;
 				this.btnMessage.able.disable = true;
 			}
	 			for(let i = 0;i<data.length;i++){
	 			for(let index in data[i]){
	   					if(data[i].status == 0){
	   						disable.push(data[i]);
	   					}
	   					if(disable.length != 0){
	   							this.btnMessage.disable.disable = false;
	   						}else{
	   							this.btnMessage.disable.disable = true;
	   					}
	   					if(data[i].status == 1){
	   						able.push(data[i]);
	   					}
	   					if(able.length != 0){
	   							this.btnMessage.able.disable = false;
	   						}else{
	   							this.btnMessage.able.disable = true;
	   						}
	   				}
	 			}
 		},
// 		弹框信息返回
 		dialogRes(data){
 			console.log(data);
 			this.tableData.update = this.tableSelect;
 		},
// 		搜索信息
 		searchRes(data){
 			if(Object.keys(data).length != 0){
 				this.tableData.searchMessage = data;
 			}
 		},
 		// 		选择信息
		selectRes(data){
				if(data){
					console.log(data);
					this.tableData.selectMessage={
						status:data
					};
				}
			}
	 	}
	 }
</script>

<style  scoped>
	.page-user{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.page-user-content{
		width: 100%;
		flex: 1;
	}
	.btn-box{
		display: inline-block;
		margin-right: 10px;
		position: relative;
		cursor: pointer;
	}
	.btn-elm-box{
		margin-right: 10px;
		border: none;
		outline: none;
		padding: 9px 30px;
		border-radius: 5px;
		background: white;
		box-shadow: 0px 2px 10px -8px #888888;
		position: relative;
		cursor: pointer;
	}
	.btn-elm-box i{
		color: #0199fe;
		margin-right: 10px;
	}
	.btn-box-default{
		display: inline-block;
		margin-right: 10px;
		position: relative;
	}
	.btnActive:hover .btn-elm-box{
				background: #1888f7 !important;
				color: white;
			}
	.btnActive:hover .btn-elm-box i{
				color: white;
			}
	.btn-box:nth-child(1){
		margin-left: 16px;
	}
	.page-user-select{
		float: left;
		margin: 0 16px;
	}
</style>