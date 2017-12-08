/**
 * Created by xw on 2017/12/08
 * 小程序请求接口处理
 */

var API_URL = "https://wx.dev.kalife.cn"

//请求
var requestHandler = {
    url: '',
    params:{},
    success: function(res){
        // success
    },
    fail: function() {
        // fail
    },
    complete: function () {

    },
}

var code = {
    "success": 1,
    "fail": 0
}

//GET请求
function GET(requestHandler) {
    request('GET',requestHandler)
}
//POST请求
function POST(requestHandler) {
    request('POST',requestHandler)
}

function request(method,requestHandler) {
    //注意：可以对params加密等处理
    var params = requestHandler.params;

    wx.request({
	    url: /^\s*http\s*/gi.test(requestHandler.url) ? requestHandler.url : API_URL + requestHandler.url,
	    data: params,
	    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
	    header: {		// 设置请求的 header
	    	'content-type': 'application/x-www-form-urlencoded'
	    }, 
	    success: function(res){
	        //注意：可以对参数解密等处理
	        //requestHandler.success()
	        if (res.data && res.data.code == code.success){
	          	requestHandler.success && requestHandler.success(res.data);
	        }else{
	          	wx.showModal({
	            	title: '数据加载失败',
	            	content: res.data.message || '服务异常，请稍后重试~',
	          	});
	        }

	    },
	    fail: function() {
	        requestHandler.fail()
	    },
	    complete: function() {
	        // complete
	        requestHandler.complete()
	    }
    })

}

module.exports = {
  	GET: GET,
  	POST: POST
}

