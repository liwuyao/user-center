<template>
	<div class="application">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box">
					<router-link to='client/addClient'  style="display:block;">
						<v-button :message="btnMessage.add"></v-button>	  	
					</router-link>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.delete"></v-button>
					<v-dialog :config="btnMessage.delete.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.disable"></v-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.able"></v-button>
					<v-dialog :config="btnMessage.able.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
			</div>
			<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'待定'" class="application-select"></select-button>
				<select-button :message="selectMessage" :placeholder="'待定'" class="application-select"></select-button>
				<div style="display:inline-block;margin-left:220px;">
					<search-bar :name="'condition'" v-on:search="searchRes" :placeholder="'输入clientkey查询'"></search-bar>
				</div>
			</div>
			<div style="padding-bottom:50px ;overflow: hidden;">
				<v-table :message='tableData' v-on:tableRes="tableRes" :update="tableData.update"></v-table>
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
       			update:[],
       			searchMessage:{},
       			listUrl:'api/ucenter/admin/client',
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
	       					src:'/client/look',
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
				       		name:"删除",
				       		idName:'clientId',
				       		type:"delete",
				       		src:"api/ucenter/admin/client",
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
		       			idName:'clientIds',
		       			src:"api/ucenter/admin/client",
		       			name:"删除",
		       			type:"delete",
		       			classType:'',
		       			style:''
		       		}
       			},
       			disable:{
       				name:"禁用",
		       		type:"disable",
		       		icon:"button-icon iconfont icon-el-icon-karakal-jinyong",
		       		formConfig:{
		       			idName:'clientIds',
		       			src:"api/ucenter/admin/client/disable",
		       			name:"禁用",
		       			type:"disable",
		       			classType:'',
		       			style:''
		       		}
       			},
       			able:{
       				name:"启用",
		       		type:"able",
		       		icon:"button-icon iconfont icon-el-icon-karakal-qiyong",
		       		formConfig:{
		       			idName:'clientIds',
		       			src:"api/ucenter/admin/client/enable",
		       			name:"禁用",
		       			type:"able",
		       			classType:'',
		       			style:''
		       		}
       			}
       		},
       		selectMessage:[{
	          value: '选项1',
	          label: '待定'
	        }],
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
 				setTimeout(()=>{
 					this.tableData.searchMessage = {};
 				},500)
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
	}
	.btn-box:nth-child(1){
		margin-left: 16px;
	}
	.application-select{
		float: left;
		margin: 0 16px;
	}
</style>