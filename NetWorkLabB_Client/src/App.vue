<template>
  <div id="app">
    <mainPage class="mainpage"></mainPage>
    <el-dialog class="dialogwrap" style="width:60rem;" :visible.sync="dialogTableVisible" title="登录" append-to-body>
      <div class="dialog">
        <el-input style="width:21.5rem" placeholder="请输入用户名" v-model="userName"></el-input>
        <el-button style="width: 5rem;" @click="login">登录</el-button>
      </div>      
    </el-dialog>
  </div>
  
</template>

<script>
import store from './store/index'
import mainPage from "./components/mainPage.vue";
export default {
  name: 'App',
  components:
  {
    mainPage
  },
  data(){
    return{
      dialogTableVisible: true,
      userName:'',
    }
  },
  methods:{
    login(){
      if(this.userName==='')
      {
        this.$message.error('请输入用户名'); 
        //  Element Plus 注册了一个全局的 $message方法用于调用   
      }
      else{
        this.$socket.connect();
        //分别向socket和commit提交        
        this.$socket.emit("login",{name:this.userName,type:"user"},(res) =>
        {
          if(res)
          {
            this.$message.success("登录成功");
            this.dialogTableVisible=false;
            store.commit("setMyInfo",{name:this.userName,type:"user"});
          }
          else
          {
            this.$message.error("用户名重复，请重新输入");
          }
        });            
      }
      
    }
  },
  computed:{
    isLogin()
    {
      return store.state.isLogin;
    },
  },
  created(){
    console.log(this.isLogin);
  },
  mounted()
  {
    if(this.isLogin===false)
    {
      this.dialogTableVisible=true;
    }
  }
  
}
</script>

<style>
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  margin:0;
  padding:0;
  background-image: url(https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16832199295566722193.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
} 
.dialog
{
  display: flex;
  flex-direction: row;
  gap:0.5rem;
}
.mainpage
{
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -25rem;
  margin-top: -17.5rem;
  background-color: white;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.dialogwrap
{
  position: fixed;
  left: 25%;
  top: 25%;
}
</style>
