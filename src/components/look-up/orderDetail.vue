<template>
    <el-container v-loading="loadingStatus">
        <el-header class="common-header" height="50px">
            <div class="c-header">
        <span class="title">
          <b>订单详情</b>
        </span>
                <span>
          <el-button type="primary" size="small" @click="closeThisPage"><i class="el-icon-back"></i> 返回</el-button>
        </span>
            </div>
        </el-header>
        <el-main style="width: 1060px;margin: 0 auto;font-size: 14px">
            <el-steps :active="step" align-center>
                <el-step title="提交订单" :description="step1"></el-step>
                <el-step title="支付订单" :description="step2"></el-step>
                <el-step title="商户确认订单" :description="step3"></el-step>
                <el-step title="商户发货" :description="step4"></el-step>
                <el-step title="完成" :description="step5"></el-step>
            </el-steps>
            <el-container style="border: 1px solid #e4e4e4;margin-top: 10px;">
                <el-header class="common-sub-header flex-row justify-between"
                           style="height:50px;background-color: #f3f3f3;">
                    <span style="color: #F04844;font-weight: bold;font-size: 16px"><i class="el-icon-warning"></i> 当前订单状态：{{nowStatus}}</span>
                    <div>
                        <!--<el-button type="primary" size="mini">预览</el-button>-->
                        <!--<el-button type="primary" size="mini">预览</el-button>-->
                        <el-button-group>
                            <el-button size="small" @click="confirmDetail" v-if="isConfirmOrder">确认订单</el-button>
                            <el-button size="small" @click="uploadMusic" v-if="isSendGoods">发货</el-button>
                        </el-button-group>
                        <el-dialog title="上传铃音" :visible.sync="dialogVisible" width="30%" style="text-align: left">
                            <el-upload
                                class="upload-common"
                                action="/ucenter/upload/common/audio"
                                name="uploadFile"
                                :data="uploadParams"
                                :headers="avtaHeader"
                                :limit="1"
                                accept="audio/mp3"
                                :on-success="uploadSuccess">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传.mp3格式文件，且不超过10M</div>
                            </el-upload>
                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="dialogVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="toGiveRing()"
                                                           v-bind:disabled="!ringUrl">确 定</el-button>
                                            </span>
                        </el-dialog>
                    </div>
                </el-header>
                <el-main class="text-center" style="background-color: #fff;padding-bottom: 50px">
                    <div class="infoBlock" v-if="isExchange">
                        <div class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 50px;line-height: 25px;color: #666">
                                    <icon name="bookmark"></icon>
                                    退换申请
                                </h3>
                            </div>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">退换编号：</div>
                                    <div class="row-right">{{changeData.id}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="row-left">申请时间：</div>
                                    <div class="row-right">{{changeData.createTime}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">退换状态：</div>
                                    <div class="row-right">{{changeData.status}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">退换原因：</div>
                                    <div class="row-right">{{changeData.replaceReason}}</div>
                                </el-col>
                            </el-row>
                            <!-- 一种情况 -->
                            <el-row class="common-row" v-if="wayBtn">
                                <el-col :span="24">
                                    <div class="row-left">处理备注：</div>
                                    <div class="row-right">
                                        <el-input type="textarea" :rows="5" v-model="changeDataDesc"></el-input>
                                    </div>
                                    <div style="text-align: right;padding-top: 20px">
                                        <el-button type="primary" @click="agreeChange">确认退换</el-button>
                                        <el-button type="danger" @click="refuseChange">拒绝退换</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 一种情况：商户同意 -->
                            <div style="border-top: 1px dashed #666;margin-top: 15px;padding-top: 15px;" v-if="wayAgree">
                                <el-row class="common-row">
                                    <el-col :span="12">
                                        <div class="row-left">处理人：</div>
                                        <div class="row-right">{{changeData.handleMerchantName}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="row-left">处理时间：</div>
                                        <div class="row-right">{{changeData.handleTime}}</div>
                                    </el-col>
                                </el-row>
                                <!--<el-row class="common-row">-->
                                <!--<el-col :span="12">-->
                                <!--<div class="row-left">处理结果：</div>-->
                                <!--<div class="row-right">{{changeData.refuseReason == null?'无':changeData.refuseReason}}</div>-->
                                <!--</el-col>-->
                                <!--</el-row>-->
                                <el-row class="common-row">
                                    <el-col :span="24">
                                        <div class="row-left">处理回复：</div>
                                        <div class="row-right">{{changeData.refuseReason ==
                                            null?'无':changeData.refuseReason}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>

                    <div class="infoBlock">
                        <div class="box-card" id="goodsInfoBlock">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 50px;line-height: 25px;color: #666">
                                    <icon name="bookmark"></icon>
                                    基本信息
                                </h3>
                            </div>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">订单号：</div>
                                    <div class="row-right">{{baseData.id}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <div class="row-left">售出商户：</div>
                                        <div class="row-right">{{baseData.merName}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="12">
                                    <div class="row-left">提交时间：</div>
                                    <div class="row-right">{{baseData.ctime}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <div class="row-left">购买用户：</div>
                                        <div class="row-right">{{baseData.memberName}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="common-row">
                                <el-col :span="24">
                                    <div class="row-left">订单备注：</div>
                                    <div class="row-right">{{baseData.remark == null?'无':baseData.remark}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>


                    <div class="infoBlock">
                        <div class="box-card">
                            <div slot="header" class="clearfix" style="text-align: left">
                                <h3 style="font-size: 20px;height: 50px;line-height: 25px;color: #666">
                                    <icon name="bookmark"></icon>
                                    商品信息
                                </h3>
                            </div>
                            <div id="infoTop">
                                <span style="width: 70%">商品</span>
                                <span style="width: 15%">商品编号</span>
                                <span style="width: 14%">价格</span>
                            </div>
                            <div id="infoContent" class="flex-row">
                                <div style="width: 70%;text-align: left" class="flex-row">
                                    <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527853599510&di=96df0555edae42dc9b30d4ab85586da0&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg"/>-->
                                    <img :src="goodsInfo.productPicUrl"/>
                                    <div class="flex-column" style="width: 85%;padding-left: 20px">
                                        <h3 style="margin-bottom: 5px">{{goodsInfo.title}}</h3>
                                        <span>{{goodsInfo.subTitle}}</span>
                                        <div class="flex-row" style="margin-top: 10px">
                                            <div style="width: 50%">
                                                背景：{{goodsInfo.bgm}}
                                                {{goodsInfo.attrValues}}
                                            </div>
                                            <div style="width: 50%">
                                                <el-button-group>
                                                    <a class="a-btn" :href="goodsInfo.bgmUrl" download
                                                       target="_blank"><i class="el-icon-download"></i>背景下载</a>
                                                    <a class="a-btn" href="javascript:void(0)" v-if="yyIsPlaying"
                                                       @click="playMusic(goodsInfo.ringUrl,'yyIsPlaying')">样音试听</a>
                                                    <a class="a-btn-yellow" href="javascript:void(0)" v-else
                                                       @click="pauseMusic('yyIsPlaying')">样音暂停</a>
                                                    <span v-if="isShowBtn">
                                                        <a class="a-btn" href="javascript:void(0)" v-if="huoIsPlaying"
                                                           @click="playMusic(goodsInfo.listenerUrl,'huoIsPlaying')">试听</a>
                                                        <a class="a-btn-yellow" href="javascript:void(0)" v-else
                                                           @click="pauseMusic('huoIsPlaying')">暂停</a>
                                                        <a class="a-btn" :href="goodsInfo.listenerUrl" download
                                                           target="_blank"><i class="el-icon-download"></i>下载</a>
                                                    </span>
                                                </el-button-group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 15%">{{goodsInfo.productId}}</div>
                                <div style="width: 14%">{{goodsInfo.dPrice}}元</div>
                            </div>
                            <p id="words" style="text-align: left">
                                <b>录制文字：</b>{{goodsInfo.content}}
                                <br>
                                <span style="float: right;color: #f04844">共 <b style="font-size: 16px">{{goodsInfo.contentLength}}</b> 字</span>
                            </p>
                            <hr style="margin: 10px 0">
                            <div id="accounts" class="flex-column" style="font-size: 14px">
                                <div><span>商品总额：</span>￥{{fixedNum(goodsInfo.price)}}</div>
                                <div><span>文字附加费用：</span>￥{{fixedNum(goodsInfo.textPrice)}}</div>
                                <div style="font-size: 16px;color: #f04844;"><span>应付总额：</span>￥{{fixedNum(goodsInfo.closedPrice)}}</div>
                            </div>
                        </div>
                    </div>
                    <!--***************************** 公共播放器 *****************************-->
                    <audio id="commonAudio">
                        <source :src="audioSrc" type="audio/ogg">
                    </audio>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import {Loading} from 'element-ui';
    var audio = new Audio();
    export default {
        name: "order-detail",
        data() {
            return {
                // 发货上传铃音相关
                ringUrl: '',
                dialogVisible: false,
                isConfirmOrder: false,
                isSendGoods: false,
                uploadParams: {
                    'objType': '0101'
                },
                avtaHeader: {
                    'access_token': JSON.parse(sessionStorage.getItem("userinfo")).tokenId,
                },
                // end
                isPlayingArr: [],
                yyIsPlaying: true,  //是否播放样音
                huoIsPlaying: true,  //是否播放成品音乐
                documentIsPlaying: false,    //是否有音乐正在播放
                loadingStatus: false,
                wayBtn: false,
                isExchange: false,
                wayRefuse: false,
                wayAgree: false,
                isShowBtn: false,    // 根据状态判断是否显示按钮
                nowStatus: '',   //当前订单状态
                step: null,    //第几步
                step1: '',    //第几步
                step2: '',    //第几步
                step3: '',    //第几步
                step4: '',    //第几步
                step5: '',    //第几步
                baseData: {},
                goodsInfo: {},
                orderData: [],
                orderItem: [],
                changeData: {},
                changeDataDesc: '',
                audioSrc: '',
            }
        },
        methods: {
            closeThisPage() {
                this.$router.go(-1);
            },
            // 播放音乐
            playMusic(url, isPlay) {
                if (url == null){
                    this.$message.error('抱歉，暂无样音！');
                    return false;
                }
                // 初始化所有页面上的播放状态
                this.yyIsPlaying = true;
                this.huoIsPlaying = true;
                this[isPlay] = false;
                // 当前选择的这个按钮变成暂停
                // this.goodsBgm[index].isPlaying = false;
                // let audio = document.getElementById("commonAudio");
                // this.audioSrc = url;
                audio.src = url;
                audio.load();
                audio.play();
            },
            // 暂停音乐
            pauseMusic(isPau) {
                // let audio = document.getElementById("commonAudio");
                audio.pause();
                this[isPau] = !this[isPau];
            },
            // 获取数据
            getData() {
                var orderId = this.$route.query.id;   //获取订单ID
                var _this = this;
                _this.loadingStatus = true;     //加载遮罩层
                // 数据初始化--------
                _this.dialogVisible = false;
                _this.isConfirmOrder = false;
                _this.isSendGoods = false;
                _this.isExchange = false;
                _this.wayBtn = false;
                _this.wayRefuse = false;
                _this.wayAgree = false;
                _this.isShowBtn = false;
                // end------------
                this.$axios({
                    method: "GET",
                    url: '/manage/v1/admin/order/detail',
                    params: {'orderId': orderId}
                }).then(function (res) {
                    _this.loadingStatus = false;
                    var data = res.data.data;
                    if (data == null) {
                        _this.$alert(res.data.msg, '错误提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$router.go(-1);
                                return false;
                            }
                        });

                    }
                    _this.step1 = data.ctime;   //第一步信息
                    _this.step2 = data.payTime;   //第2步信息
                    _this.step3 = data.confirmTime;   //第3步信息
                    _this.step4 = data.transportTime;   //第4步信息
                    _this.step5 = data.closedTime;   //第5 步信息
                    _this.baseData = {};   //清空数据
                    _this.orderData = [];   //清空数据
                    _this.orderItem = [];   //清空数据
                    let whitchStatus;
                    // 0：初始化订单，1：订单取消，2：待支付，3：支付成功，4：支付失败，5：商家已确认，
                    // 6：退款，7：退款成功，8：商家待发货，9：用户待收货，10：用户已收货，11：订单已删除，
                    // 12：订单已关闭，13：铃音更换中，14：商户拒绝更换铃音，15：商户同意更换铃音16：线下已沟通，17：更换完成

                    // 获取订单所有数据的switch
                    switch (data.status) {
                        case 0:
                            whitchStatus = "初始化订单";
                            _this.step = 0;
                            break;
                        case 1:
                            whitchStatus = "订单取消";
                            _this.step = 0;
                            break;
                        case 2:
                            whitchStatus = "待支付";
                            _this.step = 1;
                            break;
                        case 3:
                            whitchStatus = "支付成功";
                            _this.step = 2;
                            _this.isConfirmOrder = true;
                            break;
                        case 4:
                            whitchStatus = "支付失败";
                            _this.step = 2;
                            break;
                        case 5:
                            whitchStatus = "已确认";
                            _this.step = 3;
                            _this.isSendGoods = true;
                            break;
                        case 6:
                            whitchStatus = "退款";
                            break;
                        case 7:
                            whitchStatus = "退款成功";
                            break;
                        case 8:
                            whitchStatus = "已发货";
                            _this.step = 4;
                            _this.isShowBtn = true;
                            break;
                        // case 9:
                        //     whitchStatus = "用户待收货";
                        //     _this.isShowBtn = true;
                        //     break;
                        case 10:
                            whitchStatus = "已收货";
                            _this.step = 5;
                            _this.isShowBtn = true;
                            break;
                        case 11:
                            whitchStatus = "已删除";
                            break;
                        case 12:
                            whitchStatus = "订单关闭";
                            break;
                        case 13:
                            whitchStatus = "铃音更换中";
                            _this.isExchange = true;
                            _this.wayBtn = true;
                            _this.step = 3;
                            break;
                        case 14:
                            whitchStatus = "拒绝更换";
                            _this.isExchange = true;
                            _this.wayAgree = true;
                            _this.step = 5;
                            break;
                        case 15:
                            whitchStatus = "同意更换";
                            _this.isExchange = true;
                            _this.wayAgree = true;
                            _this.isSendGoods = true;
                            _this.step = 3;
                            break;
                        case 16:
                            whitchStatus = "线下已沟通";
                            break;
                        case 17:
                            whitchStatus = "更换完成";
                            _this.isShowBtn = true;
                            break;
                        default:
                            whitchStatus = "未知";
                            break;
                    };
                    _this.nowStatus = whitchStatus;
                    _this.baseData.id = data.id;
                    _this.baseData.replaceTimes = data.id;
                    _this.baseData.payTime = data.payTime;
                    _this.baseData.merName = data.merName;
                    _this.baseData.remark = data.remark;
                    _this.baseData.memberName = data.memberName;
                    _this.baseData.ctime = _this.common.formatTimeDate(data.ctime);
                    // 商品信息
                    _this.goodsInfo.title = data.detailVo.title;
                    _this.goodsInfo.subTitle = data.detailVo.subTitle;
                    _this.goodsInfo.attrValues = data.detailVo.attrValues;
                    _this.goodsInfo.dPrice = data.detailVo.price / 100;
                    _this.goodsInfo.attrValues = data.detailVo.attrValues;
                    _this.goodsInfo.content = data.detailVo.content;
                    _this.goodsInfo.contentLength = data.detailVo.contentLength;
                    _this.goodsInfo.bgmUrl = data.detailVo.bgmUrl;
                    _this.goodsInfo.listenerUrl = data.detailVo.listenerUrl;
                    _this.goodsInfo.ringUrl = data.detailVo.ringUrl;
                    _this.goodsInfo.bgm = data.detailVo.bgm;
                    _this.goodsInfo.productId = data.detailVo.productId;
                    _this.goodsInfo.price = data.price / 100;
                    _this.goodsInfo.closedPrice = data.closedPrice / 100;
                    _this.goodsInfo.textPrice = (data.closedPrice - data.price)/100;
                    _this.goodsInfo.productPicUrl = data.detailVo.productPicUrl;

                    _this.orderItem.push({
                        id: "music" + data.id,
                        title: data.detailVo.title,
                        subTitle: data.detailVo.subTitle,
                        bgm: data.detailVo.bgm,
                        content: data.detailVo.content,
                        listenerUrl: data.detailVo.listenerUrl,
                        attrValues: data.detailVo.attrValues,
                        isPlay: true
                    })
                });
            },
            // 获取更换记录
            getChangeData() {
                var _this = this;
                this.$axios({
                    method: "GET",
                    url: '/manage/v1/admin/order/replace/all',
                    params: {'orderId': this.$route.query.id}
                }).then(function (res) {
                    var data = res.data.data;
                    _this.changeData = {};
                    for (let item of data) {
                        let whitchStatus;
                        // 更换状态的switch
                        switch (item.status) {
                            case "0":
                                whitchStatus = "更换中";
                                break;
                            case "1":
                                whitchStatus = "拒绝更换";
                                break;
                            case "2":
                                whitchStatus = "更换完成";
                                break;
                            case "3":
                                whitchStatus = "同意更换";
                                break;
                            case "4":
                                whitchStatus = "线下已沟通";
                                break;
                            default:
                                whitchStatus = "未知";
                                break;
                        }
                        ;
                        _this.changeData.id = item.id;
                        _this.changeData.createTime = _this.common.formatTimeDate(item.createTime);
                        _this.changeData.status = whitchStatus;
                        _this.changeData.replaceReason = item.replaceReason;
                        _this.changeData.handleMerchantName = item.handleMerchantName;
                        _this.changeData.refuseReason = item.refuseReason;
                        _this.changeData.handleTime = _this.common.formatTimeDate(item.handleTime);
                    }
                })
            },
            // 同意更换
            agreeChange() {
                var _this = this;
                this.$axios({
                    method: "POST",
                    url: '/manage/v1/admin/order/replace/accept',
                    params: {'recordId': _this.changeData.id}
                }).then(function (res) {
                    if (res.data.ack == "000000") {
                        _this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        _this.getData();
                        _this.getChangeData();
                    }
                });
            },
            // 拒绝更换
            refuseChange() {
                var _this = this;
                this.$axios({
                    method: "POST",
                    url: '/manage/v1/admin/order/replace/refuse',
                    params: {
                        'recordId': _this.changeData.id,
                        'refuseReason': _this.changeDataDesc
                    }
                }).then(function (res) {
                    if (res.data.ack == "000000") {
                        _this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        _this.getData();
                        _this.getChangeData();
                    }
                });
            },
            // 确认订单
            confirmDetail: function () {
                var _this = this;
                this.$confirm('是否确认订单？', '操作确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: "POST",
                        url: '/manage/v1/admin/order/ack',
                        params: {'orderId': this.$route.query.id}
                    }).then(function (res) {
                        if (res.data.ack == "000000") {
                            _this.$message({
                                type: 'success',
                                message: "确认订单" + res.data.msg + "!"
                            });
                            _this.getData()
                        } else {
                            _this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    });
                });
            },
            // 上传订单
            uploadSuccess: function (res,file, fileList) {
                var _this = this;
                if (res.state == "000000"){
                    this.ringUrl = res.data.filePath;
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                }else {
                    fileList.splice(0,1);
                    this.$message.error(res.message);
                }
                // if (res != null) {
                //     this.ringUrl = res.data.filePath
                // }
            },
            // 上传完后确认发货
            toGiveRing() {
                var _this = this;
                this.$axios({
                    method: "POST",
                    url: '/manage/v1/admin/order/updateFile',
                    params: {'orderId': this.$route.query.id, 'filePath': this.ringUrl,}
                }).then(function (res) {
                    if (res.data.ack == "000000") {
                        _this.$notify({
                            title: "成功",
                            message: "铃音更新" + res.data.msg + "!",
                            type: 'success'
                        });
                        _this.dialogVisible = false;
                        _this.getData();
                    } else {
                        _this.$notify.error({
                            title: '错误',
                            message: res.data.msg
                        });
                    }
                });
            },
            // 发货按钮
            uploadMusic() {
                this.dialogVisible = true;
                this.ringUrl = ''
            },
            fixedNum(num){
                let number = parseFloat(num);
                return number.toFixed(2);
            }
        },
        mounted() {
            this.getData();
            this.getChangeData();
        },
        destroyed(){
            // 页面销毁暂停播放音乐
            audio.pause();
        }
    }
</script>

<style>
    .el-step__icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
    }

    .el-step.is-horizontal .el-step__line {
        top: 40px;
    }

    /*商品信息*/

    .el-table th {
        background-color: #f9fafc;
    }

    .infoBlock {
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

    #infoTop {
        width: 100%;
        text-align: center;
        background-color: #f2f2f2;
        padding: 10px;
    }

    #infoTop span {
        display: inline-block;
    }

    #infoContent {
        padding: 10px 0;
    }

    #infoContent button {
        display: inline-block;
    }

    #infoContent img {
        width: 80px;
        height: 60px;
    }

    #infoContent .a-btn {
        background-color: #1abc9c;
        color: #fff;
        padding: 5px;
        margin-left: 5px;
        border-radius: 3px;
        font-size: 12px;
    }

    #infoContent .a-btn-yellow {
        background-color: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
        padding: 5px;
        margin-left: 5px;
        border-radius: 3px;
        font-size: 12px;
    }

    p#words {
        width: 100%;
        height: auto;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }

    #accounts {
        float: right;
        font-size: 16px;
        line-height: 30px;
    }
    #accounts>div{
        width: 250px;
        text-align: right;
        overflow: hidden;
    }
    #accounts>div>span{
        display: block;
        float: left;
        width: 150px;
    }
</style>
