<template>
    <div class="p-3">
      <!-- alert -->
      <div class="flex items-center breadcrumb justify-between mb-2">
         <p>Home</p>
         <BIconArrowRepeat/>
      </div>
      <!-- <div class="alert alert-warning">
        <p>
        {{ alert }}
        </p>
      </div>
      <div class="alert alert-info" role="alert">
        <p>
        {{ info }}
        </p>
      </div> -->
      <!-- combobox -->
      <div class="row" v-if="form">
        <div class="col-3 px-[15px]">
          <div class="card border-primary">
            <div class="card-header bg-primary text-white">
              会员总数
            </div>
            <div class="card-body">
              <b id="HomeUserCount">{{form.count}}</b>
            </div>
          </div>
        </div>
        <div class="col-3 px-[15px]" v-if="form">
          <div class="card border-success">
            <div class="card-header bg-success text-white">
              会员总余额
            </div>
            <div class="card-body">
              <b id="HomeUserMoney">{{ form.balance }}</b>
            </div>
          </div>
        </div>
        <div class="col-3 px-[15px]" v-if="form">
          <div class="card border-warning">
            <div class="card-header bg-warning text-white">
              今日订单 / 总额
            </div>
            <div class="card-body">
              <b id="HomeNowOrder">0</b><b id="HomeNowOrderMoney">{{ form.orderCount }}</b>
            </div>
          </div>
        </div>
        <div class="col-3 px-[15px]" v-if="form">
          <div class="card border-info">
            <div class="card-header bg-info text-white">
              盈亏
            </div>
            <div class="card-body">
              <b id="HomeYingKui">{{ form.sum }}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3" v-if="option2">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              财务7天图型报表
            </div>
            <IEcharts ref="chart1"
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
            <IEcharts ref="chart2"
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
import axios from 'axios'
import moment from 'moment'
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
    form:null,
    option2:null,
    date:["type"],
    with:['提现'],
    recharge:['充值'],
    rise:["买涨"],
    low:["买跌"]
  }),
  mounted() {
    this.chartRefs = {
      chart1: this.$refs.chart1,
      chart2: this.$refs.chart2,
    };
    this.getDetail();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods:{
    async getDetail() {
      try {
        const response = await axios.get('/details');
        this.form={
          balance:response.data.balance,
          count:response.data.count,
          orderCount:response.data.orderCount,
          sum:response.data.sum
        }
        let charts = response.data.charts;
        for(let i=charts.length-1;i>=0;i--){
          this.date.push(charts[i].date);
          this.with.push(charts[i].with);
          this.recharge.push(charts[i].recharge);
          this.rise.push(charts[i].rise);
          this.low.push(charts[i].low);
        }
        this.financial={
            color: ["#C23531", "#2F4554", "#61A0A8"],
            dataset: {
              source: [
                [...this.date],
                [...this.recharge],
                [...this.with],
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
        };
        this.option2={
          color: ["#C23531", "#2F4554"],
          dataset: {
            source: [
              [...this.date],
              [...this.rise],
              [...this.low],
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
            }
          ]
        };
      }
      catch (error) {
        console.log(error);
      };
    },
    handleResize() {
      Object.keys(this.chartRefs).forEach((key) => {
        this.chartRefs[key].resize();
      });
    },
  }
})
</script>