<template>
    <el-container>
    	<v-header></v-header>
    	<header style="padding: 30px;">
    		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">用户中心</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/productList' }">商品列表</el-breadcrumb-item>
			<el-breadcrumb-item><span style="color: #74b8fa;">商户订单更换记录</span></el-breadcrumb-item>
		</el-breadcrumb>
    	</header>
        <el-header class="common-header" height="50px">
            <!--<div class="c-header">
        <span class="title">
          <b>商品详情</b>
        </span>
                <span>
          <el-button type="primary" size="small" @click="closeThisPage"><i class="el-icon-back"></i> 返回</el-button>
        </span>
            </div>-->
        </el-header>
        <el-main style="width: 1060px;margin: 0 auto">
            <el-container style="border: 1px solid #e4e4e4;">
                <el-header class="common-sub-header flex-row justify-between"
                           style="position:relative;height:50px;background-color: #f3f3f3;display: flex;flex-direction: row;justify-content: space-between;line-height: 50px;">
                    <span style="color: #F04844;font-weight: bold;font-size: 16px"><i class="el-icon-warning"></i> 当前商品状态：{{nowStatus}}</span>
            <!--        <img id="shareYou" src="../../assets/img/tuijian.png"/>-->
                    <div>
                        <!--<el-button type="primary" size="mini">预览</el-button>-->
                        <!--<el-button type="primary" size="mini">预览</el-button>-->
                        <el-button-group>
                       <!--     <el-button size="small" @click="lookingFor">预览</el-button>-->
                            <el-button size="small" v-on:click="dialogExamine=true" v-if="message.status === 1">审核</el-button>
                            <el-button size="small" @click="upStand" v-if="message.status === 2">上架</el-button>
                            <el-button size="small" @click="downStand" v-if="message.status === 4">下架</el-button>
                        </el-button-group>
                    </div>
                </el-header>
                <el-main class="common-sub-main" style="background-color: #fff">
                    <!--***************************** 公共播放器 *****************************-->
                    <audio id="commonAudio">
                        <source :src="audioSrc" type="audio/ogg">
                    </audio>
                    <!--<audio :src="audioSrc" id="commonAudio"></audio>-->

                    <!--        一个块     -->
                    <div class="infoBlock">
                        <el-card class="box-card" id="goodsInfoBlock">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                          <!--          <icon name="bookmark"></icon>-->
                          		<i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                    商品信息
                                </h3>
                            </div>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">商品编号：</div>
                                    <div class="row-right">{{tableData.id}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <div class="row-left">创建商户：</div>
                                        <div class="row-right">{{tableData.merchantShopName}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">商品分类：</div>
                                    <div class="row-right">{{tableData.categoryName}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <div class="row-left">创建时间：</div>
                                        <div class="row-right">{{tableData.ctime}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">商品名称：</div>
                                    <div class="row-right">{{tableData.name}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">副标题：</div>
                                    <div class="row-right">{{tableData.subTitle}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">商品描述：</div>
                                    <div class="row-right">{{tableData.description}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24" style="line-height: 50px">
                                    <div class="row-left">标签：</div>
                                    <el-tag size="medium" v-for="item in tableData.labelArr" :key="item">{{item}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">背景音：</div>
                                    <div class="row-right">
                                        <el-row id="musicBox" :style="{height:musicHeight?'160px':'auto'}">
                                            <el-col :span="12" v-for="(item,index) in goodsBgm" :key="index">
                                                <div style="vertical-align: middle;display: flex;flex-direction: row;" class="flex-row">
                                                    <div class="music-name" :title="item.name">{{item.name}}</div>
                                                    <div style="width: 70%">
                                                        <el-button type="primary" size="mini" round
                                                                   v-if="item.isPlaying" name="play"
                                                                   @click.native="playMusic(item,index)">播放
                                                        </el-button>
                                                        <el-button type="warning" size="mini" round v-else name="pause"
                                                                   @click.native="pauseMusic(item)">暂停
                                                        </el-button>
                                                        <a class="download-btn" style="border-radius: 20px"
                                                           :href="item.url" target="_blank" download>下载</a>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <i :class="musicHeight?'el-icon-arrow-down':'el-icon-arrow-up'" id="packUp" @click="showMusicBox">{{musicHeight?'展开':'收起'}}</i>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>

                    <!-- 一个块 -->
                    <div class="infoBlock text-center">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                                  <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                    商品SKU
                                </h3>
                            </div>
                            <el-table :data="goodsSku" style="width: 100%">
                                <el-table-column v-for="(item,index) in goodsSku3" :prop="item" :label="item" :key="item"></el-table-column>
                                <el-table-column v-if="goodsSku.length!=0" label="样品铃音">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.样品铃音 != null">
                                          <!--  <el-button type="primary" size="mini" v-if="scope.row.isPlaying" name="play" @click.native="tryPlayMusic(scope.row,scope.$index)" :data='scope.row.isPlaying'>播放</el-button>-->
                                            <el-button type="primary" size="mini" v-if="scope.row.isPlaying" name="play" v-on:click="tryPlayMusic(scope.row,scope.$index)" :data="scope.row.isPlaying">播放</el-button>
                                            <el-button type="warning" size="mini" v-else name="pause" @click.native="pauseMusic(scope.row)">暂停</el-button>
                                            <a :href="scope.row.样品铃音[0]" download class="download-btn">下载</a>
                                        </span>
                                        <span v-else>未上传</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>

                    <!-- 一个块 -->
                    <div class="infoBlock text-center">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                           <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                    商品相册
                                </h3>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="6" v-for="(img,index) in tableData.picUrls" :key="index">
                                    <img class="photo-group" title="点击放大" :src="img" style="width: 100%;height: 200px"
                                         @click="bigImg($event)">
                                </el-col>
                                <el-dialog :visible.sync="dialogVisible" width="45%">
                                    <img :src="bigImgSrc" style="width: 100%"/>
                                </el-dialog>
                            </el-row>

                        </el-card>
                    </div>
                    <!-- 一个块 审核记录审核记录审核记录审核记录审核记录审核记录审核记录审核记录-->
                    <div class="infoBlock text-center">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                                   <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                    审核记录
                                </h3>
                            </div>
                            <el-table :data="auditingData" style="width: 100%">
                                <el-table-column prop="auditTime" label="审核时间"></el-table-column>
                                <el-table-column prop="auditUserId" label="审核人"></el-table-column>
                                <el-table-column prop="status" label="状态"></el-table-column>
                                <el-table-column prop="auditNote" label="原因"></el-table-column>
                            </el-table>
                            <!--<el-table :data="auditingData" style="width: 100%">-->
                            <!--<el-table-column prop="auditTime" label="审核时间"></el-table-column>-->
                            <!--<el-table-column prop="auditUserId" label="审核人"></el-table-column>-->
                            <!--<el-table-column prop="status" label="状态"></el-table-column>-->
                            <!--<el-table-column prop="auditNote" label="原因"></el-table-column>-->
                            <!--</el-table>-->

                        </el-card>
                    </div>

                    <div class="infoBlock">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 25px;line-height: 25px;color: #666">
                                <i class="iconfont icon-el-icon-karakal-shuqian" style="font-size: 18px;"></i>
                                    商品详情
                                </h3>
                            </div>
                            <div v-html="richInfo"></div>
                        </el-card>
                    </div>
                </el-main>
            </el-container>
        </el-main>
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
				<span  style="line-height: 20px;">{{message.name}}</span>
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
    </el-container>
</template>

<script>
	import Vue from 'vue'
	import vHeader from '../home/header.vue'
    export default {
    	components:{
           vHeader
        },
        data() {
            return {
            	examineMessage:{
	      		productId:'',
	      		operation:'',
	      		remark:''
	      	    },
            	dialogExamine:false,
                musicHeight: true,
                isUpStand: false,
                isDownStand: false,
                isAuditing: false,
                isEditor: false,
                audioSrc: '',
                documentIsPlaying: false,
                dialogVisible: false,
                bigImgSrc: '',
                nowStatus: '',
                tableData: {},
                goodsBgm: [],
                goodsSku: [],
                goodsSku2: [],
                goodsSku3: [],
                auditingData: [],
                richInfo: '',
                id:'',
                message:'',
                test:'',
                change: false,
                rules: {
		          operation: [
		            { required: true, message: '请选择', trigger: 'blur' },
		          ],
		          remark: [
		            { required: true, message: '请填写审核说明', trigger: 'blur' }
		          ]
	      	    },
            }

        },
        created() {
            this.getData();
            this. getRecord();
        },
        methods: {
            closeThisPage() {
                this.$router.go(-1);
            },
            // 获取数据
            getData() {
            	this.goodsSku = [];
                var recordId = this.$route.query.id;   //获取订单ID
                this.id = recordId;
//              var _this = this;
                this.$axios({
                    method: "GET",
                    url: '/ucenter/admin/v1/product/' + recordId,
                }).then((res)=> {
                    var data = res.data.data;
                    this.message = data;
//                    商品详情
                    this.richInfo = data.content;
//                  sku
   					if (data.skus) {
                             for (let item of data.skus) {
                                item.售价 = item.售价 / 100;
                                item.isPlaying = true;
                                this.goodsSku.push(item);
                                let obj2 = this.copy(item);
                                delete obj2.样品铃音;
                                delete obj2.isPlaying;
                                this.goodsSku2.push(obj2);
                            }
//                          _this.goodsSku[0].isPlaying = false;
                            this.goodsSku3 = [];
                            for (let x in this.goodsSku2[0]) {
                                this.goodsSku3.push(x)
                            }
                        } else {
         					this.goodsSku2 = [];
                        }
//                    背景音  
					  for (let url of data.backgroundMusicDOS) {
                            this.goodsBgm.push({
                                id: url.id,
                                name: url.name,
                                url: url.url,
                                isPlaying: true,
                            })
                        }
                    this.tableData = {};   //清空数据
                    let whitchStatus;
                    // 商品状态 -1-已删除，0-初始状态；1-待审核；2-审核通过；3-审核不通过；4-发布上架；5-下架；6-暂歇销售
                    switch (data.status) {
                        case -1:
                            whitchStatus = "已删除";
                            break;
                        case 0:
                            whitchStatus = "编辑中";
                            this.isAuditing = true;
                            this.isEditor = true;
                            break;
                        case 1:
                            whitchStatus = "待审核";
                            break;
                        case 2:
                            whitchStatus = "审核通过";
                            this.isUpStand = true;
                            break;
                        case 3:
                            whitchStatus = "审核不通过";
                            break;
                        case 4:
                            whitchStatus = "已上架";
                            this.isDownStand = true;
                            break;
                        case 5:
                            whitchStatus = "已下架";
                            this.isEditor = true;
                            break;
                        case 6:
                            whitchStatus = "暂歇销售";
                            this.isUpStand = true;
                            break;
                        default:
                            whitchStatus = "未知";
                            break;
                    }
                    ;
                    this.nowStatus = whitchStatus;
                    this.tableData.id = data.id;
                    this.tableData.merchantShopName = data.merchantShopName;
                    this.tableData.ctime = this.transformationTime(data.ctime);
                    this.tableData.categoryName = data.categoryName;
                    this.tableData.name = data.name;
                    this.tableData.subTitle = data.subTitle;
                    this.tableData.description = data.description;
                    this.tableData.label = data.label;
                    this.tableData.labelArr = data.label.split(",");
                    this.tableData.picUrls = data.picUrls;

					
                    // 获取审核记录
                });
            },
            getRecord(){
            	 var recordId = this.$route.query.id;  
            	 this.$axios({
                        method: "GET",
                        url: '/ucenter/admin/v1/product/auditRecord?productId=' + recordId + '&pageIndex=1&pageSize=20'
                    }).then((res) =>{
                        var data = res.data.data.list;
                     		
                        if (data.length != 0) {
                            for (let item of data) {
                                this.auditingData = [];   //清空数据
                                let whitchStatus;
                                // 商品状态 -1-已删除，0-初始状态；1-待审核；2-审核通过；3-审核不通过；4-发布上架；5-下架；6-暂歇销售
                                switch (item.status) {
                                    case 1:
                                        whitchStatus = "未审核";
                                        break;
                                    case 2:
                                        whitchStatus = "通过";
                                        break;
                                    case 3:
                                        whitchStatus = "不通过";
                                        break;
                                    case 4:
                                        whitchStatus = "通过";
                                        break;
                                    default:
                                        whitchStatus = "未知";
                                        break;
                                }
                                ;
                                this.auditingData.push({
                                    "auditTime": this.transformationTime(item.auditTime),
                                    "auditUserId": item.auditUserId,
                                    "status": whitchStatus,
                                    "auditNote": item.auditNote,
                                })
                            }

                        } else {
                            this.auditingData = []
                        }
                    });
            },
            transformationTime(date){
                       return (new Date(date)).format("yyyy-MM-dd hh:mm");
			      },
            playMusic(row,index) {
                // 初始化所有页面上的播放状态
                for(let m of this.goodsBgm){
                    m.isPlaying = true;
                }
                for(let n of this.goodsSku){
                    n.isPlaying = true;
                    if(typeof(n.售价) == 'number'){
                    	n.售价 = String(n.售价)
                    }else{
                    	n.售价 = Number(n.售价)
                    }
//                  this.set(this.goodsSku, index, this.goodsSku[index]);
                }
                // 当前选择的这个按钮变成暂停
                this.goodsBgm[index].isPlaying = false;
                // row.isPlaying = !row.isPlaying;
                let audio = document.getElementById("commonAudio");
                this.audioSrc = row.url;
                audio.load();
                audio.play();
            },
            pauseMusic(row) {
                let audio = document.getElementById("commonAudio");
                audio.pause();
                row.isPlaying = !row.isPlaying;
            },
            tryPlayMusic(row,index) {
                for(let m of this.goodsBgm){
                    m.isPlaying = true;
                }
                for(let n of this.goodsSku){
                    n.isPlaying = true;
                }
                this.goodsSku[index].isPlaying = false;
                Vue.set(this.goodsSku, index, this.goodsSku[index]);
                let audio = document.getElementById("commonAudio");
                if (row.样品铃音.length !== 0) {
                    this.audioSrc = row.样品铃音[0];
                }
                audio.load();
                audio.play();
            },
            downLoadMusic(url) {
                var $eleForm = $("<form method='get'></form>");

                $eleForm.attr("action", url);

                $(document.body).append($eleForm);

                //提交表单，实现下载
                $eleForm.submit();
            },
            copy(obj) {
                var newobj = {};
                for (var attr in obj) {
                    newobj[attr] = obj[attr];
                }
                return newobj;
            },
            bigImg(e) {
                this.dialogVisible = true;
                this.bigImgSrc = e.target.src
            },
            // 修改
            toEdit() {
                this.$router.push({
                    path: '/goodsEdit',
                    query: {
                        id: this.$route.query.id
                    }
                });
            },
            upStand() {
                var _this = this
                this.$confirm('是否上架？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: "put",
                        url: '/ucenter/admin/v1/product/publish?productId=' + this.$route.query.id,
                    }).then(function (res) {
                        if (res.data.state == "000000") {
                            _this.$message({
                                type: 'success',
                                message: "上架" + res.data.message + "！"
                            });
                            _this.getData();
                        } else {
                            _this.$message({
                                type: 'error',
                                message: res.data.message + "！"
                            });
                        }
                    })
                }).catch(() => {

                });

            },
            downStand() {
                var _this = this;
                this.$confirm('是否下架？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({           //请求：是否下架
                        method: "put",
                        url: '/ucenter/admin/v1/product/unpublish?productId=' + this.$route.query.id,
                    }).then(function (res) {
                        if (res.data.state == "000000") {
                            _this.$message({
                                type: 'success',
                                message: "下架" + res.data.message + "！"
                            });
                            _this.getData()
                        } else {
                            _this.$message({
                                type: 'error',
                                message: res.data.message + "！"
                            });
                        }
                    })
                }).catch(() => {

                });
            },
            lookingFor() {
                let url = 'http://192.168.1.220/letingShop/#/product?id=' + this.$route.query.id;
                window.open(url)
            },
            showMusicBox() {
                this.musicHeight = !this.musicHeight;
            },
//          审核
	        examin(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.examineMessage.productId = this.id;
					var content = this.examineMessage;
					var send = this.Qs.stringify(content);
						this.$axios.put('/ucenter/admin/v1/product/audit?'+send,this.getMyWeb.axios.aAjaxConfig).then((res)=>{
							if(res.data.state == '000000'){
								this.$message({
	                                type: 'success',
	                                message: res.data.message
	                            });
								this.getData();
								this.dialogExamine = false;
							}else{
								this.$message.error(res.data.message);
							}
						}).catch((err)=>{
					            this.$message.error('接口请求出错');
					    })
					}else{
						this.$message.error('表单格式不对请重新填写');
					}
				});
			},
       },
    }
