<template>
	<div class="from-component">
		<div v-if="show">
			<el-button size="mini" v-on:click="open2()" :type="config.classType" v-if="config.style == 'button'" style="cursor: pointer;margin: 0 5px;">{{message.name}}</el-button>
			<div v-else-if="config.style == 'icon'" v-on:click="open2()" style="cursor: pointer;margin: 0 5px;">
				<i :class="config.iconClass" :title="config.title"></i>
			</div>
			<div v-on:click="open2()" style="position: absolute;width: 100%;height: 100%;margin: 0 5px;" v-else></div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="activeState"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  {{config.message}}
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="activeState = false">确 定</el-button>
		  </span>
		</el-dialog>
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
		  :title="config.title"
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
		  :title="config.title"
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
<!--		商品相关弹框-->
		<dialog-product :config="config" :id="id" :tableSelect='tableSelect' :chooseOne='chooseOne' openDialog='openDialog' :change="openPrivate" :message='message' v-if="config.privateName"></dialog-product>
	</div>
</template>

<script>
	import dialogProduct from './dialog-product.vue'
	export default {
//	  name: 'formComponent',
	    props: ['id','config','tableSelect','chooseOne','openDialog','message'],
	    components:{
	  	dialogProduct
	   },
	    data() {
	      return {
	      	show:true,
	      	activeState:false,
	        dialogDelete: false,
	        dialogDisable:false,
	        dialogAble:false,
	        dialogAddUser: false,
	        dialogPrompt:true,
	        open:true,
	        openPrivate:'',
	        ids:[],
	        formLabelWidth: '120px'
	      };
	    },
		created(){
//			上架按钮的判断
			if(this.message){
				if(this.config.type == 'productExamine'){
					if(this.message.status != 1) {
						this.show = false;
					}
				}
			}
		},
		watch: {
//			var a = this.openDialog;
		    openDialog: function (newValue, oldValue){
		      //每当str的值改变则发送事件update:word , 并且把值传过去\
		      this.activeState = true;
		    }
		},
		methods:{
			open2(){
//				公用弹框
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
					if(this.config.type === "prompt"){
						this.dialogPrompt = true;
					}
				}
				if(this.id){
					if(this.config.type === "delete"){
						this.dialogDelete = true;
					}
				}
//				私有弹框
				if(this.config.privateName){
					console.log('2')
					 this.openPrivate = new Date();
				}
			},
//			删除
			deleteMessage(){
				var content;
				if(this.id){
						if(this.config.urlSearch){
							content  = '?'+this.config.urlSearch+'=' + this.id
						}else{
							content = '/'+this.id;
						}
				}else{
					content  = '?'+this.config.urlSearch+'=' + this.ids.join()
				}
				var _url = this.config.src + content;
				console.log(_url);
				this.$axios.delete(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						this.returnMessage('删除成功');
						this.$message({
					          message: res.data.message,
					          type: 'success'
					        });
					 	this.dialogDelete = false;
					}else{
						this.$message.error(res.data.data);
					}
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
					if(res.data.state === "000000"){
						this.returnMessage('禁用成功');
					 	this.dialogDisable = false;
					}else{
						this.$message.error(res.data.data);
					}
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
					if(res.data.state === "000000"){
						this.returnMessage('启用成功');
					 	this.dialogAble = false;
					}else{
						this.$message.error(res.data.data);
					}
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