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
            <th>标题</th>
            <th>描述</th>
            <th>发布人</th>
            <th>时间</th>
            <th>类型</th>
            <th>状态</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in news" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td v-if="item.admin">管理员</td>
            <td v-else>用户</td>
            <td>{{moment().utc(new Date(item.updated_at)).local().format("MM-DD HH:mm:ss") }}</td>
            <td v-if="item.type">资讯</td>
            <td v-else>公告</td>
            <td v-if="item.status">显示</td>
            <td v-else>隐藏</td>
            <td>
              <button class="btn btnSuccess btn-sm mr-2" @click="editNews(index)">查看</button>
              <button class="btn btnDanger btn-sm" @click="showDeleteNews(index)">拒绝</button>
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
      <BIconX class="text-[20px]" @click="() => showdialog = false" />
    </div>
    <div class="border-t-[1px] p-3">
      <div class="flex flex-row justify-between items-center py-3">
        <input class="form-control" v-model="form.title" placeholder="标题">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <textarea class="form-control mb-3" style="height: 300px;" rows="10" v-model="form.description" placeholder="描述"
          required=""></textarea>
      </div>
      <p>create time</p>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="datetime-local" v-model="form.created_at" class="form-control">
      </div>
      <p>update time</p>
      <div class="flex flex-row justify-between items-center py-3">
        <input type="datetime-local" class="form-control" v-model="form.updated_at">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <select class="form-control" v-model="form.status">
          <option value=1>显示</option>
          <option value=0>隐藏</option>
        </select>
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <select class="form-control" v-model="form.type" >
          <option value=1>资讯</option>
          <option value=0>公告</option>
        </select>
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
  name: 'news',
  components: {
    BIconX,
    BIconArrowRepeat
  },
  data: () => ({
    news: null,
    showdialog: false,
    edit: false,
    form: {
      title: '',
      description: '',
      status: '1',
      type: '1',
      created_at:null,
      updated_at:null
    }
  }),
  mounted() {
    this.getNews();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getNews() {
      try {
        const response = await axios.get('/news');
        this.news = response.data.news;
      }
      catch (error) {
        console.log(error);
      };
    },
    save() {
      if (this.edit) {
        this.updateNews();
      } else {
        this.saveNews()
      }
    },
    async updateNews() {
      try {
        const response = await axios.post(`/updatenews/${this.form.id}`, {
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
        this.showDialog();
      };
    },
    async saveNews() {
      try {
        const response = await axios.post(`/createnews`, {
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
        this.showDialog();
      };
    },
    editNews(index) {
      this.edit = true;
      this.form = {
        ...this.news[index],
        created_at:new Date(this.news[index].created_at).toISOString().slice(0,16),
        updated_at:new Date(this.news[index].updated_at).toISOString().slice(0,16),
      }
      this.showdialog = true;
    },
    showDeleteNews(index) {
      layer.config({
        skin: ''
      })
      layer.open({
        title: `删除用户`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn: ['确定', '取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteNews(index);
          layer.close(i);
          this.refresh();
        },
      });
    },
    async deleteNews(index) {
      try {
        const response = await axios.get(`/newsdelete/${this.news[index].id}`);
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
      this.getNews();
    },
    showDialog() {
      layer.config({
        skin: 'login-class'
      })
      layer.open({
        type: 1,
        offset: 'b',
        title: false,
        content: '无效的参数',
        closeBtn: 0,
        shadeClose: 1,
      });
    },
  }
})
</script>