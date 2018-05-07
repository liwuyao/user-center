<<template>
	<div class="look-up-client">
		<v-header></v-header>
		<div style="width: 1250px;margin: 0 auto;position: relative;">
			<div style="padding: 30px 0;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/usercenter' }">用户中心</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/usercenter' }">用户管理</el-breadcrumb-item>
					<el-breadcrumb-item><span style="color: #74b8fa;">用户查看</span></el-breadcrumb-item>
				</el-breadcrumb>
				<div style="margin-top: 30px;display: flex;flex-direction: row;">
					<div style="padding: 50px;">
						<img :src="getData.avatar"  style="right: 260px;top: 50px;width: 150px;"/>
						<p style="text-align: center;">
							<span style="color: rgb(116, 184, 250);">手机号：</span>
							<span v-if="getData.mobile">{{getData.mobile}}</span>
							<span v-else>无手机号</span>
						</p>
					</div>
					<div style="flex: 1;padding-left: 30px;border-left:1px solid gainsboro;">
						<div style="padding: 7px 0;" v-for="(item, index) in data" :key="index">
							<span style="font-size: 15px;color: rgb(116, 184, 250);">{{item.lable}}：</span>
							<span v-if="getData[item.title]" style="padding-left: 10px;color: gray;">{{getData[item.title]}}</span>
							<span v-else style="padding-left: 10px;color: gray;">暂时无相关信息</span>
						</div>
					</div>
				</div>
			</div>
		</div>
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
        		getData:{
        			mobile:'',
        			memberName:'',
        			registerTime:'',
        			birthday:'',
        			gender:'',
        			career:'',
        			company:'',
        			location:'',
        			hometown:''       			
        		},
        		id:'',
        		data:[
        			{
        				lable:'昵称',
        				title:'nickname'
        			},
        			{
        				lable:'用户名',
        				title:'memberName'
        			},
        			{
        				lable:'生日',
        				title:'birthday'
        			},
        			{
        				lable:'性别',
        				title:'gender'
        			},
        			{
        				lable:'职业',
        				title:'career'
        			},
        			{
        				lable:'公司',
        				title:'company'
        			},
        			{
        				lable:'家乡',
        				title:'hometown'
        			},
        			{
        				lable:'所在地',
        				title:'location'
        			},
        			{
        				lable:'个人说明',
        				title:'personalSignature'
        			},
        			{
        				lable:'注册时间',
        				title:'registerTime'
        			}
        		]
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
        	this.getUserMessage();
        },
        methods:{
//      	获取数据
        	 getUserMessage(){
				this.$axios.get('/ucenter/admin/member/'+this.id+'/detail',this.getMyWeb.axios.aAjaxConfig).then((res)=>{
					if(res.data.state === "000000"){
						var data = res.data.data;
						this.getData = data;
						if(this.getData.gender == 0){
							this.getData.gender= "男";
						}
						if(this.getData.gender == 1){
							this.getData.gender= "女";
						}if(this.getData.gender == 2){
							this.getData.gender= "保密";
						}
						this.getData.birthday=this.timestampToTime(this.getData.birthday)
						this.getData.registerTime = this.transformationTime(this.getData.registerTime);
					}else{
						this.$message.error('res.data.message');
					}
		      	}).catch((err)=>{
		                    this.$message.error('接口请求出错');
		                    console.log(err);
		        })
			},
			//     		转换时间格式
			transformationTime(date){
                return (new Date(date)).format("yyyy-MM-dd hh:mm");
			},
			timestampToTime(timestamp) {
		        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate();
		        if(D<10){
		        	D = '0'+D;
		        }else{
		        	D = D + ' ';
		        }
		        return Y+M+D;
		    }
			
        }
	}
</script>

<style>
</style>