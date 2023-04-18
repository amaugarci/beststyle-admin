<template>
    <vue-editor class="w-[680px] h-[200px]"   v-model="editorContent" useCustomImageHandler  :editorToolbar="customToolbar" @image-added="handleImageAdded"  ref="myTextEditor" :customModules="customModulesForEditor"
    @text-change="saveEditorHtml" :editorOptions="editorOption" ></vue-editor>
</template>

<script>
import { VueEditor, Quill } from 'vue3-editor'
import { VideoExtend, QuillVideoWatch } from 'quill-video-extend-module'

import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { del } from 'vue-demi';
import axios from 'axios'
Quill.register('modules/VideoExtend', VideoExtend)
export default {
  components: {
    VueEditor
  },
  props: {
    content: {
      required: true
    },
  },
  watch:{
    'content':function (newValue){
      if(this){
        this.editorContent=newValue;
      }
    }
  },
  data(){
      const customToolbar=[
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons

        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        ['image','video','clean'],
      ];
    return {
      VITE_IMAGE_URL,
      editorContent: this.content,
      // customModulesForEditor: [
      //   { alias: "video", module: VideoExtend },
      // ],
      editorOption: {
        modules: {
          toolbar: {
            container: customToolbar,
            handlers: {
              'video': function() {
                QuillVideoWatch.emit(this.quill.id)
              },
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          VideoExtend: {
            loading: true,
            name: 'video',
            action: VITE_BACKEND_URL+'uploadtextvideo',
            headers: (xhr) => {
              // set custom token(optional)
              xhr.setRequestHeader('token', this.token)
            },
            response: (res) => {
              // video uploaded path
              // custom your own
              console.log(res);
              return VITE_IMAGE_URL+res.video;
            }
          }
        }
      }
    }
  },
  methods:{
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      this.uploadImage(file,Editor, cursorLocation, resetUploader);
    },
    async uploadImage(file,Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append('file', file);
      try{
        const response=await axios.post(`/uploadfile`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.images=response.data.image;
          Editor.insertEmbed(cursorLocation, "image", this.VITE_IMAGE_URL+ this.images);
          resetUploader();
        }
      }catch(error) {
        console.log(error);
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
    saveEditorHtml() {
      this.$emit('saveHtml', this.editorContent);
    },
  }
};
</script>