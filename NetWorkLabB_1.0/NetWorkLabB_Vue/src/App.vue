<template>
  <div id="app">
    <mainPage></mainPage>
    <el-dialog style="width:60rem;" :visible.sync="dialogTableVisible" title="登录" append-to-body>
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
} 
.dialog
{
  display: flex;
  flex-direction: row;
  gap:0.5rem;
}
</style>
