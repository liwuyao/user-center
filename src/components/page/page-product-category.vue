<template>
	<div class="product-categogy">
		<div class="application-content" style="position: relative;">
			<div v-on:click="backPage()" style="position: absolute;right: 50px;top:60px;color: #407DC0;" class="back-parent" v-if="backStatu">返回上级</div>
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<h3 style="padding-left:30px ;">商品分类:<span style="padding-left: 10px;">{{parentName}}</span></h3>
				<div class="btn-box-default btnActive" style="margin-left: 30px;margin-top: 10px;">
					<el-button class="btn-elm-box">
					<i :class="btnMessage.disable.icon"></i>
					新增
					</el-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' :message="tableSelect" v-on:send="dialogRes"></v-dialog>
				</div>
			</div>
			<!--<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'商品状态'" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'productName'" v-on:search="searchRes" :placeholder="'请输入商品名称'"></search-bar>
				</div>
			</div>-->
			<div style="padding-bottom:50px ;overflow: hidden;">
				<v-table :message='tableData' v-on:tableRes="tableRes" :searchMessage="tableData.searchMessage" :selectMessage="tableData.selectMessage" :updateMessage="tableData.update" :backParent="parentId"></v-table>
			</div>
		</div>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	import selectButton from '../button/button-select';
	import vButton from '../button/button';
	import searchBar from '../search/search-bar';
	import vTable from '../table/table';
	export default {
	  name: 'pageIndex',
	  components:{
           vDialog,selectButton,searchBar,vTable,vButton
       },
       data(){
       	return{
       		backStatu:false,
       		tableSelect:[],
       		parentName:'初始类',
       		parentNames:[],
       		parentId:{
       			time:'',
       			id:'',
       		},
       		parents:[],
       		tableData:{
       			selectShow:false,
       			update:new Date(),
       			searchMessage:{},
       			selectMessage:{},
       			urlMessage:{
       				parentId:null,
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/v1/product/category',
       			listConfig:[
       				{
       					lable:'分类名称',
       					prop:'name'
       				},
       				{
       					lable:'排序',
       					width:'100',
       					prop:'weight'
       				},
       				{
       					lable:'级别',
       					width:'120',
       					prop:'level'
       				},
       				{
       					lable:'创建时间',
       					width:'200',
       					prop:'ctime'
       				},
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'id'
       				},
       				linkTo:[
	       				{
	       					name:'属性列表',
	       					src:'/attributeList',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-liebiao'
	       				},
       				],
					btn:[
						{
				       		title:'查看下级',
				       		privateName:'productLookChild',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"lookChildCategory",
				       		src:"/ucenter/admin/v1/product/audit",
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-slideBar-xiaji'
				       },
//				       {
//				       		title:'属性列表',
//				       		privateName:'lookeCategoryList',
//				       		idName:'id',
//				       		urlSearch:'productId',
//				       		type:"lookeCategoryList",
//				       		src:"/ucenter/admin/v1/product/audit",
//				       		style:'icon',
//				       		iconClass:'table-icon iconfont icon-el-icon-karakal-liebiao'
//				       },
					],
       				dialog:[
       					{
				       		name:"name",
				       		title:'新增下级',
				       		privateName:'product',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productAddCategoryNext",
				       		src:"/ucenter/admin/v1/product/category",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-zengjia'
				        },
				       	{
				       		name:"name",
				       		title:'删除',
				       		idName:'id',
				       		urlSearch:null,
				       		type:"delete",
				       		src:"/ucenter/admin/v1/product/category",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-iconfontshanchu5'
				       	}
	       			]
       			}
       		},
       		btnMessage:{
       			disable:{
       				name:"新增",
		       		type:"disable",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-zengjia",
		       		formConfig:{
				       		name:"name",
				       		title:'新增下级',
				       		privateName:'product',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productAddCategory",
				       		src:"/ucenter/admin/v1/product/category",
				        },
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
 		tableRes(res){
 			if(res.productCategory){
 				this.tableSelect[0] = res.productCategory;
 			}
			if(res.productCategoryParent){
				this.parentName = res.productCategoryParent.name;
				var id = res.productCategoryParent.id
				var name = res.productCategoryParent.name;
				this.parents.push(id);
				this.parentNames.push(name);
				if(this.parents.length>0){
					this.backStatu = true;
				}else{
					this.backStatu = false;
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
 		//			返回
		backPage(){
				if(this.parents.length>0){
					var len = this.parents.length;
					var index = this.parents.length - 2;
					this.parentId.id = this.parents[index];
					if(this.parentNames[index]){
						this.parentName = this.parentNames[index];
					}else{
						this.parentName ="初始类"
					}
					this.parentId.time = new Date();
					var start = len-1;
					this.parents.splice(start,1);
					this.parentNames.splice(start,1);
					if(this.parents.length <= 0){
						this.backStatu = false;
					}
				}
		},
// 		选择信息
		selectRes(data){
					console.log(1)
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
	.product-categogy .application-content{
		width: 100%;
		flex: 1;
	}
	.product-categogy .btn-box{
		display: inline-block;
		margin-right: 10px;
		position: relative;
		cursor: pointer !important;
	}
	.product-categogy .btn-box-default{
		display: inline-block;
		margin-right: 10px;
		position: relative;
		cursor: pointer;
	}
	.product-categogy .btn-elm-box{
		margin-right: 10px;
		border: none;
		outline: none;
		padding: 9px 30px;
		border-radius: 5px;
		background: white;
		box-shadow: 0px 2px 10px -8px #888888;
		position: relative;
	}
	.product-categogy .btn-elm-box i{
		color: #0199fe;
		margin-right: 10px;
	}
	.product-categogy .btnActive:hover .btn-elm-box{
				background: #1888f7 !important;
				color: white;
			}
	.product-categogy .btnActive:hover .btn-elm-box i{
				color: white;
			}
	.product-categogy .btn-box:nth-child(1){
		margin-left: 16px;
	}
	/*.application-select{
		float: left;
		margin: 0 16px;
	}*/
	.product-categogy .back-parent:hover{
		cursor: pointer;
		color: #7db4f3 !important;
	}
</style>