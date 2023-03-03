<template>
    <div>
      <!-- alert -->
      <div class="flex items-center breadcrumb justify-between mb-2">
         <p>Home</p>
         <BIconArrowRepeat/>
      </div>
      <div class="alert alert-warning">
        <p>
        {{ alert }}
        </p>
      </div>
      <div class="alert alert-info" role="alert">
        <p>
        {{ info }}
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
          <IEcharts
            styles="width: 100%;height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;background: transparent;"
            :option="financial"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            订单7天图型报表
          </div>
          <IEcharts
            styles="width: 100%;height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;background: transparent;"
            :option="option2"
          />
        </div>
      </div>
    </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import './app.css'
layer.config({
  skin: 'login-class'
})
export default defineComponent({
  name: 'home',
  components: {
    BIconArrowRepeat,
    IEcharts
  },
  data:()=>({
    alert:'每次刷新页面需要点击一下空白处才会播提示音（一般情况下无需点击浏览器的刷新）。修改密码请点击左上角的编辑图标。',
    info:'如果想静音可以右键点击浏览器当前标签页，选择“将这个网站静音”。',
    financial:{
        color: ["#003366", "#006699", "#4cabce"],
        dataset: {
          source: [
            ["type", "2012", "2013", "2014", "2015", "2016"],
            ["充值", 6037744, 2427715, 1701971,1389552, 310064, 100000,0],
            ["提现", 2240940, 1804252, 3017733, 2993741, 726780,3261155,20000.0],
            ["手续费", 0,0,0,0,0,0,0],
          ]
        },
        legend: {},
        xAxis: {
          type: "category",
          axisTick: {
            show: true
          }
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        series: [{
            type: "bar",
            seriesLayoutBy: "row"
          }, {
            type: "bar",
            seriesLayoutBy: "row"
          }, {
            type: "bar",
            seriesLayoutBy: "row"
          }
        ]
      },
      option2:{
        color: ["#003366", "#006699", "#4cabce"],
        dataset: {
          source: [
            ["type", "2012", "2013", "2014", "2015", "2016"],
            ["充值", 6037744, 2427715, 1701971,1389552, 310064, 100000,0],
            ["提现", 2240940, 1804252, 3017733, 2993741, 726780,3261155,20000.0],
            ["手续费", 0,0,0,0,0,0,0],
          ]
        },
        legend: {},
        xAxis: {
          type: "category",
          axisTick: {
            show: true
          }
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        series: [{
            type: "bar",
            seriesLayoutBy: "row"
          }, {
            type: "bar",
            seriesLayoutBy: "row"
          }, {
            type: "bar",
            seriesLayoutBy: "row"
          }
        ]
      }
  }),
  methods:{
  }
})
</script>