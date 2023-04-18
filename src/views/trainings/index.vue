<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-2xl">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
      <MyButton name="培训管理" :active="false"></MyButton>
      <MyButton name="培训列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" v-model="title" placeholder="标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页"  @onclick="getTraining"></IconMyButton>
      <IconMyButton v-if="getAdmin.permissions[10]" ref="addbutton"  @onclick="()=>{showAddTraining()}" icon="circleplus" name="添加培训" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th class="w-[150px]">图片</th>
              <th class="2xl:w-[150px]">标题</th>
              <th>描述</th>
              <th class="2xl:w-[100px]">观众人数</th>
              <th class="2xl:w-[200px]">建组时间</th>
              <th v-if="getAdmin.permissions[10]" class="w-[172px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in trainings" :key="index">
              <td >{{ index+1 }}</td>
              <td  v-if="item">
                <div class="flex justify-center">
                  <img class="w-[140px] h-[200px]" :src="`${VITE_BACKEND_URL}${item.photo}`">
                </div>
              </td>
              <td v-if="item">
              {{ item.title }}
              </td>
              <td class="ql-editor" v-if="item" v-html="item.description">
              </td>
              <td v-if="item">{{item.count}}</td>
              <td v-if="item">
                {{moment().utc(new Date()).local().format("yyyy-MM-DD") }}
              </td>
              <td v-if="getAdmin.permissions[10]&&item" >
                <div class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="()=>goComment(item.id)">评论</button>
                  <button ref="useredit"  @click="()=>{showEditTraining(index)}">编辑</button>
                  <button @click="()=>{showDeleteTraining(item.id)}" >删除</button>
                </div>
              </td>
              <td v-else-if="getAdmin.permissions[10]"></td>
            </tr>
          </tbody>
      </table>
      <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
    <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="trainings[itemid]" />
    <Register @onSuccess="refresh" v-else :class="{'hidden':!showdialog}"  />
  </template>

</template>
<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import Register from './register.vue'
import { mapState, mapActions } from 'pinia'
import Notfound from '@/views/notfound/index.vue'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
export default defineComponent({
name: 'trainings',
components: {
  BIconArrowRepeat,
  IEcharts,
  MyButton,
  IconMyButton,
  Pagination,
  SelectBox,
  Register,
  Notfound
},
data:()=>({
  title:'',
  itemid:null,
  message:'',
  showdialog:false,
  list:Array(15).fill(0),
  currentPage:1,
  totalPage:null,
  index:15,
  trainings:[
  ],
  group:'',
  groups:[
    {
      id:1,
      name:'first'
    },
    {
      id:2,
      name:'twice'
    },
    {
      id:3,
      name:'third'
    }
  ],
  VITE_BACKEND_URL
}),
computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted() {
    this.getTraining();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    showAddTraining(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditTraining(index){
      this.itemid=index;
      this.showdialog=true;
    },
    moment: function () {
      return moment;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getTraining() {
      try {
        const response = await axios.get(`/trainings?page=${this.currentPage}&count=${this.index}&title=${this.title}`);
        if(response.data.status==1){
          this.trainings = response.data.trainings.data;
          this.totalPage=response.data.trainings.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[10]!=null){
            return true;
        }
        return false;
    },
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    showDeleteTraining(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除分组`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteTraining(index);
          layer.close(i);
        },
      });
    },
    async deleteTraining(id) {
      try {
        const response = await axios.get(`/deletetraining/${id}`);
        if(response.data.status==1){
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.refresh();
        }else{
          this.message='网络错误';
          this.showDialog();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    changepage(value){
      this.currentPage=value;
      this.getTraining();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    goComment(value){
      this.$router.push({ name: 'trainingcomments', params: { id:value, }});
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getTraining();
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
}
})
</script>