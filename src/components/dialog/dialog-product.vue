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
		 <!-- 	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>-->
			<div style="flex: 1;margin-left: 10px;">
			  	<!--你正在增加【
				<span v-if="id" style="line-height: 20px;">{{chooseOne[config.name]}}</span>
				<span style="width: 100%;overflow: hidden;word-wrap:break-word;word-break:break-all;padding: 5px 0;line-height: 20px;" v-else>
				  <span v-for="item in tableSelect">&nbsp;{{item[config.name]}}&nbsp;</span>
				</span>
				】同级类别-->
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
<!--		审核记录-->
		<el-dialog
		  title="审核记录"
		  :visible.sync="dialogExamineRecord"
		  width="60%"
		  >
		  <el-table :data="examineRecordList">
		    <el-table-column v-for="(item, index) in examineTable" :key="index"
		    	:property="item.prop" 
		    	:label="item.label" 
		    	show-overflow-tooltip>
		    </el-table-column>
		  </el-table>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogExamineRecord = false">确 定</el-button>
		  </span>
		</el-dialog>
<!--		上架下架-->
		<!--禁用-->
		<el-dialog
		  :title="config.title"
		  :visible.sync="dialogDisable"
		  width="30%"
		  >
		  <div style="display: flex;flex-direction: row;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;margin-top: -5px;"></i>
			<div style="flex: 1;margin-left: 10px;">
			  	你正在下架【
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
			  	你正在上架【
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
<!--		新增/编辑属性-->
		<el-dialog
		  :title="config.title"
		  :visible.sync="dialogAttribute"
		  width="50%"
		  >
		  <div style="padding: 0 35px;" v-on:dragover="dropOver($event)" v-on:drop="drop($event)">
		  	<el-form ref="attributeMessage" :model="attributeMessage" :rules="attributeRule" label-width="150px" label-position="left">
		  	  <el-form-item label="属性名" prop="name">
			    <el-input v-model="attributeMessage.name"></el-input>
			  </el-form-item>
			  <el-form-item label="是否必选">
				  <el-radio-group v-model="attributeMessage.required">
				    <el-radio label="0">非必选</el-radio>
				    <el-radio label="1">必选</el-radio>
				  </el-radio-group>
  			  </el-form-item>
  			  <el-form-item label="属性值可选值列表">
  			  	<div style="overflow: hidden;" id="attrValueBox">
  			  		<div class="attribute-value" v-for="item in attributeValues" draggable="true" v-on:dragstart='startDrag($event)' ref='attriVal'>
  			  		<!--	{{item.value}}-->
  			  			<input type="text" :value="item.value" class="attribute-value-text" v-on:input="computeWidth(item,$event)" v-on:blur="attriInputShow ='';attrValueUpdate = true"/>
  			  			<div class="attriShow" v-if="attriInputShow !== item" v-on:click.stop="attriInputShow = item;attrValueUpdate = true"></div>
  			  			<i class="el-icon-close attribute-value-delete" v-on:click="deleteAttribute(item,$event)"></i>
  			  		</div>
  			  	</div>
			    <div>
			    	<p style="font-size: 12px;line-height: 15px;padding: 3px 0;color: gray;">拖拽属性值到想要位置（方式是插入，不是替换，原来1,2,3，拖拽1到3，顺序就是2,3,1，且此处删除会直接删除，无需通过保存）</p>
			    	<el-input v-model="attributeMessage.attrValues" style="width: 74%;margin-top: 5px;" id="attrValueAdd"></el-input>
			    	<div v-on:click="addAttribute()" v-on:mousedown="attrValueUpdate = true" class="attri-value-add">添加</div>
			    </div>
			    <p style="color: gray;font-size: 12px;line-height: 13px;margin-top: 10px;">可以用enter按键输入</p>
			  </el-form-item>
			  <el-form-item label="属性排序">
			    <el-input v-model="attributeMessage.weight"></el-input>
			    <p style="color: gray;font-size:12px;line-height: 12px;margin-top: 10px;">数值越高显示越前面</p>
			  </el-form-item>
			  <el-form-item label="属性描述">
			    <el-input v-model="attributeMessage.remark"></el-input>
			  </el-form-item>
		    </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAttribute = false">取 消</el-button>
		    <el-button type="primary" @click="saveAttribute('attributeMessage')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props:['id','config','tableSelect','chooseOne','openDialog','change','message'],
		data() {
	      return {
	      	dialogDisable:false,
	      	dialogAble:false,
	      	dialogExamine:false,
	      	dialogExamineRecord:false,
	      	dialogAddCategoryNext:false,
	      	dialogAddCategory:false,
	      	dialogAttribute:false,
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
	      	attributeMessage:{
	      		categoryId: '',
	      		name:'',
	      		required: '',
	      		weight: '',
	      		attrValues: '',	
	      		id: '',
	      		remark: ''
	      	},
	      	attributeValues:[],
	      	attributeAddbtn:'添加',
	      	attriInputShow: '',
	      	attrChoose: '',
	      	attrValueUpdate: false,
	      	valueElms:'',
	      	examineRecordList:[],
	      	isMoveSate:false,
	      	dragMessage:{
	      		start: '',
	      		eml: ''
	      	},
	      	examineTable:[
	      		{
	      			label:'商品名称',
	      			prop:'productName'
	      		},
	      		{
	      			label:'创建时间',
	      			prop:'ctime'
	      		},
	      		{
	      			label:'审核时间',
	      			prop:'auditTime'
	      		},
	      		{
	      			label:'审核状态',
	      			prop:'status'
	      		},
	      		{
	      			label:'审核详情',
	      			prop:'auditNote'
	      		},
	      	],
	      	attributeId:'',
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
	      	},
	      	attributeRule: {
		          name: [
		            { required: true, message: '属性名不能为空', trigger: 'blur' },
		            {min: 2, max: 50, message: '属性名为2-50个字', trigger: 'blur' },
		          ]
	      	}
	      }
	   },
	   created(){
	   },
	   updated(){
	   	if(this.attrValueUpdate){
	   	    let elms = document.querySelectorAll('.attribute-value-text');
		    for(let i =0;i<elms.length;i++){
		    	let val = elms[i].value;
				let num = val.length;
				let width = num * 15;
			    elms[i].style.width = width + 5 + 'px';
			    let children = elms[i].parentNode.children;
			    	for(let j =0;j<children.length;j++){
			    		if(children[j].className === 'attriShow'){
			    			 children[j].style.width = width + 5 + 'px';
			    		}
			    	}
		    }
		    this.attrValueUpdate = false;
	   	}
	   },
	   mounted(){
		  this.$nextTick(()=>{
		  })
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
		     if(this.config.type == 'productExamineRcord'){
		     	this.getExaminList();
		     	this.dialogExamineRecord = true;
		     }
		     if(this.config.type == 'productAble'){
		     	this.dialogAble = true;
		     }
		     if(this.config.type == 'productDisable'){
		     	this.dialogDisable = true;
		     }
		     if(this.config.type == 'productCategoryAttribute'){
		     	this.dialogAttribute = true;
		     	setTimeout(()=>{
//		     		this.$refs['attributeMessage'].resetFields()
		     		this.attributeMessage = {
			      		categoryId: '',
			      		name:'',
			      		required: '',
			      		weight: '',
			      		attrValues: '',	
			      		id: '',
			      		remark: ''
			      	}
		     		this.attributeValues = [];
		     		let elm = document.getElementById('attrValueAdd');
			  		elm.onkeydown=(e)=>{
			   			var event = event || e;
			   			if(event.keyCode == 13){
			   				this.addAttribute();
			   				this.attrValueUpdate = true;
			   			}
			   		}
		     	})
		        this.attributeId = this.config.attributeCategoryId;
		       if(!Array.isArray(this.message)){
		       		this.$axios.get('/ucenter/admin/v1/product/attr/' + this.message.id,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
		       				if(res.data.state === '000000'){
		       					this.attributeValues = res.data.data.attrValues;
		       					setTimeout(()=>{
		       						 let elms = document.querySelectorAll('.attribute-value-text');
		    	                        for(let i =0;i<elms.length;i++){
		    	                        	let val = elms[i].value;
											let num = val.length;
										    let width = num * 15;
										    elms[i].style.width = width + 5 + 'px';
										      let children = elms[i].parentNode.children;
										    	for(let j =0;j<children.length;j++){
										    		if(children[j].className === 'attriShow'){
										    			 children[j].style.width = width + 5 + 'px';
										    		}
										    	}
		    	                        }
		       					},200)
		       					for(let i in this.attributeMessage){
				       				if(i !== 'attrValues'){
				       					if(i === 'required'){
				       						this.attributeMessage[i] = String(res.data.data[i]);
				       					}else{
				       						this.attributeMessage[i] = res.data.data[i];
				       					}
				       				}
				       			}
		       				}
		       		}).catch((err)=>{
						            this.$message.error('数据延迟请重试');
						})
		       }
		     }
		    }
		},
		methods:{
			examin(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						console.log(valid);
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
					}else{
						this.$message.error('表单填写不对');
					}
				});
			},
