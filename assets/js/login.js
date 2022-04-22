$(function(){
    //点击"去注册账号"链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击"去登陆"链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui 中获取 form 对象
    var form = layui.form
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd:[
           /^[\S]{6,12}$/
           ,'密码必须6到12位,且不能有空格'
        ]  ,
        
        //校验两次密码是否一致
        repwd:function(value){
            //通过形参value可以获取再次确认密码框的值            
            //获取第一次密码框的值
            var pwd = $('.reg-box [name=password]').val()
            
            //比较两次值
            if(pwd !== value){
                return '两次密码不一致!'
            }
            
        }
    })
    var layer = layui.layer
    //监听注册表单提交事件
    $('#form_reg').on('submit',function(e){
        //阻止表单的默认提交事件
        e.preventDefault()
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登陆!')
                //模拟点击行为
                $('#link_login').click()
            })
    })

    //监听登陆表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()

        $.ajax({
            url:'/api/login',
            method:'POST',
            //jQuery快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0 ){
                    return layer.msg('登陆失败!')

                }
                layer.msg('登陆成功!')
                //将登陆成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token',res.token)

                //跳转后台主页
                location.href = '/index.html'
            }
        })
    })
})