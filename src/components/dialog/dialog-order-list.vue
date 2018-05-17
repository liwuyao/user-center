<template>
	<div class="dialog-order-list">
<!--		审核弹框-->
		<el-dialog
		  title="关闭"
		  :visible.sync="dialogCloseOrder"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在关闭【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogCloseOrder = false">取 消</el-button>
		    <el-button type="primary"  v-on:click="close()">确 定</el-button>
		  </span>
		</el-dialog>
<!--		退换记录列表查看-->
		<el-dialog
		  title="关闭"
		  :visible.sync="dialogBackList"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	功能在开发中
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogBackList = false">取 消</el-button>
		    <el-button type="primary"  v-on:click="close()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props:['id','config','tableSelect','chooseOne','openDialog','change','message'],
		data() {
	      return {
	      	dialogCloseOrder:false,
	      	dialogBackList:false,
	      	backListData:'',
	      }
	   },
	   created(){
	   },
	   watch: {
//			var a = this.openDialog;
		    change: function (){
		      //每当str的值改变则发送事件update:word , 并且把值传过去\
		     if(this.config.type == 'orderClose'){
		     	this.dialogCloseOrder = true;
		     }
		     if(this.config.type == 'backList'){
		     	this.dialogCloseOrder = true;
		     	console.log(this.id)
		     	this.getBackList(this.id);
		     }
		    }
		},
		methods:{
//			新增分类
			close(){
					var content = {
						orderId:this.message.id
					};
					var send = this.Qs.stringify(content)
					this.$axios.post(this.config.src,send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
						if(res.data.state === "000000"){
							this.dialogCloseOrder = false
							this.$message({
						          message: res.data.message,
						          type: 'success'
						        });
						}else{
							this.$message.error(res.data.message);
						}
					    }).catch((err)=>{
							this.$message.error('接口请求出错');
							console.error(err);
					    })
				},
//			获取退换列表
			getBackList(id){
				var content = {
					orderId:id
				}
				this.$axios.get(this.config.src, {params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
//					 if(res.data.state === '000000'){
//					 	var data = res.data.data.list;
//							console.log(data);
//					 }else{
//					 	this.$message.error(res.data.data);
//					 }
					console.log(res);
		      	}).catch((err)=>{
//		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			}
		}
	}
</script>

<style>
</style>