//			新增分类
			addProductCategory(formName){
				this.$refs[formName].validate((valid) => {
						if(valid){
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
						}else{
							this.$message.error('表单填写不对');
						}
					});
				},
			//			新增分类
			add(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
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
						}else{
							this.$message.error('表单格式填写不对');
						}
					});
				},
//			获取审核列表
			getExaminList(){
				var content = {
					productId:this.id,
					pageIndex:'1',
					pageSize:'20'
				}
				this.$axios.get(this.config.src, {params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					 if(res.data.state === '000000'){
					 	var data = res.data.data.list;
						this.examineRecordList =  data;
						for(let i=0;i<this.examineRecordList.length;i++){
							for(let j in this.examineRecordList[i]){
								if(j == 'auditTime'){
									let time1 = this.examineRecordList[i].auditTime;
									this.examineRecordList[i].auditTime = this.transformationTime(time1)
								}
								if(j == 'ctime'){
									let time2 = this.examineRecordList[i].ctime;
									this.examineRecordList[i].ctime = this.transformationTime(time2)
								}
								if(j == 'status'){
									let state = this.examineRecordList[i].status;
									if(state ==1){
										this.examineRecordList[i].status = '未通过'
									}
									if(state ==2 || state ==4){
										this.examineRecordList[i].status = '通过'
									}
									if(state ==3){
										this.examineRecordList[i].status = '不通过'
									}
								}
							}
						}
					 }else{
					 	this.$message.error(res.data.data);
					 }
		      	}).catch((err)=>{
//		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
			//			下架
			disableMessage(){
				var ids = [];
			        for(let i = 0 ;i<this.tableSelect.length;i++){
			        	for(let index in this.tableSelect[i]){
			        		if(index == this.config.idName){
			        			ids.push(this.tableSelect[i][index]);
			        		}
			        	}
			        };
				var content = '?'+this.config.urlSearch+'=' + ids.join();
				var _url = this.config.src+content;
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						this.returnMessage('下架成功');
						this.$message({
								        message: res.data.message,
								        type: 'success'
								    });
					 	this.dialogDisable = false;
					}else{
						this.$message.error(res.data.data);
					}
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			上架
			ableMessage(){
				var ids = [];
			        for(let i = 0 ;i<this.tableSelect.length;i++){
			        	for(let index in this.tableSelect[i]){
			        		if(index == this.config.idName){
			        			ids.push(this.tableSelect[i][index]);
			        		}
			        	}
			        };
				var content = '?'+this.config.urlSearch+'=' + ids.join();
				var _url = this.config.src+content;
				this.$axios.put(_url,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						this.returnMessage('上架成功');
						this.$message({
								        message: res.data.message,
								        type: 'success'
								    });
					 	this.dialogAble = false;
					}else{
						this.$message.error(res.data.data);
					}
				}).catch((err)=>{
			                    this.$message.error('接口请求出错');
			                    console.error(err);
			    })
			},
//			新增属性值按钮
			addAttribute(){
				if(this.attributeMessage.attrValues){
						let obj = {
							value: this.attributeMessage.attrValues,
						}
						this.attributeValues.push(obj);
					}
					this.attributeMessage.attrValues = '';
			},			
//			删除属性值按钮
			deleteAttribute(item,event){
	             if(document.all){
	                  event.cancelBubble = true;
	             }else{
	                  event.stopPropagation();
	             }
				let index = this.attributeValues.indexOf(item);
					this.attributeValues.splice(index,1);
					if(item.id){
						this.$axios.delete('/ucenter/admin/v1/product/attr/atttrValue/' + item.id,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
							console.log(res);
					 	})
					}
			},
