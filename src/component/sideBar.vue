<template>
    <aside class="main-sidebar" style="position:fixed;left:0;top:0;overflow: auto;">
        <section class="sidebar">
            <ul class="sidebar-menu">
                <li class="header">导航栏</li>
                <li v-for="item in menu_list" class="treeview" :class="{'active': oneParentMenuStatus==item.view}" v-show="item.child_menus.length>0">
                    <a href="#">
                        <i class="fa" v-bind:class="item.icon"></i>
                        <span v-text="item.menu_name"></span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li v-for="childMenu in item.child_menus" :class="{'active': twoParentMenuStatus==childMenu.view}">
                            <template v-if='childMenu.child_menus&&childMenu.child_menus.length>0'>
                                <a href="#">
                                    <i class="fa fa-circle-o"></i>
                                    <span v-text="childMenu.menu_name"></span>
                                    <i class="fa fa-angle-left pull-right"></i></a>
                                </a>
                                <ul class="treeview-menu">
                                    <li v-for='threeChildMenu in childMenu.child_menus' :class="{'active': childMenuStatus==threeChildMenu.view}" v-show="childMenu.child_menus.length>0">
                                        <router-link :to="{name: threeChildMenu.view}">
                                            <i class="fa fa-circle-o"></i>
                                            <span v-text="threeChildMenu.menu_name"></span>
                                        </router-link>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <router-link :to="{name: childMenu.view}">
                                    <i class="fa fa-circle-o"></i>
                                    <span v-text="childMenu.menu_name"></span>
                                </router-link>
                            </template>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </aside>
</template>

<script>
import api from '../common/api'
import http from '../common/http'
import {getCookie} from'../common/cookie.js'

export default {
    mounted: function() {
        $("aside").height($(window).height()-$("header").height());

        $(window).resize(function(){
            $("aside").height($(window).height()-$("header").height());
        })

        this.getMenuList();
        
    },
    data: function() {
        return {
            menu_list: []
        };
    },
    computed: {
        oneParentMenuStatus () {
            var path = this.$route.path.split('index/')[1].split('/');
            return path[0]
        },
        twoParentMenuStatus () {
            var path = this.$route.path.split('index/')[1].split('/');
            return path[1]
        },
        childMenuStatus () {
            var path = this.$route.path.split('index/')[1].split('/');
            return path[path.length-1].indexOf(':')!=-1?path[2]:path[path.length-1]
        }
    },
    methods: {
        // getMenuList () {
        //     var _self = this;
        //     var token = getCookie('token');
        //     Http({
        //         instance: _self,
        //         url: API.getMenuList,
        //         data: {
        //             group_type: 'wms',
        //             token: token,
        //         },
        //         success: function(data){
        //             _self.menu_list = data.data;
        //         }
        //     })
        // }
        getMenuList () {
            this.menu_list = [{
                child_menus: [{
                    child_menus: [ ],
                    icon: "",
                    menu_id: 1001,
                    menu_name: "商品列表",
                    menu_type: null,
                    parent_id: null,
                    permission_id: null,
                    sort: null,
                    view: "goodsList"
                    }],
                icon: "fa fa-tag",
                menu_id: 999,
                menu_name: "商品",
                menu_type: 1,
                parent_id: 0,
                permission_id: 315,
                sort: 1,
                view: "goods"
            },{
                child_menus: [{
                    child_menus: [ ],
                    icon: "",
                    menu_id: 1001,
                    menu_name: "订单列表",
                    menu_type: null,
                    parent_id: null,
                    permission_id: null,
                    sort: null,
                    view: "orderList"
                    }],
                icon: "fa fa-bars",
                menu_id: 1000,
                menu_name: "订单",
                menu_type: 1,
                parent_id: 0,
                permission_id: 316,
                sort: 1,
                view: "order"
            }]
        }
    }
}
</script>