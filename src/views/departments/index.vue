<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="max-w-[1200px]">
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="分组管理" :active="false"></MyButton>
        <MyButton name="分组列表" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" placeholder="部门名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[5]" ref="addbutton"  @onclick="()=>showAddDepartment()" icon="circleplus" name="添加部门" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>部门名称</th>
                <th>建组时间</th>
                <th class="w-[172px]" v-if="getAdmin.permissions[5]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="departments[index]">{{departments[index].name}}</td>
                <td v-else></td>
                <td v-if="departments[index]">{{moment().utc(new Date(departments[index].created_at)).local().format("yyyy-MM-DD") }}</td>
                <td v-else></td>
                <td v-if="getAdmin.permissions[5]&&departments[index]" class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="showAddDepartment(index)">编辑</button>
                  <button @click="()=>{showDeleteGroup(departments[index].id)}" >删除</button>
                </td>
                <td v-else-if="getAdmin.permissions[5]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
    </div>
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
import Notfound from '@/views/notfound/index.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'departments',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Notfound
  },
  data:()=>({
    list:Array(15).fill(0),
    message:'',
    departments:[],
    currentPage:1,
    totalPage:null,
    index:15,
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
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted(){
    this.getDepartments();
  },
  methods:{
    moment: function () {
        return moment;
    },
    showAddDepartment(index=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加部门`,
          content: `
              <input type="text" placeholder='部门名称' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goCreate(layero.find('input').val());
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑部门`,
          content: `
              <input type="text" placeholder='部门名称' value='${this.departments[index].name}' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goEdit(layero.find('input').val(),this.departments[index].id);
            layer.close(i);
          },
        });
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
          this.deleteDepartment(index);
          layer.close(i);
        },
      });
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getDepartments() {
      try {
        const response = await axios.get(`/departments?page=${this.currentPage}&count=${this.index}`);
        if(response.data.status==1){
          this.departments = response.data.departments.data;
          this.totalPage=response.data.departments.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    changepage(value){
      this.currentPage=value;
      this.getDepartments();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    isAvailable(){
        if(this.getAdmin.permissions[5]!=null){
            return true;
        }
        return false;
    },
    async goCreate(name){
      try{
        const response=await axios.post('/createdepartment', {
            name:name,
        });
        if(response.status==422){
            this.message='请输部门名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输部门名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goEdit(name,id){
      try{
        const response=await axios.post(`/editdepartment/${id}`, {
            name:name,
        });
        if(response.status==422){
            this.message='请输部门名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输部门名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
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
    async deleteDepartment(id) {
      try {
        const response = await axios.get(`/deletedepartment/${id}`);
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
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getDepartments();
    }
  }
})
</script>