<template>
  <div class="content grow p-3" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
        <p>商品管理</p>
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
            <th width="80">排序</th>
            <th>名称</th>
            <th>Display名称</th>
            <th>商品名称</th>
            <th width="130">盈利比率</th>
            <th width="130">亏损比率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in symbols" :key="item.id">
            <td><input type="text" class="form-control form-control-sm" v-model="item.sort"></td>
            <td>{{ item.name }}</td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.displayName"></td>
            <td>{{ item.productName }}</td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.profitRatio"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.lossRatio"></td>
            <td><button class="btn btn-success btn-sm" @click="save(index)">保存</button></td>
          </tr>
      </tbody>
    </table>
  </div>
</div></template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import axios from 'axios'
export default defineComponent({
  name: 'commodity',
  components: {
    BIconArrowRepeat
  },
  data: () => ({
    symbols:null
  }),
  mounted(){
    this.getSymbols();
  },
  methods: {
    async getSymbols() {
      try {
        const response = await axios.get('/symbols');
        this.symbols = response.data.symbols;
      }
      catch (error) {
        console.log(error);
      };
    },
    refresh(){
      this.symbols=null;
      this.getSymbols();
    },
    async save(index) {
      try {
        if(this.validation(index)){
          const response=await axios.post(`/updatesymbol/${this.symbols[index].id}`, {
              displayName:this.symbols[index].displayName,
              profitRatio:this.symbols[index].profitRatio,
              lossRatio:this.symbols[index].lossRatio,
          });
          if(response.data.status==0){
            this.showDialog();
          }else{
            this.showSucss();
          }
        }else{
          this.showDialog();
        }
      }
      catch (error) {
        this.showDialog();
      };
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
    showSucss(){
      layer.config({
        skin: 'success-class'
      })
      layer.open({
        title:false,
        content: '成功',
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
      });
    },
    validation(index){
        if(this.symbols[index].displayName==''||
          this.symbols[index].profitRatio.split(',').length!=3||
          this.symbols[index].lossRatio.split(',').length!=3){
            return false;
        }
        return true;
    },
  }
})
</script>