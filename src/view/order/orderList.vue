<template>
    <div class="content-wrapper">
        <!-- Content Header -->
        <section class="content-header">
            <h1>订单列表</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 订单</a></li>
                <li class="active">订单列表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
            </div>
        </section>
    </div>
</template>

<script>
import api from '../../common/api'
import http from '../../common/http'
import {getCookie} from '../../common/cookie'

var vm = '';

export default {
    mounted: function() {
        $(".content-wrapper").css({
            'min-height': $(document).height() - $(".main-header").height() + 'px', 
            'margin-top': $(".main-header").height()
        });
        vm = this;
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>