<template>
  <div class="ml-[103px] fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[500px] bg-[#FFFFFF] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
      <div class="flex items-center">
        <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">设置查看权限</p>
      </div>
      <div class=" h-[300px] mt-[53px]w-[900px]" :class="{'flex justify-around':roles.length<5,'grid grid-cols-5':roles.length>=5}">
        <div v-for="(item, index) in roles" class="flex gap-2 items-center justify-center">
           <button @click="select(item.id)" class="flex w-[20px] h-[20px] rounded-full" :class="{'bg-[#0B88F9]':roleid.includes(item.id),'border-black border-[2px]':!roleid.includes(item.id)}" >
            <BIconCheck class="text-white justify-center items-center mt-[2px] ml-[1px]"/>
           </button>
           <p>{{item.name}}</p>
        </div>
      </div>
      <div class="flex justify-center">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[353px]" @onclick="()=>{if(!loading) submit() }" ></IconMyButton>
      </div>
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat,BIconCheck } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registergroup',
  components: {
    SelectBox,
    BIconCheck,
    IconMyButton
  },
  props: {
    roles: {
        type: Array,
        default: []
    },
    groupRole: {
        type: Array,
        default: []
    },
    groupid: {
        type: Number,
        default: null
    },
  },
  data:()=>({
    roleid:[],
    loading:false
  }),
  watch: {
    groupRole: function(newVal, oldVal) {
      this.roleid=[];
      for(let i=0;i<newVal.length;i++){
        this.roleid.push(newVal[i].role_id);
      }
    }
  },
  mounted(){
      if(this.groupRole.length!=0){
        for(let i=0;i>this.groupRole.length;i++){
          this.roleid.push(this.groupRole[i].role_id);
        }
      }
  },
  methods:{
  select(id){
      const index = this.roleid.indexOf(id);
      if (index > -1) {
        this.roleid.splice(index, 1);
      }
      else{
        this.roleid.push(id);
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
    async submit(){
      try{
        this.loading=true;
        const response=await axios.post(`/characterrole/${this.groupid}`, {
            roleid:this.roleid,
        });
        this.loading=false;
        if(response.status==422){
          this.message='网络错误';
          this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', this.roleid);
        }
      }catch(error) {
          this.message='网络错误';
          this.loading=false;
          this.showDialog();
      };
    },
  }
})
</script>