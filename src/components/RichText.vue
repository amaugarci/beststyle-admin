<template>
  <quill-editor v-model="content" :options="editorOptions"></quill-editor>
</template>

<script>
import { defineComponent } from 'vue'
import { QuillEditor } from 'vue3-quill';
import 'quill/dist/quill.snow.css';

export default defineComponent({
  name: 'richtext',
  components: {
    QuillEditor
  },
  data:()=>({
    content:'',
    editorOption: {
        placeholder:'core',
        modules: {
          // toolbars: [
            // custom toolbars options
            // will override the default configuration
          // ],
          // other moudle options here
          // otherMoudle: {}
        },
        // more options
      },
  }),
  provide: {
          richtexteditor:[Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]
      }
})
</script>
