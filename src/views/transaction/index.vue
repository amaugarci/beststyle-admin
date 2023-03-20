<template>
  <div class="content grow p-3" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
        <p> 财务管理 </p>
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
            <th>ID</th>
            <th>UID</th>
            <th>帐号</th>
            <th>姓名</th>
            <th>类型</th>
            <th>金额</th>
            <th>到账后金额</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in histories" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.player.id }}</td>
            <td>{{ item.player.name }}</td>
            <td>{{item.player.realname}}</td>
            <td v-if="item.type==3">
              订单
            </td>
            <td v-else-if="item.type>3&&item.type<7">
              结算
            </td>
            <td v-else-if="item.type==7">
              充值
            </td>
            <td v-else-if="item.type==8">
              管理员充值
            </td>
            <td v-else-if="item.type==9">
              管理员提现
            </td>
            <td v-else-if="item.type==10">
              活动赠送
            </td>
            <td v-else-if="item.type==2" class="textDanger">
              提现
            </td>
            <td v-else>
              提现
            </td>
            <td v-if="item.type==1||item.type==3||item.type==9" class="textDanger">
              -{{ Math.abs(Number(item.changebalance)) }}
            </td>
            <td v-else class="textSuccess">
              +{{ Math.abs(Number(item.changebalance)) }}
            </td>
            <td>余额: {{ item.lastbalance }}</td>
            <td >
              {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD hh:mm") }}
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
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import {notifyStore} from '@/pinia/modules/notificationStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'financial',
  components: {
    BIconArrowRepeat
  },
  data: () => ({
    histories:null,
    index:0,
    currentPage:1,
    totalitem:0,
  }),
  computed:{
    ...mapState(useAuthStore, ['getSystem']),
  },
  mounted(){
    this.getTransaction();
  },
  methods: {
    moment: function () {
      return moment;
    },
    onClickHandler(value){
      this.currentPage=value;
      this.getTransaction();
    },
    async getTransaction() {
      try {
        const response = await axios.get(`transaction/${this.index}?page=${this.currentPage}`);
        this.histories = response.data.histories.data;
        this.totalitem=response.data.histories.last_page;
      }
      catch (error) {
        console.log(error);
      };
    },
    refresh(){
      this.histories=null;
      this.currentPage==0;
      this.getTransaction();
    }
  }
})
</script>