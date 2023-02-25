<template>
    <div>
      <!-- alert -->
      <div class="flex items-center breadcrumb justify-between mb-2">
         <p>Home</p>
         <BIconArrowRepeat/>
      </div>
      <div class="alert alert-warning">
        <p>
          Every time you refresh the page, you need to click on the blank space to play the prompt sound (generally, you don't need to click the refresh of the browser). To change the password, please click the edit icon in the upper left corner.
        </p>
      </div>
      <div class="alert alert-info" role="alert">
        <p>
        If you want to mute the sound, you can right-click on the current tab of the browser and select "Mute this website".
        </p>
      </div>
      <!-- combobox -->
      <div class="row">
        <div class="col-3">
          <div class="card border-primary">
            <div class="card-header bg-primary text-white">
              会员总数
            </div>
            <div class="card-body">
              <b id="HomeUserCount">727</b>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card border-success">
            <div class="card-header bg-success text-white">
              会员总余额
            </div>
            <div class="card-body">
              <b id="HomeUserMoney">434483550.31</b>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card border-warning">
            <div class="card-header bg-warning text-white">
              今日订单 / 总额
            </div>
            <div class="card-body">
              <b id="HomeNowOrder">0</b><b id="HomeNowOrderMoney">0</b>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card border-info">
            <div class="card-header bg-info text-white">
              盈亏
            </div>
            <div class="card-body">
              <b id="HomeYingKui">0</b>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            财务7天图型报表
          </div>
          
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            订单7天图型报表
          </div>
        </div>
      </div>
    </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import './app.css'
export default defineComponent({
  name: 'home',
  components: {
    BIconArrowRepeat
  },
  data:()=>({
  }),
  methods:{
  }
})
</script>