</script>

<style>
    #shareYou {
        position: absolute;
        right: 38px;
        top: 80px;
        transform: rotate(20deg);
        -ms-transform: rotate(20deg); /* IE 9 */
        -moz-transform: rotate(20deg); /* Firefox */
        -webkit-transform: rotate(20deg); /* Safari 和 Chrome */
        -o-transform: rotate(20deg); /* Opera */
    }

    .el-table th {
        background-color: #f9fafc;
    }

    .infoBlock {
        margin-top: 10px;
        padding: 20px;
    }

    .infoBlock > h5 {
        height: 30px;
        text-align: left;
        font-size: 16px;
    }

    /*.el-step__icon {*/
    /*width: 80px;*/
    /*height: 80px;*/
    /*font-size: 30px;*/
    /*}*/

    .common-item {
        background-color: #f3f3f3;
        border: 1px solid #e4e4e4;
    }

    .box-card {
        width: 930px;
        margin: 0 auto;
    }

    .common-row {
        overflow: hidden;
        text-align: left;
        font-size: 14px;
        color: #666;
    }

    .row-left {
        float: left;
        text-align: right;
        width: 88px;
        line-height: 50px;
    }

    .row-right {
        width: 100%;
        padding-left: 98px;
        text-align: left;
        line-height: 50px;
    }

    .download-btn {
        padding: 7px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #1ABC9C;
        border-color: #1ABC9C;
    }

    a.download-btn:hover, a.download-btn:visited {
        color: #ffffff;
    }

    #goodsInfoBlock .el-tag {
        margin-left: 10px;
    }

    .photo-group {
        cursor: pointer;
    }

    #goodsInfoBlock .music-name {
        width: 30%;
        padding-right: 20px;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #goodsInfoBlock #musicBox {
        position: relative;
        overflow: hidden;
        transition: height ease-out 0.2s;
    }
    #goodsInfoBlock #musicBox #packUp {
        position: absolute;
        margin: auto;
        left: 310px;
        bottom: 0;
        width: 60px;
        text-align: center;
        color: #bcbcbc;
        cursor: pointer;
    }
	.btn-elm-box{
		position: relative;
	}
</style>
