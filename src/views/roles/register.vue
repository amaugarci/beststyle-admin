<template>
   <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[920px] bg-[#FFFFFF] top-[100px] left-1/2 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">{{this.item?'编辑':'添加'}}角色</p>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center ">
          <p class="font-black mr-[17px]">角色名</p>
          <input type="text" placeholder="输入角色名" v-model="name" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">账号管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">用户管理</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[2]" @onclick="()=>list[2]=0"/>
                <RadioButton name="手术" index=1  :value="list[2]" @onclick="()=>list[2]=1"/>
                <RadioButton name="无" index=2  :value="list[2]" @onclick="()=>list[2]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">角色管理</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[3]" @onclick="()=>list[3]=0"/>
                <RadioButton name="手术" index=1  :value="list[3]" @onclick="()=>list[3]=1"/>
                <RadioButton name="无" index=2  :value="list[3]" @onclick="()=>list[3]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">分组管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">部门列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[5]" @onclick="()=>list[5]=0"/>
                <RadioButton name="手术" index=1  :value="list[5]" @onclick="()=>list[5]=1"/>
                <RadioButton name="无" index=2  :value="list[5]" @onclick="()=>list[5]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">分组列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[6]" @onclick="()=>list[6]=0"/>
                <RadioButton name="手术" index=1  :value="list[6]" @onclick="()=>list[6]=1"/>
                <RadioButton name="无" index=2  :value="list[6]" @onclick="()=>list[6]=2"/>
            </div>
          </div>
        </div>
      </div>
    
      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">入职管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">职员列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[8]" @onclick="()=>list[8]=0"/>
                <RadioButton name="手术" index=1  :value="list[8]" @onclick="()=>list[8]=1"/>
                <RadioButton name="无" index=2  :value="list[8]" @onclick="()=>list[8]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">培训管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">培训列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[10]" @onclick="()=>list[10]=0"/>
                <RadioButton name="手术" index=1  :value="list[10]" @onclick="()=>list[10]=1"/>
                <RadioButton name="无" index=2  :value="list[10]" @onclick="()=>list[10]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">培训分类</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[11]" @onclick="()=>list[11]=0"/>
                <RadioButton name="手术" index=1  :value="list[11]" @onclick="()=>list[11]=1"/>
                <RadioButton name="无" index=2  :value="list[11]" @onclick="()=>list[11]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">查重管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">查重列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[13]" @onclick="()=>list[13]=0"/>
                <RadioButton name="手术" index=1  :value="list[13]" @onclick="()=>list[13]=1"/>
                <RadioButton name="无" index=2  :value="list[13]" @onclick="()=>list[13]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">平台列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[14]" @onclick="()=>list[14]=0"/>
                <RadioButton name="手术" index=1  :value="list[14]" @onclick="()=>list[14]=1"/>
                <RadioButton name="无" index=2  :value="list[14]" @onclick="()=>list[14]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">状态列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[15]" @onclick="()=>list[15]=0"/>
                <RadioButton name="手术" index=1  :value="list[15]" @onclick="()=>list[15]=1"/>
                <RadioButton name="无" index=2  :value="list[15]" @onclick="()=>list[15]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">素材管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">素材列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[17]" @onclick="()=>list[17]=0"/>
                <RadioButton name="手术" index=1  :value="list[17]" @onclick="()=>list[17]=1"/>
                <RadioButton name="无" index=2  :value="list[17]" @onclick="()=>list[17]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">素材分类</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[18]" @onclick="()=>list[18]=0"/>
                <RadioButton name="手术" index=1  :value="list[18]" @onclick="()=>list[18]=1"/>
                <RadioButton name="无" index=2  :value="list[18]" @onclick="()=>list[18]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">人物包装</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">包装列表</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[20]" @onclick="()=>list[20]=0"/>
                <RadioButton name="手术" index=1  :value="list[20]" @onclick="()=>list[20]=1"/>
                <RadioButton name="无" index=2  :value="list[20]" @onclick="()=>list[20]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">包装分类</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[21]" @onclick="()=>list[21]=0"/>
                <RadioButton name="手术" index=1  :value="list[21]" @onclick="()=>list[21]=1"/>
                <RadioButton name="无" index=2  :value="list[21]" @onclick="()=>list[21]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-[20px] flex justify-start">
        <p class="font-black mr-[17px] mb-[10px] text-[#0B88F9] text-[20px]">日志管理</p>
        <div class="pl-[100px] flex flex-col gap-2">
          <div class="flex items-center">
            <p class="font-black mr-[177px]">登录日志</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[23]" @onclick="()=>list[23]=0"/>
                <RadioButton name="手术" index=1  :value="list[23]" @onclick="()=>list[23]=1"/>
                <RadioButton name="无" index=2  :value="list[23]" @onclick="()=>list[23]=2"/>
            </div>
          </div>
          <div class="flex items-center">
            <p class="font-black mr-[177px]">系统名单</p> 
            <div class="flex gap-20">
                <RadioButton name="视图" index=0  :value="list[24]" @onclick="()=>list[24]=0"/>
                <RadioButton name="手术" index=1  :value="list[24]" @onclick="()=>list[24]=1"/>
                <RadioButton name="无" index=2  :value="list[24]" @onclick="()=>list[24]=2"/>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" @onclick="submit" ></IconMyButton>
      </div>
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import RadioButton from '@/components/RadioButton.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registeruser',
  components: {
    SelectBox,
    IconMyButton,
    RadioButton
  },
  props: {
    item: {
        type: Object,
        required: false,
        default: null
    }
  },
  watch: {
    item: function(newVal, oldVal) {
      this.list.fill(2);
      if(newVal){
        this.name=this.item.name;
        for(let i=0;i<newVal.permission.length;i++){
          if(newVal.permission[i].pivot.isedit){
            this.list[newVal.permission[i].id]=1;
          }else{
            this.list[newVal.permission[i].id]=0;
          }

        }
      }
    }
  },
  mounted(){
    this.list.fill(2);
      if(this.item){
        this.name=this.item.name;
        for(let i=0;i<this.item.permission.length;i++){
          if(this.item.permission[i].pivot.isedit){
            this.list[this.item.permission[i].id]=1;
          }else{
            this.list[this.item.permission[i].id]=0;
          }

        }
      }
  },
  data:()=>({
    name:'',
    message:'',
    list:Array(25).fill(2)
  }),
  methods:{
    submit(){
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
    async goEdit(id){
      let midValue=[];
      for(let i=0;i<this.list.length;i++){
        if(this.list[i]==0){
          midValue.push({
            index:i,
            isedit:false
          });
        }else if(this.list[i]==1){
          midValue.push({
            index:i,
            isedit:true
          });
        }
      }
      try{
        const response=await axios.post(`/editrole/${id}`, {
            name:this.name,
            value:midValue
        });
        if(response.status==422){
            this.message='请输角色名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }else{
            this.message='你没有权限';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goCreate(){
      let midValue=[];
      for(let i=0;i<this.list.length;i++){
        if(this.list[i]==0){
          midValue.push({
            index:i,
            isedit:false
          });
        }else if(this.list[i]==1){
          midValue.push({
            index:i,
            isedit:true
          });
        }
      }
      try{
        const response=await axios.post('/createrole', {
            name:this.name,
            value:midValue
        });
        if(response.status==422){
            this.message='请输角色名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
        else{
            this.message='你没有权限';
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
  }
})
</script>