<template>
  <div class="content grow p-3">
    <div class="flex items-center breadcrumb justify-between mb-2">
      <p>新闻管理</p>
      <BIconArrowRepeat @click="refresh" />
    </div>
    <div class="card">
      <div class="card-header">
        <button class="btn btn-success btn-sm" @click="() => {
          showdialog = true; edit = false; form = {
            title: '',
            description: '',
            status: '1',
            type: '1',
          }
        }">添加</button>
      </div>
      <table class="table table-hover table-sm mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>帐号</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in admins" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <button class="btn btnSuccess btn-sm mr-2" @click="editAdmins(index)">查看</button>
              <button class="btn btnDanger btn-sm" @click="showDeleteAdmins(index)">拒绝</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
  </div>
  <div
    class="z-[99999] w-[400px] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-[10px] bg-[#fff] rounded-[5px]"
    v-if="showdialog">
    <div class="flex flex-row justify-between w-full items-center p-3">
      <p>添加</p>
      <BIconX class="text-[20px] text-[#000]" @click="() => showdialog = false" />
    </div>
    <div class="border-t-[1px] p-3">
      <div class="flex flex-row justify-between items-center py-3">
        <input class="form-control" v-model="form.name" placeholder="标题">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <input class="form-control" v-model="form.password" placeholder="密码">
      </div>
      <button class="btn btn-success btn-block w-full" @click="save()">保存</button>
    </div>

  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconArrowRepeat, BIconX } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'admins',
  components: {
    BIconX,
    BIconArrowRepeat
  },
  data: () => ({
    admins: null,
    showdialog: false,
    edit: false,
    message:'',
    form: {
      name: '',
      password: ''
    }
  }),
  mounted() {
    this.getAdmins();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getAdmins() {
      try {
        const response = await axios.get('/list');
        this.admins = response.data.admins;
      }
      catch (error) {
        console.log(error);
      };
    },
    save() {
      if (this.edit) {
        this.updateAdmins();
      } else {
        this.saveAdmins()
      }
    },
    async updateAdmins() {
      if(this.validation()){
        try {
          const response = await axios.post(`/updateadmins/${this.form.id}`, {
            ...this.form
          });
          if (response.data.status == 1) {
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.showdialog = false;
            this.refresh();
          } else {
            
            this.showDialog();
          }
        }
        catch (error) {
          this.message='出现意想不到的问题'
          this.showDialog();
        };
      }else{
        this.showDialog();
      }
    },
    async saveAdmins() {
        if(this.validation()){
          try {
            const response = await axios.post(`/createadmins`, {
            ...this.form
            });
            if (response.data.status == 1) {
              layer.config({
                skin: ''
              })
              layer.msg("操作成功");
              this.showdialog = false;
              this.refresh();
            } else {
              this.message='名字已经存在';
              this.showDialog();
            }
          }
          catch (error) {
            this.message='出现意想不到的问题'
            this.showDialog();
          };
        }else{
          this.showDialog();
        }

    },
    validation(){
        if(this.form.name==''||this.form.password==''){
            this.message='请输入所有值'
            return false;
        }
        if(this.form.password.length<6){
            this.message='密码必须为6位或更长。'
            return false;
        }
        return true;
    },
    editAdmins(index) {
      this.edit = true;
      this.form = {
        ...this.admins[index]
      }
      this.showdialog = true;
    },
    showDeleteAdmins(index) {
      layer.config({
        skin: ''
      })
      layer.open({
        title: `删除管理员`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn: ['确定', '取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteAdmins(index);
          layer.close(i);
          this.refresh();
        },
      });
    },
    async deleteAdmins(index) {
      try {
        const response = await axios.get(`/admindelete/${this.admins[index].id}`);
        if (response.data.status == 1) {
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.refresh();
        } else {
          this.showDialog();
        }
      }
      catch (error) {
        this.showDialog();
      };
    },
    refresh() {
      this.orders = null;
      this.getAdmins();
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
  }
})
</script>