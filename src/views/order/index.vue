<template>
  <div class="content grow p-3" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
        <p>订单管理</p>
        <BIconArrowRepeat @click="refresh"/>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="input-group col-4 px-[15px]">
            <div class="input-group-prepend">
              <span class="input-group-text">用户帐号</span>
            </div>
            <input type="text" class="form-control" placeholder="" v-model="name">
          </div>
          <button class="btn btn-success" @click="filter">搜索</button>
          <button class="btn btn-info ml-3" @click="()=>name=''">重置
          </button>
        </div>
      </div>
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
            <th>风控</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in orders" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{item.player.realname}}-{{ item.player.name }}</td>
            <td>{{item.symbol.displayName}}</td>
            <td v-if="item.dir" class="textDanger">买涨</td>
            <td v-else class="textSuccess">买跌</td>
            <td>{{item.money}}</td>
            <td>{{Number(item.totalBalance)-Number(item.money)}}</td>
            <td class="textSuccess">{{item.price}}</td>
            <td v-if="item.lastprice!='-'" class="textDanger">{{item.lastprice}}</td>
            <td v-else class="">-</td>
            <td>{{moment().utc(new Date(Number(item.time))).local().format("MM-DD HH:mm:ss") }}</td>
            <td>{{moment().utc(new Date(Number(item.lasttime))).local().format("MM-DD HH:mm:ss") }}</td>
            <td v-if="item.status==1&&item.during==180" class="textDanger">-{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[0])).toFixed(2)}}</td>
            <td v-else-if="item.status==1&&item.during==300" class="textDanger">-{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[1])).toFixed(2)}}</td>
            <td v-else-if="item.status==1&&item.during==600" class="textDanger">-{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[2])).toFixed(2)}}</td>
            <td v-else-if="item.status==2&&item.during==180" class="textSuccess">{{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[0])).toFixed(2)}}</td>
            <td v-else-if="item.status==2&&item.during==300" class="textSuccess">{{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[1])).toFixed(2)}}</td>
            <td v-else-if="item.status==2&&item.during==600" class="textSuccess">{{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[2])).toFixed(2)}}</td>
            <td v-else-if="item.status==3" class="textSuccess">0</td>
            <td v-else>-</td>
            <td v-if="item.status==0">过程</td>
            <td v-else>已结算</td>
            <td v-if="item.status==0"><select class="form-control form-control-sm" @change="updateOrder(index)" v-model="item.vstatus">
                <option value="0">未操作</option>
                <option value="1" selected="">必赢</option>
                <option value="2">必输</option>
              </select>
            </td>
            <td v-else-if="item.vstatus==0">
              未操作
            </td>
            <td v-else-if="item.vstatus==1">
              必赢
            </td>
            <td v-else>
              必输
            </td>
          </tr>
        </tbody>
      </table>
  </div>
  <div v-if="totalitem>1" class="flex items-center justify-center mt-[20px]">
    <vue-awesome-paginate
      :total-items='totalitem*15'
      :items-per-page="15"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</div></template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import {notifyStore} from '@/pinia/modules/notificationStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'order',
  components: {
    BIconArrowRepeat
  },
  data: () => ({
    orders:null,
    message:'',
    name:'',
    currentPage:1,
    totalitem:0,
  }),
  mounted(){
    this.getOrders();
    this.deleteOrder();
  },
  methods: {
    filter(){
      this.histories=null;
      this.currentPage==0;
      this.getOrders();
    },
    ...mapActions(notifyStore, ['deleteOrder']),
    async updateOrder(index) {
      try{
          const response=await axios.post(`/updateOrder/${this.orders[index].id}`, {
              vstatus:this.orders[index].vstatus,
          });
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
          }else{
            this.message=response.data.message;
            this.showDialog();
            this.refresh();
          }
      }
      catch(error) {
        this.message='出现意想不到的问题';
          this.showDialog();
      };
    },
    moment: function () {
      return moment;
    },
    onClickHandler(value){
      this.currentPage=value;
      this.getOrders();
    },
    async getOrders() {
      try {
        const response = await axios.get(`/orders?name=${this.name}&page=${this.currentPage}`);
        this.orders = response.data.orders.data;
        this.totalitem=response.data.orders.last_page;
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
          content: this.message,
          closeBtn: 0,
          shadeClose:1,
      });
    },
  }
})
</script>