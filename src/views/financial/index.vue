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
            <th>ID</th>
            <th>UID</th>
            <th>帐号</th>
            <th>姓名</th>
            <th>Phone</th>
            <th>类型</th>
            <th>到帐金额</th>
            <th>当前金额</th>
            <th>后金额</th>
            <th>备注</th>
            <th>时间</th>
            <th>状态</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in payments" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.player.id }}</td>
            <td>{{ item.player.name }}</td>
            <td>{{item.player.realname}}</td>
            <td v-if="item.player.bank">{{item.player.bank.phonenumber}}</td>
            <td v-else>-</td>
            <td v-if="item.dir">充值</td>
            <td v-else>提现</td>
            <td>{{item.amount}}</td>
            <td>{{item.player.cash_amount}}</td>
            <td v-if="item.status==0&&item.dir">{{Number(item.lastprice)+Number(item.amount)}}</td>
            <td v-else-if="item.status==0&&!item.dir">{{Number(item.lastprice)-Number(item.amount)*(1+Number(getSystem.witddrawPercent)/100)}}</td>
            <td v-else>{{ item.player.cash_amount}}</td>
            <td v-if="item.status==4">管理员操作充值</td>
            <td v-else>用户员操作</td>
            <td>{{moment().utc(new Date(item.created_at)).local().format("MM-DD hh:mm:ss") }}</td>
            <td v-if="item.status==0">
              <button class="btn btnSuccess btn-sm mr-2" @click="showConformPayment(index)">符合</button>
              <button
                class="btn btnDanger btn-sm" @click="showRejectPayment(index)">拒绝</button>
            </td>
            <td v-else-if="item.status==1" class="text-[#dc3545]">拒绝</td>
            <td v-else>已通过</td>
            <td>
              <button @click="showDeletePayment(index)" class="btn btnDanger btn-sm">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
    payments:null
  }),
  computed:{
    ...mapState(useAuthStore, ['getSystem']),
  },
  mounted(){
    this.getPayments();
    this.deletePayments();
  },
  methods: {
    ...mapActions(notifyStore, ['deletePayments']),
    moment: function () {
      return moment;
    },
    async getPayments() {
      try {
        const response = await axios.get('/payments');
        this.payments = response.data.payments;
      }
      catch (error) {
        console.log(error);
      };
    },
    showConformPayment(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除符合`,
        content: `删除符合【${this.payments[index].id}】？`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.conform(index);
          layer.close(i);
        },
      });
    },
    showRejectPayment(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除拒绝`,
        content: `删除拒绝【${this.payments[index].id}】？`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.reject(index);
          layer.close(i);
        },
      });
    },
    showDeletePayment(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除记录`,
        content: `立即删除【${this.payments[index].id}】？`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.delete(index);
          layer.close(i);
        },
      });
    },
    async conform(index) {
      try{
          const response=await axios.get(`/conformpayment/${this.payments[index].id}`);
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.refresh();
          }else{
              this.showDialog();
          }
      }
      catch(error) {
          this.showDialog();
      };
    },
    async reject(index) {
      try{
          const response=await axios.get(`/rejectpayment/${this.payments[index].id}`);
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.refresh();
          }else{
              this.showDialog();
          }
      }
      catch(error) {
          this.showDialog();
      };
    },
    async delete(index) {
      try{
          const response=await axios.get(`/deletepayment/${this.payments[index].id}`);
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.refresh();
          }else{
              this.showDialog();
          }
      }
      catch(error) {
          this.showDialog();
      };
    },
    refresh(){
      this.orders=null;
      this.getPayments();
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