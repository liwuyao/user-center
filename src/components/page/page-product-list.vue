<template>
	<div class="product-list">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box-default" :class="{btnActive:!btnMessage.disable.disable}" style="margin-left: 17px;">
					<el-button class="btn-elm-box" :disabled='btnMessage.disable.disable'>
					<i :class="btnMessage.disable.icon"></i>
					下架
					</el-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes" v-if="!btnMessage.disable.disable"></v-dialog>
				</div>
				<div class="btn-box-default" :class="{btnActive:!btnMessage.able.disable}">
					<el-button class="btn-elm-box" :disabled='btnMessage.able.disable'>
					<i :class="btnMessage.able.icon"></i>
					上架
					</el-button>
					<v-dialog :config="btnMessage.able.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes" v-if="!btnMessage.able.disable"></v-dialog>
				</div>
			</div>
			<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'商品状态'" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'productName'" v-on:search="searchRes" :placeholder="'请输入商品名称'"></search-bar>
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
       				productName:null,
        			status:'',
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/v1/product',
       			listConfig:[
       				{
       					lable:'商品名称',
       					width:'120',
       					prop:'name'
       				},
       				{
       					lable:'副标题',
       					width:'140',
       					prop:'subTitle'
       				},
       				{
       					lable:'商品描述',
       					width:'250',
       					prop:'description'
       				},
       				{
       					lable:'标签',
       					width:'250',
       					prop:'label'
       				},
       				{
       					lable:'审核时间',
       					width:'250',
       					prop:'auditTime'
       				},
       				{
       					lable:'商品状态',
       					width:'120',
       					prop:'status'
       				}
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'id'
       				},
//     				linkTo:[
//	       				{
//	       					name:'审核',
//	       					src:'/lookClient',
//	       					iconClass:'table-icon iconfont icon-el-icon-karakal-slideBar-shenhe'
//	       				},
//	       				{
//	       					name:'修改',
//	       					src:'/client/modify',
//	       					iconClass:'table-icon iconfont icon-el-icon-karakal-xiugai'
//	       				},
//     				],
       				dialog:[
       					{
				       		name:"name",
				       		title:'审核',
				       		privateName:'product',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productExamine",
				       		src:"/ucenter/admin/v1/product/audit",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-slideBar-shenhe'
				       },
				       	{
				       		name:"name",
				       		title:'删除',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"delete",
				       		src:"/ucenter/admin/v1/product",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-iconfontshanchu5'
				       	}
	       			]
       			}
       		},
       		btnMessage:{
       			disable:{
       				name:"下架提示",
		       		type:"disable",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-jinyong",
		       		formConfig:{
		       			title:'下架提示',
		       			idName:'id',
		       			urlSearch:'productId',
		       			src:"/ucenter/admin/v1/product/unpublish",
		       			name:"name",
		       			type:"disable",
		       			classType:'',
		       			style:''
		       		}
       			},
       			able:{
       				name:"上架提示",
		       		type:"able",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-qiyong",
		       		formConfig:{
		       			title:'上架提示',
		       			idName:'id',
		       			urlSearch:'productId',
		       			src:"/ucenter/admin/v1/product/publish",
		       			name:"name",
		       			type:"able",
		       			classType:'',
		       			style:''
		       		}
       			}
       		},
       		selectMessage:[
       			{ value: '',
		          label: '全部'
		        },
		        { value: '0',
		          label: '待编辑'
		        },
		        { value: '1',
		          label: '待审核'
		        },
		        { value: '2',
		          label: '审核通过'
		        },
		        { value: '3',
		          label: '审核不通过'
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
 			console.log(data);
 			if(data.length == 0 || data.length>1){
 				this.btnMessage.disable.disable = true;
 				this.btnMessage.able.disable = true;
 			}
	 			for(let i = 0;i<data.length;i++){
	   					if(data[i].status == 4){
	   						disable.push(data[i]);
	   					};
	   					if(data[i].status == 2 || data[i].status == 6){
	   						able.push(data[i]);
	   					};
//	   					console.log(disable.length);
	   					if(disable.length>0 && able.length>0){
	   						this.btnMessage.disable.disable = true;
	   						this.btnMessage.able.disable = true;
	   					}else{
	   						if(disable.length == 1){
	   							this.btnMessage.disable.disable = false;
	   						}else{
	   							this.btnMessage.disable.disable = true;
		   					};
		   					if(able.length == 1){
		   							this.btnMessage.able.disable = false;
		   						}else{
		   							this.btnMessage.able.disable = true;
		   					};
	   					}
	 			}
 		},
// 		弹框信息返回
 		dialogRes(data){
 			this.tableData.update = new Date();
 		},
// 		搜索信息
 		searchRes(data){
 			console.log(data)
 			if(Object.keys(data).length != 0){
 				this.tableData.searchMessage = data;
// 				setTimeout(()=>{
// 					this.tableData.searchMessage = {};
// 				},0)
 			}
 		},
// 		选择信息
		selectRes(data){
					this.tableData.selectMessage={
						status:data
					};
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