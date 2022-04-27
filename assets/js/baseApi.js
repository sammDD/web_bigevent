//每次调用 $.get() $.post()  $.ajax()的时候,会先调用ajaxPrefilter()
// 在这个函数中,可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function(options){

    options.url = 'http://www.liulongbin.top:3007'+options.url
    console.log(options.url)
    //统一为有权限的接口 添加请求头
    if(options.url.indexOf('/my/') !== -1)
    {

        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
        // complete函数始终会被执行，可以通过complete回调函数控制权限访问
        options.complete = function(res){
            
            // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){

                // 清空 token
                localStorage.removeItem('token')
                //跳转回登陆页面
                location.href = '/login.html'
            }
        }
    }
})