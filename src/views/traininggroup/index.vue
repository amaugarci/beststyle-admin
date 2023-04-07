<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="培训管理" :active="false"></MyButton>
       <MyButton name="培训列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" placeholder="分类ID" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <input type="text" placeholder="分类名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
      <IconMyButton ref="addbutton"  @onclick="()=>{showAddCate()}" icon="circleplus" name="添加一级分类" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[400px]">分类名称</th>
              <th>分类ID</th>
              <th class="w-[272px]">操作</th>
            </tr>
          </thead>
          <tbody style="text-align: start;">
            <template v-for="(item,index) in Itemlist" :key="index">
              <tr>
                <td class="text-start pl-[20px]">
                  <div @click="()=>item.visible=!item.visible" class="flex items-center cursor-pointer">
                    <BIconChevronRight v-if="item.children&&!item.visible" class="icon text-[10px]"/>
                    <BIconChevronDown v-else-if="item.children&&item.visible" class="icon text-[10px]"/>
                    <p class="ml-[10px]">{{ item.name }}</p>
                  </div>
                </td>
                <td>{{item.id}}</td>
                <td  class="flex justify-around items-center text-[#0B88F9]">
                  <button @click="()=>{showAddCate()}">添加下级分类</button>
                  <button @click="()=>{showAddCate(1)}">编辑</button>
                  <button @click="()=>showDeleteTraining(1)">删除</button>
                </td>
              </tr>
              <template v-for="(childItem, childIndex) in item.children" :key="childIndex" >
                  <tr :class="{'hidden':!item.visible}">
                    <td class="text-start pl-[50px]">
                      <div @click="()=>childItem.visible=!childItem.visible" class="flex items-center cursor-pointer">
                        <BIconChevronRight v-if="childItem.children&&!childItem.visible" class="icon text-[10px]"/>
                        <BIconChevronDown v-else-if="childItem.children&&childItem.visible" class="icon text-[10px]"/>
                        <p class="ml-[10px]">{{ childItem.name }}</p>
                      </div>
                    </td>
                    <td>{{ childItem.id }}</td>
                    <td  class="flex justify-around items-center text-[#0B88F9]">
                      <button @click="()=>{showAddCate()}">添加下级分类</button>
                      <button @click="()=>{showAddCate(1)}">编辑</button>
                      <button @click="()=>showDeleteTraining(1)">删除</button>
                    </td>
                  </tr>
                  <template v-for="(grandChildItem, grandChildIndex) in childItem.children" :key="grandChildIndex">
                    <tr :class="{'hidden':!childItem.visible}">
                      <td class="text-start pl-[80px]">
                        <div @click="()=>grandChildItem.visible=!grandChildItem.visible" class="flex items-center cursor-pointer">
                          <BIconChevronRight v-if="grandChildItem.children&&!grandChildItem.visible" class="icon text-[10px]"/>
                          <BIconChevronDown v-else-if="grandChildItem.children&&grandChildItem.visible" class="icon text-[10px]"/>
                          <p class="ml-[10px]">{{ grandChildItem.name }}</p>
                        </div>
                      </td>
                      <td>{{ grandChildItem.id }}</td>
                      <td  class="flex justify-around items-center text-[#0B88F9] pl-[135px]">
                        <button @click="()=>{showAddCate(1)}">编辑</button>
                        <button @click="()=>showDeleteTraining(1)">删除</button>
                      </td>
                    </tr>
                  </template>
                </template>
            </template>
          </tbody>
      </table>
    </div>
    <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register ref="dialog" :class="{'hidden':!showdialog}"/>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat, BIconChevronRight, BIconChevronDown  } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'traininggroup',
  components: {
    BIconArrowRepeat,
    BIconChevronRight, 
    BIconChevronDown,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
  },
  data:()=>({
    Itemlist:[
      {
        id:1,
        visible:false,
        name:'养号',
        children:[
          {
            id:11,
            name:'方法',
            visible:false,
            children:[
              {
                id:12,
                name:'关注/持续评论',
                visible:false,
              },
            ]
          },
          
        ]
      }
    ],
  }),
  methods:{
    showAddCate(index=null){
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
            console.log(layero.find('input').val());
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑下级分类`,
          content: `
              <input type="text" placeholder='分类名称' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            console.log(layero.find('input').val());
            layer.close(i);
          },
        });
      }
    },
    showDeleteTraining(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除培训`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          layer.close(i);
        },
      });
    },
  }
})
</script>