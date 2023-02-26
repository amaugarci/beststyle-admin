<template>
    <div>
        <div class="wrapper">
		<div class="container">
			<h1>Welcome</h1>
			<div class="form" >
				<input type="text" placeholder="Username"  name="name">
				<input type="password" placeholder="Password"  name="pawd">
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
import "./app.css";
export default defineComponent({
  name: 'login',
  components: {
  },
  data:()=>({
  }),
  computed:{
  },
  methods:{
    login(){
        this.$router.push({ name: 'home' })
    }
  }
})
</script>
