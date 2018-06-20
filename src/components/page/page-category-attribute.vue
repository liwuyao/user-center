<template>
	<div class="category-attribute">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;position: relative;">
				<!--<div class="btn-box">
					<router-link to='client/addClient'  style="display:block;">
						<v-button :message="btnMessage.add"></v-button>	  	
					</router-link>
				</div>-->
				<div class="btn-box-default btnActive" style="margin-left: 30px;margin-top: 10px;">
					<el-button class="btn-elm-box">
					<i :class="btnMessage.add.icon"></i>
					新增
					</el-button>
					<v-dialog :config="btnMessage.add.formConfig" class="page-dialog" :tableSelect='tableSelect' :message="tableSelect" v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="btn-box">
					<v-button :message="btnMessage.delete" style="cursor: pointer;"></v-button>
					<v-dialog :config="btnMessage.delete.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes"></v-dialog>
				</div>
				<div class="back-parent" v-on:click="backPage()">
					返回上一级
				</div>
			</div>
			<!--<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'应用状态'" :defaultVal="selectDefaultVal" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'condition'" v-on:search="searchRes" :placeholder="'输入clientkey查询'"></search-bar>
				</div>
			</div>-->
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
//     		dailogMessage:{
//     			id:''
//     		},
       		tableData:{
       			tableName:'attribute',
       			selectShow:true,
       			update:new Date(),
       			searchMessage:{},
       			selectMessage:{},
       			urlMessage:{
       				categoryId:''
       			},
       			listUrl:'/ucenter/admin/v1/product/attr/listProductAttrs',
       			listConfig:[
       					{
			      			lable:'属性名称',
			      			prop:'name'
			      		},
			      		{
			      			lable:'分类名称',
			      			prop:'categoryName'
			      		},
			      		{
			      			lable:'排列序号',
			      			prop:'weight'
			      		},
			      		{
			      			lable:'是否必填写',
			      			prop:'required'
			      		},
			      		{
			      			lable:'描述',
			      			prop:'remark'
			      		},
			      		{
			      			lable:'创建时间',
			      			prop:'ctime'
			      		},
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'id'
       				},
       				dialog:[
       				    {
				       		name:"name",
				       		title:'编辑属性',
				       		privateName:'product',
				       		idName:'id',
				       		urlSearch:'id',
				       		attributeCategoryId:'',
				       		type:"productCategoryAttribute",
				       		src:"/ucenter/admin/v1/product/category",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-xiugai'
				        },
				       	{
				       		name:"name",
				       		title:'删除',
				       		idName:'id',
				       		urlSearch:'',
				       		type:"delete",
				       		src:"/ucenter/admin/v1/product/attr",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-iconfontshanchu5'
				       	}
	       			]
       			}
       		},
       		btnMessage:{
       			add:{
       				name:"新增",
		       		type:"add",
		       		icon:"button-icon iconfont icon-el-icon-karakal-zengjia",
		       		formConfig:{
				       		name:"name",
				       		title:'新增属性',
				       		privateName:'product',
				       		attributeCategoryId:'',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productCategoryAttribute",
				       		src:"/ucenter/admin/v1/product/category",
				        },
       			},
       			delete:{
       				name:"删除",
		       		type:"delete",
		       		icon:"button-icon iconfont icon-el-icon-karakal-iconfontshanchu5",
		       		formConfig:{
		       			idName:'id',
		       			urlSearch:'',
		       			src:"/ucenter/admin/v1/product/attr",
		       			name:"name",
		       			type:"delete",
		       			classType:'',
		       			style:''
		       		}
       			},
       		},
       		selectDefaultVal:'-1',
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
//     		this.dailogMessage.id = this.$route.query.id;
       		this.tableData.urlMessage.categoryId = this.$route.query.id;
       		this.btnMessage.add.formConfig.attributeCategoryId = this.$route.query.id;
       		this.tableData.listBtnConfig.dialog[0].attributeCategoryId = this.$route.query.id;
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
		},
		backPage(){
			this.$router.go(-1)
		}
	},
       
    }
</script>

<style scoped>
	.category-attribute{
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
    .btn-box-default{
		display: inline-block;
		margin-right: 10px;
		position: relative;
		cursor: pointer;
	}
	.btnActive:hover .btn-elm-box{
				background: #1888f7 !important;
				color: white;
	}
	.category-attribute .back-parent{
		cursor: pointer;
/*		color: #7db4f3 !important;*/
		color: #407DC0;
		position: absolute;
		top:55px;
		right: 157px;
	}
	.category-attribute .back-parent:hover{
		color: #7db4f3;
	}
</style>