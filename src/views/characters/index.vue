<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="人物包装" :active="false"></MyButton>
       <MyButton name="包装分类" :active="true"></MyButton>
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
                      <td  class="flex justify-around items-center text-[#0B88F9]">
                        <button ref="cateadd" @click="addlast(1)" >添加下级分类</button>
                        <button @click="()=>{showAddCate(1)}">编辑</button>
                        <button @click="()=>showDeleteTraining(1)">删除</button>
                      </td>
                    </tr>
                    <template v-for="(ggrandChildItem, ggrandChildIndex) in grandChildItem.children" :key="ggrandChildIndex">
                      <tr :class="{'hidden':!grandChildItem.visible}">
                        <td class="text-start pl-[110px]">{{ ggrandChildItem.name }}</td>
                        <td>{{ ggrandChildItem.id }}</td>
                        <td  class="flex justify-around items-center text-[#0B88F9]">
                          <button class="invisible" >添加下级分类</button>
                          <button ref="cateedit" @click="editlast(1)" >编辑</button>
                          <button @click="()=>showDeleteTraining(1)">删除</button>
                        </td>
                      </tr>
                    </template>
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
import Register from './register.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'characters',
  components: {
    BIconArrowRepeat,
    BIconChevronRight, 
    BIconChevronDown,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Register
  },
  data:()=>({
    showdialog:false,
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
                children:[
                  {
                    id:13,
                    name:'最新养号方法',
                    description:'上号前必须关闭手机定位（必须检查手机定位是否关闭检查网络是否有连错。1.快手、抖音、西瓜视频上号后必须刷视频完播率（完播率是指一个视频播放完，必须手动下滑到下一个视频），刷1个小时以上，每天刷两三个小时。第一天不允许修改任何资料，第二天设置一下头像和昵称，并且发一个作品（作品发风景、物品、美食等，禁止发美女和带有色情等违规作品），作品不能频繁发，其它资料再后期一天一天慢慢修改一点。（前三五天每天都要刷一个小时以上，后期可以下班吃饭时间挂着刷直播）前7天不能私聊所以也不要去挂住别人，可以评论和点赞。好养好后每天私聊不能超过3个（并且不能在同一时间新同时新增私聊）。快手抖音上号后需要设置关闭自己喜欢的作品、关闭允许查看关注的人和粉丝。',
                    count:569,
                    date:'2023-03-24',
                    visible:false,
                  }
                ]
              },
            ]
          },
          
        ]
      }
    ],
  }),
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    handleClickOutside(event) {
      if(this.showdialog){
        if((this.$refs.cateadd && `${this.$refs.cateadd[0]}`==`${event.target}`)||(this.$refs.cateedit && this.$refs.cateedit[0].contains(event.target))|| this.$refs.dialog.$el.contains(event.target)){
        }else{
          let isSvg = event.target instanceof SVGElement;
          if(!isSvg){
            this.showdialog=false;
          }
        }
      }
    },
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
          title:`添加下级分类`,
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
    editlast(value){
      this.showdialog=true
    },
    addlast(value){
      this.showdialog=true
    }
  }
})
</script>