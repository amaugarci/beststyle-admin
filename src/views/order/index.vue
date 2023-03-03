<template>
  <div class="content grow p-3" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
        <p>订单管理</p>
        <BIconArrowRepeat @click="refresh"/>
    </div>
    <div class="card">
      <!-- <div class="card-header">
        <div class="row">
          <div class="input-group col-4 px-[15px]">
            <div class="input-group-prepend">
              <span class="input-group-text">商品名称</span>
            </div>
            <input type="text" class="form-control" placeholder="" id="GoodsGO">
          </div>
          <div class="input-group col-3 px-[15px]">
            <div class="input-group-prepend">
              <span class="input-group-text">分类</span>
            </div>
            <select class="form-control" id="GoodsGOType">
              <option value="all">全部</option>
              <option value="btc">区块链</option>
              <option value="nf">期货</option>
            </select>
          </div>
          <button class="btn btn-success" onclick="goods.getlist()">搜索</button>
          <button class="btn btn-info ml-3" onclick="br.href('goods')">重置
          </button>
        </div>
      </div> -->
      <table class="table table-hover table-sm mb-0">
        <thead>
          <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>商品</th>
            <th>方向</th>
            <th>买入金额</th>
            <th>买后余额</th>
            <th>建仓价格</th>
            <th>平仓价格</th>
            <th>建仓时间</th>
            <th>平仓时间</th>
            <th>结果</th>
            <th>单控</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in orders" :key="item.id">
            <td>{{ item.id }}</td>
            <th>{{item.player.name}}</th>
            <th>{{item.symbol.name}}</th>
            <th v-if="item.dir" class="textDanger">买涨</th>
            <th v-else class="textSuccess">买跌</th>
            <th>{{item.money}}</th>
            <th>{{Number(item.totalBalance)-Number(item.money)}}</th>
            <th class="textSuccess">{{item.price}}</th>
            <th class="textDanger">{{item.lastprice}}</th>
            <th>{{moment().utc(new Date(Number(item.time))).local().format("MM-DD hh:mm:ss") }}</th>
            <th>{{moment().utc(new Date(Number(item.lasttime))).local().format("MM-DD hh:mm:ss") }}</th>
            <th v-if="item.status==1&&item.during==180" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[0])}}</th>
            <th v-else-if="item.status==1&&item.during==300" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[1])}}</th>
            <th v-else-if="item.status==2&&item.during==600" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[2])}}</th>
            <th v-else-if="item.status==2&&item.during==180" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[0])}}</th>
            <th v-else-if="item.status==2&&item.during==300" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[1])}}</th>
            <th v-else-if="item.status==2&&item.during==600" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[2])}}</th>
            <th v-else>-</th>
            <th v-if="item.status==0">过程</th>
            <th v-else>已结算</th>
          </tr>
      </tbody>
    </table>
  </div>
</div></template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
import './app.css'
export default defineComponent({
  name: 'order',
  components: {
    BIconArrowRepeat
  },
  data: () => ({
    orders:null
  }),
  mounted(){
    this.getOrders();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getOrders() {
      try {
        const response = await axios.get('/orders');
        this.orders = response.data.orders;
      }
      catch (error) {
        console.log(error);
      };
    },
    refresh(){
      this.orders=null;
      this.getOrders();
    },
    showDialog(){
      layer.config({
        skin: 'login-class'
      })
      layer.open({
          type:1,
          offset:'b',
          title:false,
          content: '无效的参数',
          closeBtn: 0,
          shadeClose:1,
      });
    },
  }
})
</script>