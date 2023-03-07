<template>
  <div class="content grow p-3">
    <div class="flex items-center breadcrumb justify-between mb-2">
      <p>系统设置</p>
      <BIconArrowRepeat @click="refresh" />
    </div>
    <div class="card" style="width: 50rem">
      <div class="card-header">Config</div>
      <table class="table table-hover table-sm mb-0" v-if="system">
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody id="SysList">
          <tr>
            <td>网站名称</td>
            <td><input type="text" name="web_name" v-model="system.title" class="form-control"></td>
          </tr>
          <tr>
            <td>最小提现金额</td>
            <td><input type="text" name="web_cash_min" v-model="system.minwithdrawal" class="form-control"></td>
          </tr>
          <tr>
            <td>最大提现金额</td>
            <td><input type="text" name="web_cash_max" v-model="system.maxwithdrawal" class="form-control"></td>
          </tr>
          <tr>
            <td>提现手续费(%)</td>
            <td><input type="text" name="web_cash_fee" v-model="system.withdrawPercent" class="form-control"></td>
          </tr>
          <tr>
            <td>在线客服链接</td>
            <td><input type="text" name="web_kefu_url"
              v-model="system.url"
                class="form-control"></td>
          </tr>
          <tr>
            <td>投注手续费(%)</td>
            <td><input type="text" name="web_order_fee" v-model="system.bettingPercent" class="form-control"></td>
        </tr>
        <tr>
          <td>最小投注金额</td>
          <td><input type="text" name="web_order_min" v-model="system.minbetting" class="form-control"></td>
        </tr>
        <tr>
          <td>最大投注金额</td>
          <td><input type="text" name="web_order_max" v-model="system.maxbetting" class="form-control"></td>
        </tr>
        <tr>
          <td>当天最大投注金额</td>
          <td><input type="text" name="web_order_daymax" v-model="system.maxdaybetting" class="form-control"></td>
        </tr>
        <tr>
          <td>金额符号</td>
          <td><input type="text" name="web_money_symbol" v-model="system.symbol" class="form-control"></td>
        </tr>
        <tr>
          <td>提现时间10-22为早上10点到晚上22点</td>
          <td><input type="text" name="user_cash_time" v-model="system.withdrawaltime" class="form-control"></td>
        </tr>
        <tr>
          <td>每日最多提现次数</td>
          <td><input type="text" name="user_cash_number" v-model="system.daywithdrawalcount" class="form-control"></td>
        </tr>
        <tr>
          <td>开盘时间9点到23点</td>
          <td><input type="text" name="open_time" v-model="system.workingtime" class="form-control"></td>
        </tr>
      </tbody>
      </table>
      <div class="card-footer">
        <button class="btn btn-success" @click="save()">保存</button>
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconArrowRepeat } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'system',

  components: {
    BIconArrowRepeat,
  },
  data: () => ({
    system:null
  }),
  mounted() {
    this.getSystem();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getSystem() {
      try {
        const response = await axios.get('/system');
        this.system = response.data.system;
      }
      catch (error) {
        console.log(error);
      };
    },
    async save(){
      try{
          const response=await axios.post(`/updatesystem`, {
              ...this.system
          });
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
      this.getSystem()
    },
    showDialog() {
      layer.config({
        skin: 'login-class'
      })
      layer.open({
        type: 1,
        offset: 'b',
        title: false,
        content: '无效的参数',
        closeBtn: 0,
        shadeClose: 1,
      });
    },
  }
})
</script>