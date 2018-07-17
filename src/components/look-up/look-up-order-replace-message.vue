<template>
	<div class="look-up-order-replace">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/orderList' }">订单管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">订单详情</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="padding: 15px 0;margin-top: 10px;">
					<h4>订单详情</h4>
				</div>
<!--				订单详情-->
				<div style="width: 900px;border: 1px solid gainsboro;">
					<div class="orderDetailHead" style="padding-left: 15px;border-bottom: 1px solid gainsboro;font-size: 16px;font-weight: bolder;color: red;">
						<i class="el-icon-warning" style="color: red;font-size: 16px;"></i>
							当前状态：
							<span style="color: red;">{{status(orderDetailMsg.status)}}</span>
					</div>
					<div style="padding: 20px;">
						<div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                                  <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                  	   基本信息
                                </h3>
                        </div>
                        <div>
                        	<div style="display: flex;width: 100%;color: #666;font-size: 14px;padding: 10px 0;">
                        		<div style="flex: 1;">
                        			<span style="width: 88px;text-align: right;">订单号：</span>
                        			<span>{{orderDetailMsg.id}}</span>
                        		</div>
                        		<div style="flex: 1;">
                        			<span style="width: 88px;text-align: right;">售出商户：</span>
                        			<span>{{orderDetailMsg.merName}}</span>
                        		</div>
                        	</div>
                        	<div style="display: flex;width: 100%;color: #666;font-size: 14px;padding: 10px 0;">
                        		<div style="flex: 1;">
                        			<span style="width: 88px;text-align: right;">提交时间：</span>
                        			<span>{{orderDetailMsg.ctime}}</span>
                        		</div>
                        		<div style="flex: 1;">
                        			<span style="width: 88px;text-align: right;">购买用户：</span>
                        			<span>{{orderDetailMsg.memberName}}</span>
                        		</div>
                        	</div>
                        	<div style="display: flex;width: 100%;color: #666;font-size: 14px;padding: 10px 0;">
                        		<div style="flex: 1;">
                        			<span style="width: 88px;text-align: right;">订单备注：</span>
                        			<span>{{orderDetailMsg.remark}}</span>
                        		</div>
                        	</div>
                        </div>
					</div>
					<div style="padding: 20px;">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                                <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                  	   商品信息
                            </h3>
                        </div>
                        <div style="font-size: 14px;color: #666;">
                        	<div style="display: flex;padding: 10px 0;">
                        		<span style="flex: 1;text-align: center;">商品</span>
                        		<span style="width: 140px;text-align: center;">商品编号</span>
                        		<span style="width: 140px;text-align: center;">价格</span>
                        	</div>
                        	<div style="display: flex;padding: 10px 0;">
                        		<div style="flex: 1;">
                        			<div style="display: flex;width: 100%;">
                        				<img :src="detailVo.productPicUrl" style="width: 80px;height: 80px;"/>
	                        			<div style="flex: 1;padding-left: 15px;">
	                        				<h3>
	                        					{{detailVo.title}}
	                        				</h3>
	                        				<p style="margin-top:5px ;">{{detailVo.subTitle}}</p>
	                        				<p style="margin-top:5px ;">背景：{{detailVo.bgm}}&nbsp;{{detailVo.attrValues}}</p>
	                        			</div>
                        			</div>
                        		</div>
                        		<div style="width: 140px;text-align: center;">
                        			{{detailVo.productId}}
                        		</div>
                        		<div style="width: 140px;text-align: center;">
                        			{{transMuch(detailVo.price)}}元
                        		</div>
                        	</div>
                        	<p>
                        		<span style="font-weight: bolder;">录制文字:</span>
                        		{{detailVo.content}}
                        	</p>
                        	<p style="margin-top:5px ;">
                        		<span style=";font-size:14px;">
									样音试听
									<i :class="playIcon" style="color: red;font-size: 17px;" v-on:click="orderPlay(detailVo.ringUrl,$event)"></i>
								</span>
                        	</p>
                        </div>
                    </div>
				</div>
				<div v-for="item in getData" style="border: 1px solid gainsboro;width: 900px;margin-bottom: 15px;">
					<div style="background: gainsboro;padding: 10px 0;position: relative;">
						<span style="color: red;padding-left: 15px;">
							<i class="el-icon-warning" style="color: red;font-size: 15px;"></i>
							当前更换状态：
							<span v-if="item.status == '0'">更换中</span>
							<span v-else-if="item.status == '1'">拒绝更换</span>
							<span v-else-if="item.status == '2'">完成更换</span>
							<span v-else-if="item.status == '3'">同意更换</span>
							<span v-else-if="item.status == '4'">线下沟通</span>
						</span>
						<span style="position: absolute;right: 0;padding-right: 15px;" >
								处理时间：{{transformationTime(item.handleTime)}}
							<span style="margin-left: 30px;" v-if="item.finishTime">完成时间：{{transformationTime(item.finishTime)}}</span>
						</span>
					</div>
					<div style="padding: 15px;">
						<div style="margin: 15px 0;">
							<span>更换记录ID：{{item.id}}</span>
						</div>
						<div style="display: flex;flex-direction:row;margin: 15px 0;">
							<div>
								<span>更换原因：</span>
							</div>
							<div style="flex: 1;">
								<p>{{item.replaceReason}}</p>
							</div>
						</div>
						<div style="display: flex;flex-direction:row;margin: 20px 0;">
							<div>
								<span>商家回复：</span>
							</div>
							<div style="flex: 1;">
								<div>
									<p>{{item.refuseReason}}</p>
									<p style="color: gainsboro;" v-if="!item.refuseReason">商家没做任何回复</p>
								</div>
								<div style="overflow: hidden;margin-top: 15px;">
									<div style="background: red;float: right;" class="btn" v-on:click="handle({name:'refuse',id:item.id})">拒绝</div>
									<div style="background: green;float: right;margin: 0 10px;" class="btn" v-on:click="handle({name:'agree',id:item.id})">同意</div>
								</div>
							</div>
						</div>
						<!--<div style="margin-top: 10px;padding-bottom: 10px;">
							<p style="padding-bottom: 10px;"><span style="font-weight: bolder;">商家回复</span></p>
							<p style="padding: 5px 0;">{{item.refuseReason}}</p>
						</div>-->
						<div style="padding-top:15px ;">
							<span style=";font-size:15px;">
								更换前铃音试听
								<i class="iconfont icon-el-icon-karakal-slideBar-bofang" style="color: red;font-size: 17px;" v-on:click="orderPlay(item.originalUrl,$event)"></i>
							</span>
						</div>
					</div>
