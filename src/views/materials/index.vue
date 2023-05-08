<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
      <MyButton name="素材管理" :active="false"></MyButton>
      <MyButton name="素材列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <SelectBox placeholder="一级分类" :groups="categorys1" :group="category1_id" class="w-[200px]" @onchange="(value)=>{selectCategory1(value)}"/>
      <SelectBox placeholder="二级分类" :groups="categorys2" :group="category2_id" class="w-[200px]" @onchange="(value)=>{selectCategory2(value)}"/>
      <SelectBox placeholder="三级分类" :groups="categorys3" :group="material_group_id" class="w-[200px]" @onchange="(value)=>{material_group_id=value}"/>
      <input v-model="title" type="text" placeholder="标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页" @onclick="getMaterials"></IconMyButton>
      <IconMyButton v-if="getAdmin.permissions[18]" ref="addbutton"  @onclick="()=>{showAddMaterial()}" icon="circleplus" name="添加培训" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th class="w-[150px]">图片</th>
              <th>标题</th>
              <th class="2xl:w-[80px]">分类</th>
              <th class="2xl:w-[80px]">1分类</th>
              <th class="2xl:w-[80px]">2分类</th>
              <th>描述</th>
              <th>观众人数</th>
              <th>建组时间</th>
              <th v-if="getAdmin.permissions[18]" class="w-[172px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in materials" :key="item.id">
              <td >{{ index+1 }}</td>
              <td >
                <div class="flex justify-center relative">
                  <img class="w-[140px] h-[200px]" :src="VITE_BACKEND_URL + item.thumb">
                  <BIconPlayFill v-if="item.type==2" class="text-white text-[40px] absolute top-[80px] "/>
                </div>
              </td>
              
              <td>
              {{ item.title }}
              </td>
              <td>
               {{ item.material_group.name }}
              </td>
              <td>
                {{ item.material_group.parent.name }}
              </td>
              <td>
                {{ item.material_group.parent.parent.name }}
              </td>
              <td >
                <div class="ql-editor max-w-[1100px]" v-html="item.description" contenteditable="true"></div>
              </td>
              
              <td>{{item.viewers}}</td>
              
              <td>
                {{moment().utc(new Date()).local().format("yyyy-MM-DD") }}
              </td>
              
              <td v-if="getAdmin.permissions[18]&&item" >
                <div class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="showEditMaterial(index)">编辑</button>
                  <button @click="()=>{showDeleteGroup(index)}" >删除</button>
                </div>
              </td>
              <td v-else-if="getAdmin.permissions[18]"></td>
            </tr>
          </tbody>
      </table>
      <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
    <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="materials[itemid]" />
    <Register @onSuccess="refresh" v-else :class="{'hidden':!showdialog}"  />
  </template>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat,BIconPlayFill } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import Notfound from '@/views/notfound/index.vue'
import Register from './register.vue'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;

export default defineComponent({
  name: 'materials',
  components: {
    BIconArrowRepeat,
    BIconPlayFill,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Register,
    Notfound
  },
  data:()=>({
    VITE_BACKEND_URL,
    showdialog:false,
    list:Array(15).fill(0),
    currentPage:1,
    itemid:null,
    totalPage:null,
    index:15,
    categorys1: [],
    categorys2: [],
    categorys3: [],
    material_group_id: '',
    category2_id: '',
    category1_id: '',
    materials:[
    ],
    title:'',
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  watch: {
    categorys1: function (newVal, oldVal) {
      this.selectCategory1(this.category1_id);
    },
    categorys2: function (newVal, oldVal) {
      this.selectCategory2(this.category2_id);
    }
  },
  mounted() {
    this.getMaterials();
    this.getList();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    showAddMaterial(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditMaterial(index){
      this.itemid=index;
      this.showdialog=true;
    },
    moment: function () {
      return moment;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getMaterials() {
      try {
        const response = await axios.get(`/materials?page=${this.currentPage}&count=${this.index}&title=${this.title}&category1_id=${this.category1_id}&category2_id=${this.category2_id}&material_group_id=${this.material_group_id}`);
        if(response.data.status==1){
          this.materials = response.data.materials.data;
          this.totalPage=response.data.materials.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    async getList() {
      try {
        const response = await axios.get(`/materiallist`);
        if (response.data.status == 1) {
          this.categorys1 = response.data.materialgroups;
        } else {
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    selectCategory1(value) {
      this.category1_id = value;
      for (let i = 0; i < this.categorys1.length; i++) {
        if (this.categorys1[i].id == value) {
          this.categorys2 = this.categorys1[i].children;
          return;
        } else if (i == this.categorys1.length - 1) {
          this.category2_id = '';
          this.material_group_id = '';
        }
      }
    },
    selectCategory2(value) {
      this.category2_id = value;
      if (this.categorys2.length == 0) {
        this.category2_id = '';
        this.material_group_id = '';
      } else {
        for (let i = 0; i < this.categorys2.length; i++) {
          if (this.categorys2[i].id == value) {
            this.categorys3 = this.categorys2[i].children;
            return;
          } else if (i == this.categorys2.length - 1) {
            this.category2_id = '';
            this.material_group_id = '';
          }
        }
      }
    },
    isAvailable(){
        if(this.getAdmin.permissions[18]!=null){
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
  showDeleteGroup(index){
    layer.config({
      skin: ''
    })
    layer.open({
      title:`删除素材`,
      content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
      btn:['确定','取消'],
      closeBtn: 0,
      shadeClose: 1,
      yes: (i, layero) => {
        this.deleteMaterial(index);
        layer.close(i);
      },
    });
  },
  async deleteMaterial(index) {
    try {
      const response = await axios.get(`/deletematerial/${this.materials[index].id}`);
      if(response.data.status==1){
        layer.config({
          skin: ''
        })
        layer.msg("操作成功");
        this.materials.splice(index,1);
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
    this.getMaterials();
  },
  onchangePage(value){
      this.index=value;
      this.changepage(1);
      this.list=Array(Number(value)).fill(0);
  },
  refresh(){
    this.showdialog=false;
    this.currentPage=1;
    this.getMaterials();
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