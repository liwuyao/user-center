/**
 * localStorage 是一种本地存储的缓存
 *
 */
import Qs from 'qs';
import ElementUI from 'element-ui';

export default {
    install(Vue, options) {
        Vue.prototype.getMyWeb = {//MyWeb所有的配置资源信息（目前包括URL，基本的状态码以及相应文字信息，ajax配置信息）
        	timestampToTime:(timestamp)=>{
		        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate();
		        if(D<10){
		        	D = '0'+D;
		        }else{
		        	D = D + '';
		        }
		        return Y+M+D;
		    },
            url: {
                headerUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526276043500&di=d1fe99f57b71a30252e74fb1eeee1c52&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2016%2F12%2F08%2F17021214412.jpg'
            },
            response: {
                SUCCESS: "000000",//, "success")操作成功
                ADMIN_LOGIN_CAPTCHA_TIMEOUT: "010104", //,"验证码已过期"),
                ADMIN_LOGIN_CAPTCHA_ERROR: "010105", //,"验证码不正确"),
                ADMIN_LOGIN_TOKEN_EMPTY_ERROR: "010106", //,"token参数为空"),
                CHANNL_NO_LOGIN: "020100", //"未登录"),

                NO_PERMISSIONS_ERROR: "000005",//"用户没有权限操作"),
                OBJECT_NOT_EXIST_ERROR: "00004", //"对象不存在"),
                PARAM_MISS: "000002",//"字段不能为空"),
                SYSTEM_MONGDB_ERROR: "000003", //"系统正忙，请稍后重试"),
                SYSTEM_REDIS_ERROR: "000001" //"系统正忙，请稍后重试")
            },
            pageContent:{
                uploadTip: "注：上传图片必须为PNG，JPG,JPEG等图片格式，最大上传为2MB。",
            },
            axios: {
                aAjaxConfig: {//具体配置信息详细见vueAxiosAjaxConfig.js文件中解释
                    // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
                    // 这只适用于请求方法'PUT'，'POST'和'PATCH'
                    // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
                    transformRequest: [function (data) {
                        // 做任何你想要的数据转换
                        return data;
                    }],
                    // `transformResponse`允许在 then / catch之前对响应数据进行更改
                    transformResponse: [function (data) {
                        // Do whatever you want to transform the data
                      /*  var state = data.state;
                        if (state == '020100') {//未登录
                            alert("用户未登录");
                            this.$router.push("/login");//跳转页面
                            return data;
                        }*/
                        /*if (state != '000000') {//失败
                            var message = data.message;
                            if (message == null || message == null || message == '') {
                                alert("请求失败，请联系管理员");
                                return data;
                            }
                            return data;
                        }*/
                        return data;
                    }],
                    // `headers`是要发送的自定义 headers
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    // `params`是要与请求一起发送的URL参数
                    // 必须是纯对象或URLSearchParams对象
                    params: {
                        // ID: 12345
                    },
                    // `paramsSerializer`是一个可选的函数，负责序列化`params`
                    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
                    paramsSerializer: function (params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                     data: {
				        firstName: 'Fred'
					},
                    // `data`是要作为请求主体发送的数据
                    // 仅适用于请求方法“PUT”，“POST”和“PATCH”
                    // 当没有设置`transformRequest`时，必须是以下类型之一：
                    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
                    // - Browser only: FormData, File, Blob
                    // - Node only: Stream
                    /*data: {
                        firstName: 'Fred'
                    },*/
                    // `timeout`指定请求超时之前的毫秒数。
                    // 如果请求的时间超过'timeout'，请求将被中止。
                    timeout: 1000,
                    // `withCredentials`指示是否跨站点访问控制请求
                    // should be made using credentials
                    withCredentials: false, // default
                    // `adapter'允许自定义处理请求，这使得测试更容易。
                    // 返回一个promise并提供一个有效的响应（参见[response docs]（＃response-api））
                    // adapter: function (config) {
                    //     /* ... */
                    //     return config;
                    // },
                    // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
                    // 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
                    // auth: {
                    //     username: 'janedoe',
                    //     password: 's00pers3cret'
                    // },
                    // “responseType”表示服务器将响应的数据类型
                    // 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
                    responseType: 'json', // default
                    //`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
                    xsrfCookieName: 'XSRF-TOKEN', // default
                    // `xsrfHeaderName`是携带xsrf令牌值的http头的名称
                    xsrfHeaderName: 'X-XSRF-TOKEN', // default
                    // `onUploadProgress`允许处理上传的进度事件
                    onUploadProgress: function (progressEvent) {
                        // 使用本地 progress 事件做任何你想要做的
                    },
                    // `onDownloadProgress`允许处理下载的进度事件
                    onDownloadProgress: function (progressEvent) {
                        // Do whatever you want with the native progress event
                    },
                    // `maxContentLength`定义允许的http响应内容的最大大小
                    maxContentLength: 2000,
                    // `validateStatus`定义是否解析或拒绝给定的promise
                    // HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
                    // 拒绝。
                    validateStatus: function (status) {
                        return status >= 200 && status < 300; // default
                    },
                    // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
                    // 如果设置为0，则不会遵循重定向。
                    maxRedirects: 5 ,// 默认
                    withCredentials: true
                }
            }
        }
    },
    alertS(timer) {//格式化时间字符串
        alert('测试的数据为:' + timer);
    }
}
