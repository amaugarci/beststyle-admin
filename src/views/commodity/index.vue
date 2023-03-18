<template>
  <div class="content grow p-3" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
        <p>商品管理</p>
        <BIconArrowRepeat @click="refresh"/>
    </div>
    <div class="card">
      <div class="card-header">
        <button class="btn btn-success btn-sm" @click="() => {
          showdialog = true;
          form={
            UID:'',
            sort: null,
            name: '',
            displayName: '',
            productName: '',
            profitRatio:'',
            lossRatio:''
          }
        }">添加</button>
      </div>
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
            <th>展示名称</th>
            <th>商品名称</th>
            <th width="130">盈利比率</th>
            <th width="130">亏损比率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in symbols" :key="item.id">
            <td><input type="number" class="form-control form-control-sm" v-model="item.sort"></td>
            <td>{{ item.name }}</td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.displayName"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.productName"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.profitRatio"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="item.lossRatio"></td>
            <td>
              <button class="btn btnSuccess btn-sm mr-2" @click="save(index)">保存</button>
              <button class="btn btnDanger btn-sm" @click="showDeleteSymbol(index)">拒绝</button>
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
  <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
  </div>
  <div
    class="z-[99999] w-[400px] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-[10px] bg-[#fff] rounded-[5px]"
    v-if="showdialog">
    <div class="flex flex-row justify-between w-full items-center p-3">
      <p>添加</p>
      <BIconX class="text-[20px]" @click="() => showdialog = false" />
    </div>
    <div class="border-t-[1px] p-3">
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.UID" placeholder="UID">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="number" class="form-control" v-model="form.sort" placeholder="排序">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.name" placeholder="名称">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.displayName" placeholder="展示名称">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.productName" placeholder="商品名称">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.profitRatio" placeholder="盈利比率">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="text" class="form-control" v-model="form.lossRatio" placeholder="亏损比率">
      </div>
      <button class="btn btn-success btn-block w-full" @click="createSymbol()">保存</button>
    </div>
  </div>
</div></template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat,BIconX } from 'bootstrap-icons-vue';
import axios from 'axios'
export default defineComponent({
  name: 'commodity',
  components: {
    BIconArrowRepeat,
    BIconX
  },
  data: () => ({
    currentPage:1,
    totalitem:0,
    symbols:null,
    message:'',
    showdialog: false,
    form: {
      UID:'',
      sort: null,
      name: '',
      displayName: '',
      productName: '',
      profitRatio:'',
      lossRatio:''
    }
  }),
  mounted(){
    this.getSymbols();
  },
  methods: {
    showDeleteSymbol(index) {
      layer.config({
        skin: ''
      })
      layer.open({
        title: `删除硬币`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn: ['确定', '取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteSymbol(index);
          layer.close(i);
          this.refresh();
        },
      });
    },
    async deleteSymbol(index) {
      try {
        const response = await axios.get(`/symboldelete/${this.symbols[index].id}`);
        if (response.data.status == 1) {
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.refresh();
        } else {
          this.showDialog();
        }
      }
      catch (error) {
        this.showDialog();
      };
    },
    async getSymbols() {
      try {
        const response = await axios.get(`/symbols?page=${this.currentPage}`);
        this.symbols = response.data.symbols.data;
        this.totalitem=response.data.symbols.last_page;
      }
      catch (error) {
        console.log(error);
      };
    },
    onClickHandler(value){
      this.currentPage=value;
      this.getSymbols();
    },
    refresh(){
      this.symbols=null;
      this.getSymbols();
    },
    async save(index) {
      try {
        if(this.validation(index)){
          const response=await axios.post(`/updatesymbol/${this.symbols[index].id}`, {
              sort:this.symbols[index].sort,
              displayName:this.symbols[index].displayName,
              productName:this.symbols[index].productName,
              profitRatio:this.symbols[index].profitRatio,
              lossRatio:this.symbols[index].lossRatio,
          });
          if(response.data.status==0){
            this.message=response.data.message;
            this.showDialog();
          }else{
            this.showSucss();
          }
        }else{
          this.showDialog();
        }
      }
      catch (error) {
        this.message='出现意想不到的问题';
        this.showDialog();
      };
    },
    async createSymbol() {
      if(this.createValidation()){
        try {
          const response = await axios.post(`/createSymbol`, {
            ...this.form
          });
          if (response.data.status == 1) {
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.showdialog = false;
            this.refresh();
          } else {
            this.message=response.data.message;
            this.showDialog();
          }
        }
        catch (error) {
          this.message='出现意想不到的问题';
          this.showDialog();
        };
      }else{
        this.showDialog();
      }
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
    createValidation(){
        if(this.form.UID==''||this.form.name==''||this.form.displayName==''||this.form.productName==''||this.form.sort==null||this.form.profitRatio==''||this.form.lossRatio==''){
          this.message='请填写所有值';
          return false;
        }
        if(this.form.profitRatio.split(',').length!=3){
          this.message='盈利比率无效';
          return false;
        }
        if(this.form.lossRatio.split(',').length!=3){
          this.message='亏损比率无效';
          return false;
        }
        return true;
    },
    validation(index){
        if(this.symbols[index].displayName==''||this.symbols[index].productName==''){
          this.message='请填写所有值';
          return false;
        }
        if(this.symbols[index].profitRatio.split(',').length!=3){
          this.message='盈利比率无效';
          return false;
        }
        if(this.symbols[index].lossRatio.split(',').length!=3){
          this.message='亏损比率无效';
          return false;
        }
        return true;
    },
  }
})
</script>