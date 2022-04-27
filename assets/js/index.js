$(function(){

    getUserInfo()
    var layer = layui.layer
    $('#btnlogout').on('click',function(){
       
        layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            localStorage.removeItem('token')
            location.href = '/login.html'


            layer.close(index);
          });
    })
})
// 定义获取用户信息函数
function getUserInfo(){
    //发请求
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        // headers:{
        //     Authorization:localStorage.getItem('token')||'',

        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 限制没有权限的访问
        // complete:function(res){
        //     console.log('执行了complete 回调！')
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){

        //         // 清空 token
        //         localStorage.removeItem('token')
        //         //跳转回登陆页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user){
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 按需渲染用户头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        // 获取用户名称的第一个字符，并转为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}