//			修改属性选择按钮
//			chooseAttributeValue(item,event){
//				if(event.detail == 2){
//					
//				}
//				this.chooseValue = item;
//				this.attributeMessage.attrValues = item.value;
//				this.attributeAddbtn = '修改';
//			},
//			计算宽度
			computeWidth(item,event){
				let val = event.target.value;
				let index = this.attributeValues.indexOf(item);
					        this.attributeValues[index].value = val;
				let num = val.length;
			    let width = num * 15;
			    event.target.style.width = width + 'px';
			},
//			计算位置
			startDrag(e){
				var e = e ||  event;			
				this.dragMessage= {
					start: e.clientX,
					elm: e.target
				}
			},
			dropOver(ev){
				    ev.preventDefault();
			},
			drop(ev){
				ev.preventDefault();
				var elms=[];
				var valAry=[];
				var getelms = this.$refs.attriVal;
				for(let i = 0 ;i<this.attributeValues.length;i++){
					valAry.push(this.attributeValues[i]);
				}
				for(let j = 0;j<getelms.length;j++){
					elms.push(getelms[j])
				}
				var nowElm = this.dragMessage.elm
				var stopElm;
				if(ev.target.parentNode.className === 'attribute-value'){
					stopElm = ev.target.parentNode;
					var startIndex = elms.indexOf(nowElm);
					var stopIndex;
					var nowElm;
					var saveValue = valAry[startIndex];
					stopIndex = elms.indexOf(stopElm);
					if(stopIndex>startIndex){
						this.attrValueUpdate = true;
						let svalAry = valAry.slice(startIndex+1);
						let upelms = elms.slice(startIndex+1);
						let stop = upelms.indexOf(stopElm);
						    svalAry.splice(stop+1,0,saveValue);
						let svalAry2 = valAry.slice(0,startIndex);
						let nuwAr = svalAry2.concat(svalAry);
						this.attributeValues = nuwAr;
					}
					if(stopIndex<startIndex){
						this.attrValueUpdate = true;
						let svalAry = valAry.slice(startIndex+1);
						let svalAry2 = valAry.slice(0,startIndex);
						    svalAry2.splice(stopIndex,0,saveValue);
						let nuwAr = svalAry2.concat(svalAry);
						this.attributeValues = nuwAr;
					}
				}
			},
