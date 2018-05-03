<template>
	<div class="from-component">
		<el-button size="mini" v-on:click="open2()" :type="config.classType" v-if="config.style == 'button'">{{message.name}}</el-button>
		<div v-else-if="config.style == 'icon'" v-on:click="open2()" style="cursor: pointer;">
			<i :class="config.iconClass" :title="config.title"></i>
		</div>
		<div v-on:click="open2()" style="position: absolute;width: 100%;height: 100%;" v-else></div>
		<!--<el-dialog title="增加" :visible.sync="dialogAddUser">
			<el-form :model="form">
			    <el-form-item label="用户名称" :label-width="formLabelWidth">
			      <el-input v-model="form.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="用户密码" :label-width="formLabelWidth">
			      <el-input v-model="form.name" auto-complete="off"></el-input>
			    </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary">确 定</el-button>
			</div>
		</el-dialog>-->
<!--		删除-->
		<el-dialog
		  title="删除提示"
		  :visible.sync="dialogDelete"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在删除【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				 】是否继续？
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDelete = false">取 消</el-button>
		    <el-button type="primary" @click="deleteMessage">确 定</el-button>
		  </span>
		</el-dialog>
		<!--禁用-->
		<el-dialog
		  title="禁用提示"
		  :visible.sync="dialogDisable"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在禁用【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				 】是否继续？
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDisable = false">取 消</el-button>
		    <el-button type="primary" @click="disableMessage()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--		  启用弹框-->
		<el-dialog
		  title="启用提示"
		  :visible.sync="dialogAble"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在启用【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】是否继续？
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAble = false">取 消</el-button>
		    <el-button type="primary" @click="ableMessage()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
//	  name: 'formComponent',
	    props: ['id','config','tableSelect','chooseOne'],
	    data() {
	      return {
	        dialogDelete: false,
	        dialogDisable:false,
	        dialogAble:false,
	        dialogAddUser: false,
	        open:true,
	        ids:[],
	        formLabelWidth: '120px'
	      };
	    },
		created(){
			
		},
		methods:{
			open2(){
				if(!this.id && this.tableSelect.length == 0){
					this.$message.error('请选择要操作对象') 
				}else if(!this.id && this.tableSelect.length != 0){
					var ids = [];
			        for(let i = 0 ;i<this.tableSelect.length;i++){
			        	for(let index in this.tableSelect[i]){
			        		if(index == this.config.idName){
			        			ids.push(this.tableSelect[i][index]);
			        		}
			        	}
			        }
			        this.ids = ids;
					if(this.config.type === "delete"){
						this.dialogDelete = true;
					}
					if(this.config.type === "disable"){
						this.dialogDisable = true;
					}
					if(this.config.type === "able"){
						this.dialogAble = true;
					}
				}
				if(this.id){
					if(this.config.type === "delete"){
						this.dialogDelete = true;
					}
				}
			},
//			删除
			deleteMessage(){
				var content;
				if(this.id){
						content  = '?'+this.config.urlSearch+'=' + this.id
				}else{
					content  = '?'+this.config.urlSearch+'=' + this.ids.join()
				}
				var _url = this.config.src + content;
				console.log(_url);
				this.$axios.delete(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 this.returnMessage('删除成功');
					 this.dialogDelete = false;
					 this.$message({
				          message: res.data.data,
				          type: 'success'
				        });
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			禁用
			disableMessage(){
				var content = '?'+this.config.urlSearch+'=' + this.ids.join();
				var _url = this.config.src+content;
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					console.log(res);
					 this.returnMessage('禁用成功');
					 this.dialogDisable = false;
					 this.$message({
				          message: res.data.data,
				          type: 'success'
				        });
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			启用
			ableMessage(){
				var content = '?'+this.config.urlSearch+'=' + this.ids.join();
				var _url = this.config.src+content;
				console.log(_url)
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 this.returnMessage('启用成功');
					 this.dialogAble = false;
					 this.$message({
				          message: res.data.data,
				          type: 'success'
				        });
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
			returnMessage(item){
				this.$emit('send',{b:item})
			}
		}
	 }
</script>

<style scoped>
	.from-component{
		display: inline-block;
	}
</style>