<!--					<div style="text-align: right;"><span>完成时间：{{transformationTime(item.finishTime)}}</span></div>-->
				</div>
			</div>
		</div>
<!--		播放器-->
		<audio id="orderAudio">
			<source :src="palyUrl" type="audio/ogg">
		</audio>
<!--		提示框-->
		<el-dialog
		  :title="dialogMessage.title"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <div style="height: 30px;line-height: 30px;position: relative;">
		  	<i class="el-icon-warning" style="color: #f7ba2a;font-size: 30px;"></i>
		  	<span style="padding-left:10px;">
		  		{{dialogMessage.message}}
		  	</span>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogBtn()">确 定</el-button>
		</span>
</el-dialog>
	</div>
</template>

<script>
	import vHeader from '../home/header.vue'
	export default {
		components:{
           vHeader
        },
        data(){
        	return{
        		dialogVisible:false,
        		dialogMessage:{
        			name:'',
        			id:'',
        			message:'',
        			title:''
        		},
        		headerUrl:'',
        		getData:{},
        		id:'',
        		playIcon:'iconfont icon-el-icon-karakal-slideBar-bofang',
        		playState:true,
        		orderDetailMsg:{},
        		detailVo:{},
        		lastPlayer:'',
        		palyUrl:''
        	}
        },
        created(){
        	var _url = window.location.href;
    		var theRequest = new Object(); 
    		var index = _url.indexOf('?')+1
    		var str = _url.substr(index); 
    		var strs = str.split("&"); 
    		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
//			通过url查询id
			this.id = theRequest.id;
        	this.getMerchantMessage();
        	this.getOrderDetail();
        },
        methods:{
     	//		获取更换记录
			getMerchantMessage(){
				var content = {
					orderId: this.id 
				}
				this.$axios.get('/ucenter/admin/v1/order/replace/record',{params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(!res) return;
					if(res.data.state === "000000"){
						this.getData = res.data.data;
					}else{
						this.errMessage = res.data.message
//						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
			getOrderDetail(){
				var content = {
					orderId: this.id 
				}
				this.$axios.get('/ucenter/admin/v1/order/detail',{params:content},this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						this.orderDetailMsg = res.data.data;
						this.detailVo = res.data.data.detailVo
					}else{
						this.$message.error(res.data.message);
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.error(err);
		        })
			},
//			拒绝和同意函数
			handle(data){
				this.dialogMessage = data;
				if(data.name =='refuse'){
					this.dialogMessage.message = '确认要拒绝退换么？';
					this.dialogMessage.title = '拒绝'
				}
				if(data.name =='agree'){
					this.dialogMessage.message = '确认要同意退换么？';
					this.dialogMessage.title = '同意'
				}
				this.dialogVisible = true;
			},
//			弹框函数
			dialogBtn(){
				var src;
				if(this.dialogMessage.name == 'refuse'){
					src = '/ucenter/admin/v1/order/replace/offline/communicated'
				}
				if(this.dialogMessage.name == 'agree'){
					src = '/ucenter/admin/v1/order/replace/admin/pass'
				}
				var content = {
					recordId: this.dialogMessage.id
				}
		    	var send = this.Qs.stringify(content);
				this.$axios.post(src,send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					        if(res.data.state === '000000'){
					        	this.dialogVisible = false;
					        	  this.$message({
							          message: res.data.message,
							          type: 'success'
							        });
					        }else{
					        	this.$message.error(res.data.message);
					        }
			      	}).catch((err)=>{
			                    this.$message.error('登录失败请重新登录');
			    	})
			},
//			转换时间
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
			},
//			试听播放键
			orderPlay(src,e){
				this.palyUrl = src;
				var e = e||event;
				var nowPlay = e.target;
				var aido = document.getElementById('orderAudio');
				if(this.playState){
					if(this.lastPlayer){
						this.lastPlayer.className = 'iconfont icon-el-icon-karakal-slideBar-bofang'
					}
					nowPlay.className = 'iconfont icon-el-icon-karakal-slideBar-zantin';
						aido.load();
						aido.play();
						this.playState = false;
				}else{
					if(nowPlay!==this.lastPlayer){
						if(this.lastPlayer){
						  this.lastPlayer.className = 'iconfont icon-el-icon-karakal-slideBar-bofang'
					    }
						nowPlay.className = 'iconfont icon-el-icon-karakal-slideBar-zantin';
						aido.load();
						aido.play();
						this.playState = false;
					}else{
						nowPlay.className = 'iconfont icon-el-icon-karakal-slideBar-bofang';
						aido.pause();
						this.playState = true;
					}
				}
				this.lastPlayer = nowPlay;
			},
//			转换钱
			transMuch(num){
			    let money = num / 100;
			    return money.toFixed(2)
			  },
//			状态转换
			 status(data){
			    var state;
			    if(data === 1){
			      state = '已取消'
			    }else if(data === 2){
			      state = '待支付'
			    }else if(data === 3){
			      state = '支付成功'
			    }else if(data === 4){
			      state = '支付失败'
			    }else if(data === 5){
			      state = '已确认'
			    }else if(data === 6) {
			      state = '退款中'
			    }else if(data === 7) {
			      state = '退款成功'
			    }else if(data === 8) {
			      state = '已发货'
			    }else if(data === 9) {
			      state = '待收货'
			    }else if(data === 10) {
			      state = '已收货'
			    }else if(data === 11) {
			      state = '已删除'
			    }else if(data === 12) {
			      state = '已关闭'
			    }else if(data === 13) {
			      state = '更换中'
			    }else if(data === 14) {
			      state = '拒绝更换'
			    }else if(data === 15) {
			      state = '同意更换'
			    }else if(data === 16) {
			      state = '已沟通'
			    }else if(data === 17) {
			      state = '更换完成'
			    }
			    return state;
			  }
        }
	}
</script>

<style scoped>
	.look-up-order-replace .btn{
		color: white;
		display: inline-block;
		padding: 2px 3px;
		font-size: 13px;
		border-radius:5px ;
		cursor: pointer;
	}
	.orderDetailHead {
		background: #f3f3f3;
		padding: 10px 0;
	}
</style>