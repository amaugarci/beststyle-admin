<template>
    <div>
        <div class="wrapper">
		<div class="container">
			<h1>Welcome</h1>
			<div class="form" >
				<input v-model="username" type="text" placeholder="Username"  name="name">
				<input v-model="password"  type="password" placeholder="Password"  name="pawd">
				<button @click="login" id="login-submit">Login</button>
				<p class="login-tips"></p>
			</div>
		</div>
		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import axios from 'axios'
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import "./app.css";
layer.config({
  skin: 'login-class'
})
export default defineComponent({
  name: 'login',
  components: {
  },
  data:()=>({
    message:'',
	username:'',
    password:'',
  }),
  mounted(){
    localStorage.removeItem('token');
  },
  computed:{
    ...mapState(useAuthStore, ['getUser','getReturnUrl']),
  },
  methods:{
    ...mapActions(useAuthStore, ['setToken']),
    async login(){
        if(this.validation()){
            try{
                const response=await axios.post('/login', {
                    name:this.username,
                    password:this.password
                });
                if(response.data&&response.data.token){
                    console.log(response.data);
                    this.setToken(response.data.token);
                    this.$router.push({ name: this.getReturnUrl })
                }else{
                    this.message='帐号或密码错误';
                    this.showDialog();
                }
            }
            catch(error) {
                this.message='网络错误';
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
	validation(){
        if(this.username==''||this.password==''){
            this.message='请输入所有字段'
            return false;
        }
        return true;
    },
	showDialog(){
        layer.open({
            type:1,
            offset:'b',
            title:false,
            content: this.message,
            closeBtn: 0,
            shadeClose:1,
        });
    },
  }
})
</script>