//			保存属性接口
			saveAttribute(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						 this.attributeMessage.categoryId = this.attributeId;
						 let content = {}
						 let values;
						 	 for(let i = 0;i<this.attributeValues.length;i++){
						 	 	let index = 'attrValues[' + i +'].value'
						 	 	content[index] = this.attributeValues[i].value;
						 	 	if(this.attributeValues[i].id){
						 	 		let index2 = 'attrValues[' + i +'].id'
						 	 		content[index2] = this.attributeValues[i].id;
						 	 	}
						 	 }
						 	 for(let i in this.attributeMessage){
						 	 	if(i !== 'attrValues'){
						 	 		content[i] = this.attributeMessage[i]
						 	 	}
						 	 }
				    		var send = this.Qs.stringify(content);
							this.$axios.post('/ucenter/admin/v1/product/attr/saveOrUpdateProductAttrs',send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
							        if(res.data.state === '000000'){
							        	this.returnMessage('属性保存成功');
							        	this.$message({
								          message: res.data.message,
								          type: 'success'
								        });
							        	this.dialogAttribute = false;
							        }else{
							        	this.$message.error(res.data.message);
							        }
					      	}).catch((err)=>{
					            this.$message.error('接口出错');
					    })
					}else{
						this.$message.error('表单格式不对');
					}
				})
			},
//			返送信息
			returnMessage(item){
				this.$emit('send',{b:item})
			},
//			转换时间
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
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
	.attribute-value{
		display: inline-block;
		padding: 8px 25px 8px 10px;
		margin-right: 10px;
		border: 1px solid gainsboro;
		line-height: 15px !important;
		margin-bottom: 10px;
		position: relative;
		cursor: pointer;
	}
	/*.attribute-value i{
		display: none;
	}
	.attribute-value:hover i{
		display: inline-block;
	}*/
	.attribute-value-delete{
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translate(0,-50%);
	}
	.attribute-value-text{
		outline: none;
		border: none;
		display: inline-block;
		width: 15px;
		overflow-y:visible;
	}
	.attriShow{
		position: absolute;
		background: white;
		z-index: 2;
		left: 10px;
		top: 8px;
		height: 17px;
		opacity: 0;
	}
	.attri-value-add{
		padding: 12px 20px;
		border-radius: 4px;
		display: inline-block;
	    line-height: 15px;
	    font-weight: 600;
	    color: white;
	    cursor: pointer;
	    background-color: #409EFF;
		border: 1px solid #409eff;
	}
	.attri-value-add:active{
		background: #3a8ee6 !important;
        border-color: #3a8ee6 !important;
	}
	.attri-value-add:hover{
		background: #66b1ff;
        border-color: #66b1ff;
	}
</style>