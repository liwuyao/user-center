<template>
	<div class="table" :data="message.update">
	<div :data="message.searchMessage"></div>
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
		      width="55">
		    </el-table-column>
		    <el-table-column 
		      label="序号"
		      type="index"
		      width="50">
		    </el-table-column>
		    <el-table-column v-for="(item, index) in message.listConfig" :key="index" 
		      :label="item.lable"
		      :width ="item.width"
		      show-overflow-tooltip>
		      <template slot-scope="props">
		        <span v-if="item.prop == 'state'">
		        	<span v-if="props.row[item.prop] == 0 ">启用</span>
		        	<span v-else>禁用</span>
		        </span>
		        <span v-else-if="item.prop == 'status'">
		        	<span v-if="props.row[item.prop] == 0 ">启用</span>
		        	<span v-else>禁用</span>
		        </span>
		        <span v-else="item.prop != 'state'">{{ props.row[item.prop] }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column label="操作" v-if="message.listBtnConfig">
		      <template slot-scope="scope">
		      	<div style="display: inline-block;" v-if="message.listBtnConfig.linkTo">
			      		<router-link v-for="(item, index) in message.listBtnConfig.linkTo" :key="index" :to="src(item.src,scope.row[message.listBtnConfig.pageMessage.idName])" style="margin: 0 5px;">
			      			<i :class="item.iconClass" :title="item.name"></i>
			      		</router-link>
		      	</div>
		      	<div style="display: inline-block;" v-if="message.listBtnConfig.dialog">
		      		 <v-dialog v-for="(item, index) in message.listBtnConfig.dialog" :key="index"
		      		 	:config="item" :id='scope.row[message.listBtnConfig.pageMessage.idName]' v-on:send="dialogMessage" style="margin:0 5px;" ></v-dialog>
		      	</div>
		      </template>
    		</el-table-column>
		  </el-table>
		  <div style="margin-top: 30px">
		    <v-pagination v-on:pageChange="pagination"></v-pagination>
		</div>
		</template>
	</div>
</template>

<script>
	import vDialog from '../dialog/dialog-component';
	import vPagination from '../pagination/pagination';
	export default {
	  name: 'vtable',
	  props: ['message'],
	  components:{
	  	vDialog,vPagination
	  },
	  data() {
      return {
       	listData:[],
        multipleSelection: [],
        update:[],
        pageMessage:{
	   				pageIndex:'1',
	   				pageSize:'20'
	   			}
        }
     },
     created(){
		 this.getList(this.message.listUrl)
    	},
     updated(){
     	if(this.message.update && this.message.update != this.update){
     		this.update = this.message.update;
     		this.getList(this.message.listUrl)
     	}
     	if(Object.keys(this.message.searchMessage).length != 0){
			this.search(this.message.listUrl);
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
		        var ids = [];
		        for(let i = 0 ;i<this.multipleSelection.length;i++){
		        	for(let index in this.multipleSelection[i]){
		        		if(index == this.message.listBtnConfig.pageMessage.idName){
		        			ids.push(this.multipleSelection[i][index]);
		        		}
		        	}
		        }
		        this.$emit('tableRes',ids);
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
				var content=this.pageMessage;
				this.$axios.get(src, {params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					var data = res.data.data.list;
					for(let i = 0;i<data.length;i++){
						for(let j in data[i]){
							if(j == 'createTime'){
								var time = new Date(data[i][j])
									data[i][j]= time.toLocaleString();
							}
						}
					}
					this.listData =  data;
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			搜索
			search(src){
				var content=this.message.searchMessage;
				this.$axios.get(src, {params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					var data = res.data.data.list;
					for(let i = 0;i<data.length;i++){
						for(let j in data[i]){
							if(j == 'createTime'){
								var time = new Date(data[i][j])
									data[i][j]= time.toLocaleString();
							}
						}
					}
					this.listData =  data;
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
	        dialogMessage(a){
       				console.log(a.b)
       				this.getList(this.message.listUrl);
       		},
//     		_url拼接
       		src(src,id){
       			var _rul = src+'?id='+id;
       			return _rul;
       		},
//     		按页查询
       		pagination(data){
       			this.pageMessage = data;
       			this.getList(this.message.listUrl)
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