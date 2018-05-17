<template>
	<div class="table" :data="message.update">
	<div :data="message.searchMessage + message.selectMessage"></div>
	<template style="overflow: hidden;">
		  <el-table
		    ref="multipleTable"
		    :data="listData"
		    tooltip-effect="dark"
		    style="width: 100%"
		    :highlight-current-row=true
		    :row-class-name="tableRowClassName"
		    header-cell-class-name='table-head'
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55" v-if="message.selectShow">
		    </el-table-column>
		     <!--<el-table-column>
		    </el-table-column>-->
		    <el-table-column 
		      label="序号"
		      type="index"
		     >
		    </el-table-column>
		    <el-table-column v-for="(item, index) in message.listConfig" :key="index"
		      :width="item.width"
		      :label="item.lable"
		      show-overflow-tooltip>
		      <template slot-scope="props">
		        <span v-if="item.prop == 'state'">
		        	<span v-if="props.row[item.prop] == 0 " style="color: green;">启用</span>
		        	<span v-else style="color: red;">禁用</span>
		        </span>
		        <span v-else-if="item.prop == 'status'">
		        	<span v-if="item.lable =='商品状态'">
		        		<span v-if="props.row[item.prop] == -1" style="color: red;">已删除</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 0">待编辑</span>
		        		<span style="color: red;" v-else-if="props.row[item.prop] == 1">待审核</span>
		        		<span style="color: red;" v-else-if="props.row[item.prop] == 2">已通过</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 3">不通过</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 4">已上架</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 5">已下架</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 6">暂歇停</span>
		        	</span>
		        	<span v-else-if="item.lable =='订单状态'">
		        		<span v-if="props.row[item.prop] == -1" style="color: red;">已删除</span>
		        		<span style="color: red;" v-else-if="props.row[item.prop] == 1">已取消</span>
		        		<span style="color: red;" v-else-if="props.row[item.prop] == 2">待支付</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 3">支付成功</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 4">支付失败</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 5">已确认</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 6">退款中</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 7">退款成功</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 8">已发货</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 9">待收货</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 10">已收货</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 11">已删除</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 12">已关闭</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 13">更换中</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 14">拒绝更换</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 15">同意更换</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 16">已沟通</span>
		        		<span style="color: gray;" v-else-if="props.row[item.prop] == 17">已更换</span>
		        	</span>
		        	<span v-else>
		        		<span v-if="props.row[item.prop] == 0 " style="color: green;">启用</span>
		        		<span v-else style="color: red;">禁用</span>
		        	</span>
		        </span>
		        <span v-else-if="item.prop == 'gender'">
		        	<span v-if="props.row[item.prop] == 0 ">男</span>
		        	<span v-else-if="props.row[item.prop] == 1 ">女</span>
		        	<span v-else>保密</span>
		        </span>
		        <span v-else-if="!props.row[item.prop] && props.row[item.prop] != 0">
		        	————
		        </span>
		        <span v-else-if="item.prop =='level'">
		        	{{transformationLevel(props.row[item.prop])}}
		        </span>
		        <span v-else-if="item.prop =='registerTime'">
		        	{{transformationTime(props.row[item.prop])}}
		        </span>
		        <span v-else-if="item.prop =='createTime'">
		        	{{transformationTime(props.row[item.prop])}}
		        </span>
		        <span v-else-if="item.prop =='auditTime'">
		        	{{transformationTime(props.row[item.prop])}}
		        </span>
		        <span v-else-if="item.prop =='ctime'">
		        	{{transformationTime(props.row[item.prop])}}
		        </span>
		        <span v-else>{{ props.row[item.prop] }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="操作" v-if="message.listBtnConfig">
		      <template slot-scope="scope">
		      	<div style="display: inline-block;" v-if="message.listBtnConfig.btn">
		      		<div v-for="(item, index) in message.listBtnConfig.btn" :key="index">
			      			<div v-if="item.privateName =='productLookChild' && scope.row.hasChild">
			      				<i :class="item.iconClass" :title="item.title" v-on:click="btn(item.privateName,scope.row)" style="cursor: pointer;padding-left: 10px;"></i>
			      			</div>
			      	</div>
		      	</div>
		      	<div style="display: inline-block;" v-if="message.listBtnConfig.linkTo">
			      		<router-link v-for="(item, index) in message.listBtnConfig.linkTo" :key="index" :to="src(item.src,scope.row[message.listBtnConfig.pageMessage.idName])" style="margin: 0 5px;">
			      			<i :class="item.iconClass" :title="item.name"></i>
			      		</router-link>
		      	</div>
		      	<div style="display: inline-block;" v-if="message.listBtnConfig.dialog">
		      	<!--	<div v-for="(item, index) in message.listBtnConfig.dialog" :key="index" style="float: left;">-->
		      			<v-dialog v-for="(item, index) in message.listBtnConfig.dialog" :key="index" 
		      				:config="item" :id='scope.row[message.listBtnConfig.pageMessage.idName]' :chooseOne='scope.row' :message="scope.row" v-on:send="dialogMessage">
			      		</v-dialog>
		      	<!--	</div>-->
		      	</div>
		      </template>
    		</el-table-column>
		  </el-table>
		  <div style="position: relative;">
		  	 <div style="position: absolute;left: 50%;transform: translate(-50%,0);">
		  	 	 <div style="margin-top: 30px;position: relative;height: 50px;width: 1000px;">
				    <v-pagination v-on:pageChange="pagination" :message="pageinationMessage"></v-pagination>
		<!--		    <span style="cursor: pointer;position: absolute;right: 130px;top: -11px;color: #1888f7;" v-on:click="backPage()">返回</span>-->
				  </div>
		  	 </div>
		  </div>
		</template>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	import vPagination from '../pagination/pagination';
	export default {
	  name: 'vtable',
	  props: ['message','searchMessage','selectMessage','updateMessage','backParent'],
	  components:{
	  	vDialog,vPagination
	  },
	  data() {
      return {
      	closeUp:'',
       	listData:[],
        multipleSelection: [],
        update:[],
        MessageUpdate:'',
        oldPage:[],
        backStatu:true,
        pageinationMessage:{
        	pageNum:1,
        	pageSize:20,
        	pages:2,
        	size:20,
        	total:26
        },
        pageMessage:{}
        }
     },
     created(){
     	 this.pageMessage= this.message.urlMessage;
		 this.getList(this.message.listUrl)
    	},
//   updated(){
//   	if(this.message.update && this.message.update != this.update){
//   		this.update = this.message.update;
//   		this.getList(this.message.listUrl)
//   	}
//   	if(Object.keys(this.message.searchMessage).length != 0){
//   		if(this.closeUp == this.message.searchMessage) return;
//			this.search(this.message.listUrl);
//			this.closeUp = this.message.searchMessage
//   	}
//   	if(Object.keys(this.message.selectMessage).length != 0){
//   		if(this.closeUp == this.message.selectMessage) return;
//			this.select(this.message.listUrl);
//			this.closeUp = this.message.selectMessage;
//   	}
//   },
//	mounted: function () {
//		  		this.$nextTick(function () {
//					setTimeout(()=>{
//						
//					})
//				  })
//		},
     watch: {
		    searchMessage: function (){
		      //每当str的值改变则发送事件update:word , 并且把值传过去\
		      if(this.closeUp == this.message.searchMessage) return;
				this.search(this.message.listUrl);
				this.closeUp = this.message.searchMessage;
		    },
		    selectMessage:function(){
		    	if(this.closeUp == this.message.selectMessage) return;
				this.select(this.message.listUrl);
				this.closeUp = this.message.selectMessage;
		    },
		    updateMessage:function(){
		    	this.update = this.message.update;
     			this.getList(this.message.listUrl)
		    },
		    'backParent.time':function(){
		    	this.pageMessage.parentId = this.backParent.id;
		    	this.pageMessage.pageIndex = '1';
		    	this.pageMessage.pageSize = '20';
		    	this.getList(this.message.listUrl)
		    }
		},
	 methods: {
		    toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		        },
		    handleSelectionChange(val) {
		        this.multipleSelection = val;
//		        var ids = [];
//		        for(let i = 0 ;i<this.multipleSelection.length;i++){
//		        	for(let index in this.multipleSelection[i]){
//		        		if(index == this.message.listBtnConfig.pageMessage.idName){
//		        			ids.push(this.multipleSelection[i][index]);
//		        		}
//		        	}
//		        }
		        this.$emit('tableRes',this.multipleSelection);
		        },
		    tableRowClassName({row, rowIndex}) {
		     if(rowIndex%2 != 0){
		          return 'row-color';
		        }else{
		        	return ''
		        }
	           },
//	        获取列表数据
			getList(src){
				if(this.backStatu){
					var data  = {};
					for(let i in this.pageMessage){
							data[i] = this.pageMessage[i]
					}
					this.oldPage.push(data);
				}
				var content=this.pageMessage;
				this.$axios.get(src, {params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 if(res.data.state === '000000'){
					 	var data = res.data.data.list;
						this.listData =  data;
//						this.listData.level = 'mmp'
						this.getParentID()
						this.pageinationMessage.total = res.data.data.total;
						this.pageinationMessage.pageSize = res.data.data.pageSize;
						this.pageinationMessage.pageNum = res.data.data.pageNum;
					 }else{
					 	this.$message.error(res.data.data);
					 }
		      	}).catch((err)=>{
//		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			按钮操作()
			btn(name,row){
//				判断是否属于私有
				if(name == 'productLookChild'){
					this.pageMessage.parentId = row.id;
					this.$emit('tableRes',{productCategoryParent:row});
					this.getList(this.message.listUrl);
				}
			},
//			搜索
			search(src){
					for(let i in this.pageMessage){
					for(let j in this.message.searchMessage){
						if(i == j){
							this.pageMessage[i]= this.message.searchMessage[j];
						}
					}
				}
				this.backStatu = true;
				this.getList(src);
			},
//			按类查询
			select(src){
				for(let i in this.pageMessage){
					for(let j in this.message.selectMessage){
						if(i == j){
							this.pageMessage[i]= this.message.selectMessage[j];
						}
					}
				}
				this.backStatu = true;
				this.getList(src);
			},
	        dialogMessage(a){
       				console.log(a.b);
       				this.getList(this.message.listUrl);
       		},
//     		_url拼接
       		src(src,id){
       			var _rul = src+'?id='+id;
       			return _rul;
       		},
//     		按页查询
       		pagination(data){
       			this.pageMessage.pageIndex = data.pageIndex;
       			this.pageMessage.pageSize = data.pageSize;
       			this.getList(this.message.listUrl)
       		},
//     		转换时间格式
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
			},
//			转换级别
			transformationLevel(num){
				var level = '';
				var cnum = ['初', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				level = cnum[num+1]+'级';
				return level;
			},
//			返回
			backPage(){
				this.backStatu = false;
				if(this.oldPage.length>=2){
					var len = this.oldPage.length;
					var index = this.oldPage.length - 2;
					this.pageMessage = this.oldPage[index];
					this.getList(this.message.listUrl);
//					his.$emit('tableRes',{back:this.pageMessage});\
					var start = len-2;
					var a = this.oldPage.splice(start,1);
					console.log(this.oldPage)
				}else{
					this.$message.error('记录少于2，无法返回');
				}
			},
//			页面创建完成获取parentID(只给商品分类列表用)
			getParentID(){
				var data = this.listData[0];
				this.$emit('tableRes',{productCategory:data});
			}
	    },
	}
</script>

<style>i
	.table{
		position: relative;
	}
	.table .table-icon{
		font-size: 18px;
		color: #1888f7;
	}
	.table .box-shadow{
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 20px;
		top: 80px;
		border-bottom: 1px solid #ebeef5;
		box-shadow: 0px 1px 13px -8px #888888;
	}
	.table-head{
		background: #eff4f7 !important;
	}
	.el-table .row-color {
    	background: #eff4f7;
  	}
  	.el-table .row-color-1{
  		box-shadow: 0px 20px 15px -8px red
  	}
</style>