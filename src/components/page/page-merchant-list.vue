<template>
	<div class="merchant">
		<div class="application-content">
			<div style="overflow: hidden;padding: 30px 0;background: #eff4f7;">
				<div class="btn-box">
					<router-link to='merchant/addMerchant'  style="display:block;">
						<v-button :message="btnMessage.add"></v-button>	  	
					</router-link>
				</div>
			</div>
			<div style="width: 100%;overflow: hidden;background: #eff4f7;padding-bottom: 10px;">
				<select-button :message="selectMessage" :placeholder="'应用状态'" :defaultVal="selectDefaultVal" class="application-select" v-on:select="selectRes"></select-button>
				<div style="display:inline-block;margin-left:420px;">
					<search-bar :name="'mobile'" v-on:search="searchRes" :placeholder="'输入手机号码查询'"></search-bar>
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
       				username:'',
       				mobile:'',
       				shopName:'',
        			status:'',
	   				pageIndex:'1',
	   				pageSize:'20'
       			},
       			listUrl:'/ucenter/admin/v1/sys/merchant',
       			listConfig:[
       				{
       					lable:'用户名',
       					prop:'username'
       				},
       				{
       					lable:'手机号',
       					width:'150',
       					prop:'mobile'
       				},
       				{
       					lable:'商铺名',
       					width:'250',
       					prop:'shopName'
       				},
//     				{
//     					lable:'联系人',
//     					prop:'contacts'
//     				},
//     				{
//     					lable:'联系电话',
//     					prop:'contactNumber'
//     				},
//     				{
//     					lable:'联系地址',
//     					prop:'contactAddress'
//     				},
       				{
       					lable:'创建时间',
       					prop:'ctime'
       				},
       				{
       					lable:'商户状态',
       					width:'100',
       					prop:'status'
       				}
       			],
       			listBtnConfig:{
       				pageMessage:{
       					idName:'id'
       				},
       				linkTo:[
	       				{
	       					name:'查看',
	       					src:'/lookMerchant',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-chakan'
	       				},
	       				{
	       					name:'修改',
	       					src:'/merchant/modify',
	       					iconClass:'table-icon iconfont icon-el-icon-karakal-xiugai'
	       				},
       				],
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
       		},
       		selectDefaultVal:'',
       		selectMessage:[
		        { value: '',
		          label: '全部'
		        },
		        { value: '0',
		          label: '禁用'
		        },
		        { value: '1',
		          label: '启用'
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
 			if(data){
 				this.tableSelect = data;
// 			重置select值
//			this.selectDefaultVal = 
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
					};
			}
	 	},
//	 	列表后退
		backList(data){
			console.log(data);
			this.selectDefaultVal = data.state;
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