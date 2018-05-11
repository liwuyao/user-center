<template>
	<div class="product-categogy">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<h3 style="padding-left:30px ;">商品分类</h3>
			</div>
			<!--<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'商品状态'" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'productName'" v-on:search="searchRes" :placeholder="'请输入商品名称'"></search-bar>
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
       		tableData:{
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
       					lable:'级别',
       					prop:'weight'
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
					btn:[
						{
				       		title:'查看下级',
				       		privateName:'productLookChild',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productExamine",
				       		src:"/ucenter/admin/v1/product/audit",
				       		classType:'danger',
				       		style:'icon',
				       		iconClass:'table-icon iconfont icon-el-icon-karakal-slideBar-xiaji'
				       },
					],
       				dialog:[
       					{
				       		name:"name",
				       		title:'新增下级',
				       		privateName:'product',
				       		idName:'id',
				       		urlSearch:'productId',
				       		type:"productAddCategory",
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
//     	获取分类信息
//			getcateGory('ucenter/admin/v1/product/category'){
//				this.$axios.get(src,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
//					 if(res.data.state === '000000'){
//					 	var data = res.data.data.list;
//						this.listData =  data;
//						this.pageinationMessage.total = res.data.data.total;
//						this.pageinationMessage.pageSize = res.data.data.pageSize;
//						this.pageinationMessage.pageNum = res.data.data.pageNum;
//					 }else{
//					 	this.$message.error(res.data.data);
//					 }
//		      	}).catch((err)=>{
////		                    this.$message.error('接口请求出错');
//		                    console.error(err);
//		        })
//			},
       },
       methods:{
//     	sendFrom(a){
//     		console.log(a.b)
//     	},
//		列表信息返回
 		tableRes(data){
 			this.tableSelect = data;
// 			var able = [];
// 			var disable = [];
// 			if(data.length == 0){
// 				this.btnMessage.disable.disable = true;
// 				this.btnMessage.able.disable = true;
// 			}
//	 			for(let i = 0;i<data.length;i++){
//	 			for(let index in data[i]){
//	   					if(data[i].state == 0){
//	   						disable.push(data[i]);
//	   					};
//	   					if(data[i].state == 1){
//	   						able.push(data[i]);
//	   					};
//	   					if(disable.length>0 && able.length>0){
//	   						this.btnMessage.disable.disable = true;
//	   						this.btnMessage.able.disable = true;
//	   					}else{
//	   						if(disable.length != 0){
//	   							this.btnMessage.disable.disable = false;
//	   						}else{
//	   							this.btnMessage.disable.disable = true;
//		   					};
//		   					if(able.length != 0){
//		   							this.btnMessage.able.disable = false;
//		   						}else{
//		   							this.btnMessage.able.disable = true;
//		   					};
//	   					}
//	   				}
//	 			}
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