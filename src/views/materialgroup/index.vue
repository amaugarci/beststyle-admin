<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
      <MyButton name="培训管理" :active="false"></MyButton>
      <MyButton name="素材分类" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <!-- <input type="text" placeholder="分类ID" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <input type="text" placeholder="分类名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页" ></IconMyButton> -->
      <IconMyButton  v-if="getAdmin.permissions[18]" ref="addbutton"  @onclick="()=>{showAddCate()}" icon="circleplus" name="添加一级分类" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[400px]">分类名称</th>
              <th>分类ID</th>
              <th v-if="getAdmin.permissions[18]" class="w-[272px]">操作</th>
            </tr>
          </thead>
          <tbody style="text-align: start;">
            <template v-for="(item,index) in materialgroups" :key="index">
              <tr>
                <td v-if="getAdmin.permissions[18]" class="text-start pl-[20px]">
                  <div @click="()=>item.visible=!item.visible" class="flex items-center cursor-pointer">
                    <BIconChevronRight v-if="item.children.length&&!item.visible" class="icon text-[10px]"/>
                    <BIconChevronDown v-else-if="item.children.length&&item.visible" class="icon text-[10px]"/>
                    <p class="ml-[10px]">{{ item.name }}</p>
                  </div>
                </td>
                <td>{{item.id}}</td>
                <td  class="flex justify-around items-center text-[#0B88F9]">
                  <button @click="()=>{showAddCate(null,item.id)}">添加下级分类</button>
                  <button @click="()=>{showAddCate(item)}">编辑</button>
                  <button @click="()=>showDeleteTraining(1)">删除</button>
                </td>
              </tr>
              <template v-for="(childItem, childIndex) in item.children" :key="childIndex" >
                  <tr :class="{'hidden':!item.visible}">
                    <td class="text-start pl-[50px]">
                      <div @click="()=>childItem.visible=!childItem.visible" class="flex items-center cursor-pointer">
                        <BIconChevronRight v-if="childItem.children.length&&!childItem.visible" class="icon text-[10px]"/>
                        <BIconChevronDown v-else-if="childItem.children.length&&childItem.visible" class="icon text-[10px]"/>
                        <p class="ml-[10px]">{{ childItem.name }}</p>
                      </div>
                    </td>
                    <td>{{ childItem.id }}</td>
                    <td  v-if="getAdmin.permissions[18]" class="flex justify-around items-center text-[#0B88F9]">
                      <button @click="()=>{showAddCate(null,childItem.id)}">添加下级分类</button>
                      <button @click="()=>{showAddCate(childItem)}">编辑</button>
                      <button @click="()=>showDeleteTraining(1)">删除</button>
                    </td>
                  </tr>
                  <template v-for="(grandChildItem, grandChildIndex) in childItem.children" :key="grandChildIndex">
                    <tr :class="{'hidden':!childItem.visible}">
                      <td class="text-start pl-[80px]">
                        <div @click="()=>grandChildItem.visible=!grandChildItem.visible" class="flex items-center cursor-pointer">
                          <p class="ml-[10px]">{{ grandChildItem.name }}</p>
                        </div>
                      </td>
                      <td>{{ grandChildItem.id }}</td>
                      <td v-if="getAdmin.permissions[18]" class="flex justify-around items-center text-[#0B88F9] pl-[135px]">
                        <button @click="()=>{showAddCate(grandChildItem)}">编辑</button>
                        <button @click="()=>showDeleteTraining(1)">删除</button>
                      </td>
                    </tr>
                  </template>
                </template>
            </template>
          </tbody>
      </table>
    </div>
    <div class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register ref="dialog" :class="{'hidden':!showdialog}"/>
  </template>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat, BIconChevronRight, BIconChevronDown  } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import Notfound from '@/views/notfound/index.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'materialgroup',
  components: {
    BIconArrowRepeat,
    BIconChevronRight, 
    BIconChevronDown,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Notfound
  },
  data:()=>({
    materialgroups:[ ],
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted(){
    this.getMaterialGroups();
  },
  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getMaterialGroups() {
      try {
        const response = await axios.get(`/materialgroups`);
        if(response.data.status==1){
          this.materialgroups = response.data.materialgroups;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[18]!=null){
            return true;
        }
        return false;
    },
    showAddCate(index=null,parent_id=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加一级分类`,
          content: `
              <input type="text" placeholder='分类名称' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goCreate(layero.find('input').val(),parent_id);
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑下级分类`,
          content: `
          <input type="text" placeholder='分类名称' value='${index.name}' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goEdit(layero.find('input').val(), index.id);
            layer.close(i);
          },
        });
      }
    },
    async goCreate(name,parent_id){
      try{
        const response=await axios.post('/creatematerialgroup', {
            name:name,
            parent_id:parent_id
        });
        if(response.status==422){
            this.message='请输素材名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输素材名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goEdit(name,id){
      try{
        const response=await axios.post(`/editmaterialgroup/${id}`, {
            name:name,
        });
        if(response.status==422){
            this.message='请输素材名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输素材名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    showDeleteTraining(index){
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
          layer.close(i);
        },
      });
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
    refresh(){
      this.getMaterialGroups();
    }
  }
})
</script>