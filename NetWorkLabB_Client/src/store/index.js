﻿import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* 聊天类型 */
        chatType:'',
        /* 记录登录状态 */
        isLogin:false,
        /* 我的信息 */
        myInfo:{name:'',type:''},
        /* 别人的信息（特指聊天对象） */
        userInfo:{name:'广播',type:'group'},
        /* 用户列表 */
        userList:[],
        /* 聊天记录 */
        chatMessageList:[],
        roomList:[],
    },
    mutations: {
        /* 聊天记录的修改,这里我们使用vuex监听 */
        SOCKET_updateChatMessageList(state,data){
            state.chatMessageList.push(data);
        },
        /* 修改聊天类型 */
        changeChatType(state,data){
            state.chatType=data;
        },
        /* 渲染用户列表 */
        SOCKET_login(state,data){
            state.userList=data;
        },
        setUserInfo(state,data){
            state.userInfo=data;
        },
        setMyInfo(state,data){
            state.myInfo=data;
            state.isLogin=true;
        },
        SOCKET_addRoom(state,data){
            state.roomList = data;
        }
    },
    actions: {},
    modules: {}
})
