<template>
	<div class="order-lsit">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box-default" :class="{btnActive:!btnMessage.disable.disable}" style="margin-left: 17px;">
					<el-button class="btn-elm-box" :disabled='btnMessage.disable.disable'>
					<i :class="btnMessage.disable.icon"></i>
					关闭
					</el-button>
					<v-dialog :config="btnMessage.disable.formConfig" class="page-dialog" :tableSelect='tableSelect' v-on:send="dialogRes" v-if="!btnMessage.disable.disable"></v-dialog>
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
					<search-bar :name="'orderId'" v-on:search="searchRes" :placeholder="'输入订单ID查询'"></search-bar>
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
       			selectShow:true,
       			update:new Date(),
       			searchMessage:{},
       			selectMessage:{},
       			urlMessage:{
       				orderId:null,
        			status:'',
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/v1/order/all',
       			listConfig:[
       				{
       					lable:'用户名',
       					width:'150',
       					prop:'memberName'
       				},
       				{
       					lable:'订单ID',
       					prop:'id'
       				},
       				{
       					lable:'价格/元',
       					width:'120',
       					prop:'price'
       				},
//     				{
//     					lable:'创建时间',
//     					width:'200',
//     					prop:'createTime'
//     				},
       				{
       					lable:'订单状态',
       					width:'120',
       					prop:'status'
       				},
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'id'
       				},
       				linkTo:[
	       				{
	       					name:'查看订单详情',
	       					src:'/lookOrderReplace',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-chakan'
	       				},
       				],
//     				dialog:[
//				       	{
//				       		name:"id",
//				       		title:'查看退换记录',
//				       		privateName:'orderList',
//				       		idName:'id',
//				       		urlSearch:'productId',
//				       		type:"backList",
//				       		src:"/ucenter/admin/v1/order/replace/record",
//				       		classType:'danger',
//				       		style:'icon',
//				       		iconClass:'table-icon iconfont icon-el-icon-karakal-slideBar-shenhe'
//				       },
//	       			]
       			}
       		},
       		btnMessage:{
       			disable:{
       				name:"关闭",
		       		type:"disable",
		       		disable:true,
		       		icon:"button-icon iconfont icon-el-icon-karakal-jinyong",
		       		formConfig:{
		       			privateName:'orderList',
		       			title:'禁用提示',
		       			idName:'id',
		       			urlSearch:'orderId',
		       			src:"/ucenter/admin/v1/order/close",
		       			name:"id",
		       			type:"orderClose",
		       			classType:'',
		       			style:''
		       		}
       			}
       		},
       		selectMessage:[
       			{ value: '',
		          label: '全部'
		        },
		        { value: '1',
		          label: '已取消'
		        },
		        { value: '2',
		          label: '待支付'
		        },
		        { value: '3',
		          label: '支付成功'
		        },
		        { value: '4',
		          label: '支付失败'
		        },
		        { value: '5',
		          label: '已确认'
		        },
		        { value: '6',
		          label: '退款中'
		        },
		        { value: '7',
		          label: '退款成功'
		        },
		        { value: '8',
		          label: '已发货'
		        },
		        { value: '9',
		          label: '待收货'
		        },
		        { value: '10',
		          label: '已收货'
		        },
		        { value: '11',
		          label: '已删除'
		        },
		        { value: '12',
		          label: '已关闭'
		        },
		        { value: '13',
		          label: '更换中'
		        },
		        { value: '14',
		          label: '拒绝更换'
		        },
		        { value: '15',
		          label: '同意更换'
		        },
		        { value: '16',
		          label: '已沟通'
		        },
		        { value: '17',
		          label: '已更换'
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
 			if(typeof(data) == 'object') return;
 			this.tableSelect = data;
 			var disable = [];
 			this.btnMessage.disable.disable = true;
	 			for(let i = 0;i<data.length;i++){
	   					if(data[i].status == 4 || data[i].status == 5){
	   						disable.push(data[i]);
	   					};
//	   					if(data[i].status == 2 || data[i].status == 6){
//	   						able.push(data[i]);
//	   					};
////	   					console.log(disable.length);
	   					if(disable.length>0){
	   						this.btnMessage.disable.disable = true;
	   					}else{
	   						if(disable.length == 1){
	   							this.btnMessage.disable.disable = false;
	   						}else{
	   							this.btnMessage.disable.disable = true;
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