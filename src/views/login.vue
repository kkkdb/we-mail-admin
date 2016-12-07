<!-- 登录 -->
<template>
    <div style="height:100% !important;">
        <div class="login-box">
            <div class="login-logo">
                <h1 class="text-green"><b>微商城</b>后台管理系统</h1>
            </div>
            <div class="login-box-body">
                <p class="login-box-msg text-green">
                    <i class="fa fa-dashboard"></i> 会员登录
                </p>
                <div>
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" placeholder="请输入用户名" v-model="userInfo.userName">
                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <input type="password" class="form-control" placeholder="请输入密码" v-model="userInfo.password" @keyup.enter='login'>
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div v-if="errorMsg" class="form-group">
                        <span class="text-red" v-text="errorMsg"></span>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <button class="btn btn-success btn-block btn-flat" v-on:click="login">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../common/API'
import Http from '../common/Http'
import {setCookie, getCookie, deleteCookie} from '../common/Cookie'
import {hex_md5} from '../common/md5'

export default {
    ready: function() {
        var _self = this;
        if(getCookie("pmsUserName")){
            _self.$route.router.go({name: 'home'});
        }else{
            return;
        }
    },
    data: function() {
        return {
            'userInfo': {
                'userName': '',
                'password': ''
            },
            'errorMsg': ''
        }
    },
    methods: {
        login: function() {
            var _self = this;
            if (_self.userInfo.userName=='') {
                layer.msg('请输入账号',{
                    time: 1200
                });
                return false;
            }
            setCookie({AccessToken: '',AccessIp: '::1',AccessType:'shopadmin'},function(){});
            // var password = hex_md5(_self.userInfo.password);
            var password = _self.userInfo.password;

            var loading = layer.load(1);
            _self.$http.post(API.login,{
                'username': _self.userInfo.userName,
                'password': password
            }).then((res) => {
                layer.close(loading);
                _self.errorMsg = '';
                var data = res.data;
                if (data.result=='ok') {
                    var ci_session = data.access_token.split('-')[0];
                    deleteCookie(function(){
                        setCookie({username:_self.userInfo.userName, password: _self.userInfo.password,pmsUserName: _self.userInfo.userName,AccessToken: data.access_token,AccessIp: '::1',AccessType:'shopadmin',ci_session: ci_session}, function() {
                            _self.$route.router.go({name: 'home'});
                        });
                    })
                }else{
                    _self.errorMsg = '账号密码错误';
                }
            }, (res) => {
                layer.close(loading);                
                layer.msg("当前网络太差，请稍后重试",{
                    'time': 1200
                });
            })
        }
    }
}
</script>