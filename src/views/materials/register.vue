<template>
  <div
    class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[600px] bg-[#FFFFFF] top-[300px] left-1/2  -translate-x-1/2">
    <div class="relative">
      <div class="flex items-center">
        <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]" />
        <p class="font-black text-[#0B88F9]">添加素材</p>
      </div>
      <div class="flex items-center gap-28">
        <div class="flex flex-row gap-[6px] my-[30px]  items-center ">
          <p class="font-black mr-[17px]">标题</p>
          <input type="text" placeholder="输入标题" v-model="title"
            class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex items-center">
          <p class="font-black mr-[17px]">视频</p>
          <VideoButton :active="active" @onclick="()=>{changeType()}"/>
        </div>
      </div>
      <p class="font-black mr-[17px]">分类</p>
      <div class="mb-[30px] mt-[10px] flex">
        <SelectBox placeholder="一级分类" :groups="categorys1" :group="category1_id" class="w-[200px]" @onchange="(value)=>{selectCategory1(value)}"/>
        <SelectBox placeholder="二级分类" :groups="categorys2" :group="category2_id" class="w-[200px]" @onchange="(value)=>{selectCategory2(value)}"/>
        <SelectBox placeholder="三级分类" :groups="categorys3" :group="material_group_id" class="w-[200px]" @onchange="(value)=>{material_group_id=value}"/>
      </div>
      <div class="w-full flex">
        <div class="relative w-[660px] h-[200px]">
          <QuillEditor theme="snow" contentType="html" :content="description" ref="myEditor"/>
        </div>
      </div>
      <div @click="selectImage" class="w-[150px] h-[200px] mt-[25px] top-[0px] right-[10px] absolute">
        <div v-if="thumb" class=" relative">
          <img :src="VITE_BACKEND_URL+thumb" class="w-[150px] h-[200px] mt-[10px]"/>
        </div>
        <div v-else class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[150px] h-[200px]">
          <BIconPlus class="text-[30px]" />
        </div>
        <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
      </div>
      <div v-if="active" @click="selectVideo"   class="absolute right-[10px] top-[250px] flex items-center justify-center rounded-md flex-shrink-0 w-[150px] h-[30px]" :class="{'bg-[#1aef2a]':images,'bg-[#F0F0F0]':!images}" >
        <BIconPlus v-if="!images" class="text-[30px]" />
        <BIconTrash v-else class="text-[20px] text-[#f11717]" />
      </div>
      <input type="file" accept="video/*" style="display:none" ref="videoInput" @change="uploadVideo">
      <div class="flex justify-center mt-[70px]">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" @onclick="submit"></IconMyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BIconArrowRepeat, BIconPlus,BIconTrash, BIconXCircle } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import VideoButton from '@/components/VideoButton.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registermaterial',
  components: {
    SelectBox,
    BIconTrash,
    IconMyButton,
    BIconPlus,
    BIconXCircle,
    VideoButton
  },
  props: {
    item: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    active:false,
    title: '',
    images: null,
    thumb: '',
    description: '',
    material_group_id: '',
    category2_id: '',
    category1_id: '',
    categorys1: [],
    categorys2: [],
    categorys3: [],
    VITE_BACKEND_URL
  }),
  watch: {
    item: function (newVal, oldVal) {
      if (this.item) {
        this.title = this.item.title;
        this.description = this.item.description;
        this.images = this.item.photo;
        this.thumb = this.item.thumb;
        this.active = this.item.type==2?true:false;
        this.material_group_id = this.item.material_group_id;
        this.category2_id = this.item.material_group.parent.id,
          this.category1_id = this.item.material_group.parent.parent.id,
          this.selectCategory1(this.category1_id);
      } else {
        this.title = '';
        this.images = null;
        this.thumb = '',
        this.active=false;
        this.description = '';
        this.material_group_id = '';
        this.categorys2 = [];
        this.categorys3 = [];
      }
    },
    categorys1: function (newVal, oldVal) {
      this.selectCategory1(this.category1_id);
    },
    categorys2: function (newVal, oldVal) {
      this.selectCategory2(this.category2_id);
    }
  },
  mounted() {
    this.getList();
    if (this.item) {
      this.title = this.item.title;
      this.description = this.item.description;
      this.images = this.item.photo;
      this.thumb = this.item.thumb;
      this.active = this.item.type==2?true:false;
      this.material_group_id = this.item.material_group_id;
      this.category2_id = this.item.material_group.parent.id,
        this.category1_id = this.item.material_group.parent.parent.id,
        this.selectCategory1(this.category1_id);
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['fetchAdmin']),
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
    selectImage() {
      this.$refs.imageInput.click()
    },
    selectVideo() {
      this.$refs.videoInput.click()
    },
    async uploadVideo() {
      this.images=null;
      let file = this.$refs.videoInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`/uploadfile`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (response.status == 422) {
          this.message = '网络错误';
          this.showDialog();
        }
        else if (response.status == 200 && response.data.status == 1) {
          this.images = response.data.image;
        }
      } catch (error) {
        this.message = '网络错误';
        this.showDialog();
      };
    },
    async uploadImage() {
      let file = this.$refs.imageInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`/uploadfile`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (response.status == 422) {
          this.message = '网络错误';
          this.showDialog();
        }
        else if (response.status == 200 && response.data.status == 1) {
          this.thumb = response.data.image;
        }
      } catch (error) {
        this.message = '网络错误';
        this.showDialog();
      };
    },
    showDialog() {
      layer.config({
        skin: 'login-class'
      })
      layer.open({
        type: 1,
        offset: 'b',
        title: false,
        content: this.message,
        closeBtn: 0,
        shadeClose: 1,
      });
    },
    showSucss() {
      layer.config({
        skin: 'success-class'
      })
      layer.open({
        title: false,
        content: '成功',
        btn: '确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose: 1,
      });
    },
    submit(){
      this.description=this.$refs.myEditor.getHTML();
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
    async goEdit(id){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      if(this.active&&this.images==null){
        this.message='视频是必需的';
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/editmaterial/${id}`, {
          title:this.title,
          photo:this.images!=null?this.images:this.thumb,
          thumb:this.thumb,
          type:this.active?2:1,
          description:this.description,
          material_group_id:this.material_group_id,
        });
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goCreate(){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post('/creatematerial', {
            title:this.title,
            photo:this.images!=null?this.images:this.thumb,
            thumb:this.thumb,
            type:this.active?2:1,
            description:this.description,
            material_group_id:this.material_group_id,
        });
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    createValidation(){
        if(this.title==''){
            this.message='标题是必需的';
            return false;
        }
        else if(this.thumb==''){
          this.message='照片是必需的';
            return false;
        }
        else if(this.description==''){
          this.message='描述是必需的';
            return false;
        }
        else if(this.training_group_id==''){
          this.message='分类是必需的';
            return false;
        }
        return true;
    },
    changeType(){
      this.images=null;
      this.active=!this.active;
    }
  }
})
</script>