<template>
	<div class="order-lsit">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box">
					<router-link to='client/addClient'  style="display:block;">
						<v-button :message="btnMessage.add"></v-button>	  	
					</router-link>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.delete" style="cursor: pointer;"></v-button>
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
				<select-button :message="selectMessage" :placeholder="'应用状态'" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'condition'" v-on:search="searchRes" :placeholder="'输入clientkey查询'"></search-bar>
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
	  name: 'pageIndex',
	  components:{
           vDialog,selectButton,searchBar,vTable,vButton
       },
       data(){
       	return{
       		tableSelect:[],
       		tableData:{
       			update:new Date(),
       			searchMessage:{},
       			selectMessage:{},
       			urlMessage:{
       				condition:null,
        			state:'',
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/client',
       			listConfig:[
       				{
       					lable:'应用名称',
       					width:'120',
       					prop:'clientName'
       				},
       				{
       					lable:'clientKey',
       					width:'140',
       					prop:'clientKey'
       				},
       				{
       					lable:'注册用户',
       					width:'250',
       					prop:'createMemberName'
       				},
       				{
       					lable:'注册时间',
       					width:'250',
       					prop:'createTime'
       				},
       				{
       					lable:'状态',
       					width:'120',
       					prop:'state'
       				}
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'clientId'
       				},
       				linkTo:[
	       				{
	       					name:'查看',
	       					src:'/lookClient',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-chakan'
	       				},
	       				{
	       					name:'修改',
	       					src:'/client/modify',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-xiugai'
	       				},
       				],
       				dialog:[
				       	{
				       		name:"clientName",
				       		title:'删除',
				       		idName:'clientId',
				       		urlSearch:'clientIds',
				       		type:"delete",
				       		src:"/ucenter/admin/client",
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
		       			idNames:'clientId',
		       			urlSearch:'clientIds',
		       			src:"/ucenter/admin/client",
		       			name:"clientName",
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
		       			idName:'clientId',
		       			urlSearch:'clientIds',
		       			src:"/ucenter/admin/client/disable",
		       			name:"clientName",
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
		       			idName:'clientId',
		       			urlSearch:'clientIds',
		       			src:"/ucenter/admin/client/enable",
		       			name:"clientName",
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
       created(){
       	
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
	   					if(data[i].state == 0){
	   						disable.push(data[i]);
	   					};
	   					if(data[i].state == 1){
	   						able.push(data[i]);
	   					};
	   					if(disable.length>0 && able.length>0){
	   						this.btnMessage.disable.disable = true;
	   						this.btnMessage.able.disable = true;
	   					}else{
	   						if(disable.length != 0){
	   							this.btnMessage.disable.disable = false;
	   						}else{
	   							this.btnMessage.disable.disable = true;
		   					};
		   					if(able.length != 0){
		   							this.btnMessage.able.disable = false;
		   						}else{
		   							this.btnMessage.able.disable = true;
		   					};
	   					}
	   				}
	 			}
 		},
// 		弹框信息返回
 		dialogRes(data){
 			this.tableData.update = new Date();
 		},
// 		搜索信息
 		searchRes(data){
 			if(Object.keys(data).length != 0){
 				this.tableData.searchMessage = data;
// 				setTimeout(()=>{
// 					this.tableData.searchMessage = {};
// 				},0)
 			}
 		},
// 		选择信息
		selectRes(data){
				if(data){
					this.tableData.selectMessage={
						state:data
					};
				}
			}
	 	}
    }
</script>

<style scoped>
	.application{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.application-content{
		width: 100%;
		flex: 1;
	}
	.btn-box{
		display: inline-block;
		margin-right: 10px;
		position: relative;
		cursor: pointer !important;
	}
	.btn-box-default{
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
	}
	.btn-elm-box i{
		color: #0199fe;
		margin-right: 10px;
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
	.application-select{
		float: left;
		margin: 0 16px;
	}
</style>