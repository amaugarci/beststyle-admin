<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
      <MyButton name="人物包装" :active="false"></MyButton>
      <MyButton name="包装列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input v-model="title" type="text" placeholder="标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页"  @onclick="getCharacters"></IconMyButton>
      <IconMyButton v-if="getAdmin.permissions[20]" ref="addbutton"  @onclick="showAddCharacter" icon="circleplus" name="添加包装" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th class="w-[150px]">图片</th>
              <th>标题</th>
              <th>描述</th>
              <th>包装人数</th>
              <th>分类名称</th>
              <th>建组时间</th>
              <th v-if="getAdmin.permissions[20]" class="w-[172px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td class="flex justify-center" v-if="characters[index]">
                <img class="w-[140px] h-[200px]" :src="`${VITE_BACKEND_URL}${characters[index].photo}`">
              </td>
              <td v-else></td>
              <td v-if="characters[index]">
              {{ characters[index].title }}
              </td>
              <td v-else></td>
              <td class="ql-editor" v-if="characters[index]" v-html="characters[index].description">
              </td>
              <td v-else></td>
              <td v-if="characters[index]">{{characters[index].count}}</td>
              <td v-else></td>
              <td v-if="characters[index]">{{characters[index].character_group.name}}</td>
              <td v-else></td>
              <td v-if="characters[index]">
                {{moment().utc(new Date()).local().format("yyyy-MM-DD") }}
              </td>
              <td v-else></td>
              <td v-if="getAdmin.permissions[20]&&characters[index]" >
                <div class="flex justify-around items-center text-[#0B88F9]">
                  <button  @click="()=>goComment(characters[index].id)">评论</button>
                  <button  @click="()=>{showEditCharacter(index)}">编辑</button>
                  <button @click="()=>{showDeleteGroup(1)}" >删除</button>
                </div>
              </td>
              <td v-else-if="getAdmin.permissions[20]"></td>
            </tr>
          </tbody>
      </table>
      <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
    <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="characters[itemid]" />
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
name: 'characters',
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
  VITE_BACKEND_URL,
  showdialog:false,
  list:Array(15).fill(0),
  currentPage:1,
  totalPage:null,
  index:15,
  itemid:null,
  message:'',
  title:'',
  characters:[
  ],
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted() {
    this.getCharacters();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    showAddCharacter(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditCharacter(index){
      this.itemid=index;
      this.showdialog=true;
    },
    moment: function () {
      return moment;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getCharacters() {
      try {
        const response = await axios.get(`/characters?page=${this.currentPage}&count=${this.index}&title=${this.title}`);
        if(response.data.status==1){
          this.characters = response.data.characters.data;
          this.totalPage=response.data.characters.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[20]!=null){
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
      title:`删除分组`,
      content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
      btn:['确定','取消'],
      closeBtn: 0,
      shadeClose: 1,
      yes: (i, layero) => {
        layer.close(i);
        this.deleteCharacter(index);
      },
    });
  },
  async deleteCharacter(id) {
      try {
        const response = await axios.get(`/deletecharacter/${id}`);
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
    this.getCharacters();
  },
  onchangePage(value){
      this.index=value;
      this.changepage(1);
      this.list=Array(Number(value)).fill(0);
  },
  refresh(){
    this.showdialog=false;
    this.currentPage=1;
    this.getCharacters();
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
  goComment(value){
      this.$router.push({ name: 'charactercomments', params: { id:value, }});
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