<template>
	<div class="dialog-product">
<!--		审核弹框-->
		<el-dialog
		  title="审核"
		  :visible.sync="dialogExamine"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在审核【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】
				<div style="padding-top:5px;">
					<el-form :model="examineMessage" :rules="rules" ref="examineMessage" label-width="0" class="demo-ruleForm">
						<el-form-item  prop="operation" style="margin-bottom:10px ;">
						<el-radio-group v-model="examineMessage.operation">
					      <el-radio label="PASS">通过</el-radio>
					      <el-radio label="PASS_PUSH">通过并发布</el-radio>
					      <el-radio label="NOT_PASS">不通过</el-radio>
					    </el-radio-group>
					    </el-form-item>
					    <p>审核说明：</p>
					    <el-form-item  prop="remark">
						<el-input type="textarea" v-model="examineMessage.remark"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogExamine = false">取 消</el-button>
		    <el-button type="primary"  v-on:click="examin('examineMessage')">确 定</el-button>
		  </span>
		</el-dialog>
<!--		新增下级弹框-->
		<el-dialog
		  title="新增下级"
		  :visible.sync="dialogAddCategoryNext"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在为【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】增加下级
				<div style="padding-top:5px;">
					<el-form :model="addCategory" :rules="rules2" ref="addCategory" label-width="0" class="demo-ruleForm">
					<el-form-item  prop="name">
						<div class="add-category">
							<span style="width: 50px;">名称：</span>
							<el-input v-model="addCategory.name" placeholder="请输入下级名称"></el-input>
						</div>
					</el-form-item>
					<el-form-item  prop="weight" style="margin-top: -5px;">
						<div class="add-category">
							<span style="width: 50px;">序号：</span>
							<el-input v-model="addCategory.weight" placeholder="请输入序号"></el-input>
						</div>
					</el-form-item>
					</el-form>
				</div>
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddCategoryNext= false">取 消</el-button>
		    <el-button type="primary"  v-on:click="addProductCategory('addCategory')">确 定</el-button>
		  </span>
		</el-dialog>
<!--		新增弹框-->
		<el-dialog
		  title="新增分类"
		  :visible.sync="dialogAddCategory"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在增加【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】同级类别
				<div style="padding-top:5px;">
					<el-form :model="addCategory" :rules="rules2" ref="addCategory" label-width="0" class="demo-ruleForm">
					<el-form-item  prop="name">
						<div class="add-category">
							<span style="width: 50px;">名称：</span>
							<el-input v-model="addCategory.name" placeholder="请输入分类名称"></el-input>
						</div>
					</el-form-item>
					<el-form-item  prop="weight" style="margin-top: -5px;">
						<div class="add-category">
							<span style="width: 50px;">序号：</span>
							<el-input v-model="addCategory.weight" placeholder="请输入序号"></el-input>
						</div>
					</el-form-item>
					</el-form>
				</div>
			</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddCategory= false">取 消</el-button>
		    <el-button type="primary"  v-on:click="add('addCategory')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props:['id','config','tableSelect','chooseOne','openDialog','change','message'],
		data() {
	      return {
	      	dialogExamine:false,
	      	dialogAddCategoryNext:false,
	      	dialogAddCategory:false,
	      	examineMessage:{
	      		productId:'',
	      		operation:'',
	      		remark:''
	      	},
	      	addCategory:{
	      		name:'',
	      		parentId:'',
	      		weight:''
	      	},
	      	rules: {
		          operation: [
		            { required: true, message: '请选择', trigger: 'blur' },
		          ],
		          remark: [
		            { required: true, message: '请填写审核说明', trigger: 'blur' }
		          ]
	      	},
	      	rules2: {
		          name: [
		            { required: true, message: '名称不能为空', trigger: 'blur' },
		          ],
		          weight: [
		            { required: true, message: '序号不能为空', trigger: 'blur' },
		          ]
	      	}
	      }
	   },
	   created(){
	   },
	   watch: {
//			var a = this.openDialog;
		    change: function (){
		      //每当str的值改变则发送事件update:word , 并且把值传过去\
		     if(this.config.type == 'productExamine'){
		     	this.dialogExamine = true;
		     	setTimeout(()=>{
		     		this.$refs['examineMessage'].resetFields();
		     	},0)
		     }
		     if(this.config.type == 'productAddCategoryNext'){
		     	this.dialogAddCategoryNext = true;
		     	setTimeout(()=>{
		     		this.$refs['addCategory'].resetFields();
		     	},0)
		     }
		     if(this.config.type == 'productAddCategory'){
		     	this.dialogAddCategory = true;
		     	setTimeout(()=>{
		     		this.$refs['addCategory'].resetFields();
		     	},0)
		     }
		    }
		},
		methods:{
			examin(formName){
				this.$refs[formName].validate((valid) => {
				this.examineMessage.productId = this.id;
				var content = this.examineMessage;
				var send = this.Qs.stringify(content);
					this.$axios.put(this.config.src+'?'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
						if(res.data.state == '000000'){
							this.dialogExamine = false
							this.returnMessage('完成审核');
						}else{
							this.$message.error(res.data.message);
						}
					}).catch((err)=>{
				                    this.$message.error('接口请求出错');
				    })
				});
			},
//			新增分类
			addProductCategory(formName){
				this.$refs[formName].validate((valid) => {
					console.log(this.message);
					this.addCategory.parentId = this.message.id;
					var content = this.addCategory;
					var send = this.Qs.stringify(content)
					this.$axios.post(this.config.src,send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
						if(res.data.state === "000000"){
							this.dialogAddCategoryNext = false;
							this.dialogAddCategory = false;
							this.returnMessage('增加成功');
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
					});
				},
			//			新增分类
			add(formName){
				this.$refs[formName].validate((valid) => {
					this.addCategory.parentId = this.tableSelect[0].parentId;
					var content = this.addCategory;
					var send = this.Qs.stringify(content)
					this.$axios.post(this.config.src,send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
						if(res.data.state === "000000"){
							this.dialogAddCategoryNext = false;
							this.dialogAddCategory = false;
							this.returnMessage('增加成功');
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
					});
				},
//			返送信息
			returnMessage(item){
				this.$emit('send',{b:item})
			},
		}
	}
</script>

<style>
	.dialog-product .add-category{
		display: flex;
		flex-direction: row;
	}
	.dialog-product .add-category input{
		border: none;
		border-bottom: 1px solid gainsboro;
		outline: none;
	}
</style>