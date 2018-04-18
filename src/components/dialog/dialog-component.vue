<template>
	<div class="from-component">
		<el-button size="mini" v-on:click="open2()" :type="config.classType" v-if="config.style == 'button'">{{message.name}}</el-button>
		<i v-else-if="config.style == 'icon'" :class="config.iconClass" :title="config.name" v-on:click="open2()" ></i>
		<div v-on:click="open2()" style="position: absolute;width: 100%;height: 100%;" v-else></div>
		<el-dialog title="增加" :visible.sync="dialogAddUser">
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
		</el-dialog>
<!--		删除-->
		<el-dialog
		  title="删除"
		  :visible.sync="dialogDelete"
		  width="30%"
		  >
		  <span>确定删除所选么？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDelete = false">取 消</el-button>
		    <el-button type="primary" @click="deleteMessage">确 定</el-button>
		  </span>
		</el-dialog>
		<!--禁用-->
		<el-dialog
		  title="禁用"
		  :visible.sync="dialogDisable"
		  width="30%"
		  >
		  <span>确定禁用所选么</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDisable = false">取 消</el-button>
		    <el-button type="primary" @click="disableMessage()">确 定</el-button>
		  </span>
<!--		  启用弹框-->
		</el-dialog>
			<el-dialog
		  title="启用"
		  :visible.sync="dialogAble"
		  width="30%"
		  >
		  <span>确定启用所选么</span>
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
	    props: ['id','config','tableSelect'],
	    data() {
	      return {
	        dialogDelete: false,
	        dialogDisable:false,
	        dialogAble:false,
	        dialogAddUser: false,
	        open:true,
	        form: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        formLabelWidth: '120px'
	      };
	    },
//	    updated(){
//	    	if(this.message.type === "add" && this.open){
//	    		this.dialogFormVisible=true;
//	    		this.open = false
//	    	}
//	    }
		created(){
			
		},
		methods:{
			open2(){
				if(!this.id && this.tableSelect.length == 0){
					this.$message.error('请选择要操作对象') 
				}else{
					if(this.config.type === "add"){
					this.dialogFormVisible = true;
					}
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
			},
//			删除
			deleteMessage(){
				var content;
				if(this.id){
						content  = '?'+this.config.idName+'=' + this.id
				}else{
					content  = '?'+this.config.idName+'=' + this.tableSelect.join()
				}
				var _url = this.config.src + content;
				this.$axios.delete(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 this.returnMessage('删除成功');
					 this.dialogDelete = false;
					 this.$message({
				          message: '删除成功',
				          type: 'success'
				        });
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			禁用
			disableMessage(){
				var content = '?'+this.config.idName+'=' + this.tableSelect.join();
				var _url = this.config.src+content;
				console.log(_url)
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 this.returnMessage('禁用成功');
					 this.dialogDisable = false;
					 this.$message({
				          message: '禁用成功',
				          type: 'success'
				        });
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			启用
			ableMessage(){
				var content = '?'+this.config.idName+'=' + this.tableSelect.join();
				var _url = this.config.src+content;
				console.log(_url)
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 this.returnMessage('启用成功');
					 this.dialogAble = false;
					 this.$message({
				          message: '启用成功',
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