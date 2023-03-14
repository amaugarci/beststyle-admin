<template>
  <div class="content grow p-3 relative" id="getContent">
    <div class="flex items-center breadcrumb justify-between mb-2">
      <p>用户管理</p>
      <BIconArrowRepeat @click="refresh" />
    </div>
    <div class="card">
      <!-- <div class="card-header">
        <div class="row">
          <div class="input-group col-4 px-[15px]">
            <div class="input-group-prepend">
              <span class="input-group-text">商品名称</span>
            </div>
            <input type="text" class="form-control" placeholder="" id="GoodsGO">
          </div>
          <div class="input-group col-3 px-[15px]">
            <div class="input-group-prepend">
              <span class="input-group-text">分类</span>
            </div>
            <select class="form-control" id="GoodsGOType">
              <option value="all">全部</option>
              <option value="btc">区块链</option>
              <option value="nf">期货</option>
            </select>
          </div>
          <button class="btn btn-success" onclick="goods.getlist()">搜索</button>
          <button class="btn btn-info ml-3" onclick="br.href('goods')">重置
          </button>
        </div>
      </div> -->
      <table class="table table-hover table-sm mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>UID</th>
            <th>帐号</th>
            <th>姓名</th>
            <th>余额</th>
            <th>银行</th>
            <th>最近登陆</th>
            <th>登陆IP</th>
            <th>风控</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr v-for="(item,index) in users" :key="item.id">
            <td v-if="!item.offline">在线</td>
            <td v-else>离线</td>
            <td>{{item.id}}</td>
            <td>{{ item.name}}</td>
            <td >{{ item.realname }}</td>
            <td >{{ item.cash_amount }}</td>
            <td  v-if="item.bank">已绑定</td>
            <td v-else>未绑定</td>
            <td v-if="item.lastlogin">{{moment().utc(new Date(item.lastlogin)).local().format("MM-DD hh:mm:ss") }}</td>
            <td v-else>-</td>
            <td v-if="item.IP">{{ item.IP }}</td>
            <td v-else>-</td>
            <td><select class="form-control form-control-sm" @change="updateUser(index)" v-model="item.vstatus">
                <option value="0">未操作</option>
                <option value="1" selected="">必赢</option>
                <option value="2">必输</option>
              </select></td>
            <td>
              <select class="form-control form-control-sm" @change="updateUser(index)" v-model="item.status">
                <option value="0" selected="">正常</option>
                <option value="1">冻结</option>
              </select></td>
            <td class="relative">
              <button class="btn btn-success btn-sm" @click="showDialogPayment(index)">
                上下分
              </button>
              <button type="button"
                class="btn btn-info dropdown-toggle btn-sm ml-2" ref="buttons" @click="showDrop(index)">
                更多操作
              </button>
              <div ref="container" class="dropdown-menu lg:ml-[30%] xl:ml-[40%]" :class="{show:dropdown[index]}" style="position: absolute;">
                <a class="dropdown-item" @click="showDialogDetail(index)">编辑详情</a>
                <a class="dropdown-item" @click="showOfflinePayment(index)">强制离线</a>
                
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="showDeleteUser(index)">删除帐户</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdetail">
    </div>
  </div>
  <div class="z-[99999] w-[400px] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-[10px] bg-[#fff] rounded-[5px]"  v-if="showdetail">
    <div class="flex flex-row justify-between w-full items-center p-3">
      <p>用户详情 [UID:{{ users[index].id }}]</p>
      <BIconX class="text-[20px]" @click="()=>showdetail=false"/>
    </div>
    <div class="border-t-[1px] p-3">
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">帐号</label>
        <input  class="form-control" v-model="form.name">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">Phone</label>
        <input type="number" class="form-control" v-model="form.phonenumber">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">姓名</label>
        <input  class="form-control" v-model="form.realname">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">密码</label>
        <input class="form-control" v-model="form.password">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">银行帐号</label>
        <input type="text" class="form-control" v-model="form.bankname">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">银行名称</label>
        <input type="text" class="form-control" v-model="form.cardnumber">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">开户地址</label>
        <input type="text" class="form-control" v-model="form.address">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">安全码</label>
        <input type="number"  class="form-control" v-model="form.securityNumber">
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">安全码</label>
        <p class="w-[100%]">{{moment().utc(new Date(form.created_at)).local().format("MM-DD hh:mm:ss") }}</p>
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">登陆时间</label>
        <p class="w-[100%]">{{form.IP }}</p>
      </div>
      <div class="flex flex-row justify-between items-center py-3">
        <label class="w-[30%]">登陆IP</label>
        <p class="w-[100%]">{{form.lastlogin }}</p>
      </div>
      <button class="btn btn-success btn-block w-full" @click="saveDetail()">保存</button>
    </div>

  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconArrowRepeat,BIconX } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
import { playSound } from '../../plugins/sound';
export default defineComponent({
  name: 'users',
  components: {
    BIconX,
    BIconArrowRepeat
  },
  data: () => ({
    message:'',
    users: null,
    dropdown:[],
    index:null,
    showdetail:false,
    form:null
  }),
  mounted() {
    this.getUsers();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    moment: function () {
      return moment;
    },
    handleClickOutside(event) {
      if(this.index!=null){
        if (this.$refs.container[this.index].contains(event.target)) {
          return;
        }
        if (this.$refs.buttons[this.index].contains(event.target)) {
          return;
        }
        this.dropdown[this.index]=false;
      }
    },
    async saveDetail() {
      try{
          const response=await axios.post(`/updatedetail`, {
              ...this.form
          });
          if(response.data.status==1){
            this.users[this.index]=response.data.user;
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.showdetail=false;
          }else{
              this.message=response.data.message;
              this.showDialog();
          }
      }
      catch(error) {
        this.message='出现意想不到的问题';
          this.showDialog();
      };
    },
    async updateUser(index) {
      try{
          const response=await axios.post(`/user/${this.users[index].id}`, {
              vstatus:this.users[index].vstatus,
              status:this.users[index].status
          });
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
          }else{
            this.message=response.data.message;
            this.showDialog();
          }
      }
      catch(error) {
        this.message='出现意想不到的问题';
          this.showDialog();
      };
    },
    async addPayment(index,val) {
      try{
          const response=await axios.post(`/addpayment/${this.users[index].id}`, {
            cash_amount:val,
          });
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            this.users[index].cash_amount=Number(this.users[index].cash_amount)+Number(val);
            layer.msg("操作成功");
          }else{
            this.message=response.data.message;
            this.showDialog();
          }
       }
       catch(error) {
        this.message='出现意想不到的问题';
           this.showDialog();
       };
    },
    async deleteUser(index) {
      try{
          const response=await axios.get(`/userdelete/${this.users[index].id}`);
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            layer.msg("操作成功");
            this.refresh();
          }else{
            this.message=response.data.message;
            this.showDialog();
          }
       }
       catch(error) {
        this.message='出现意想不到的问题';
           this.showDialog();
       };
    },
    async OfflineUser(index) {
      try{
          const response=await axios.get(`/useroffline/${this.users[index].id}`);
          if(response.data.status==1){
            layer.config({
              skin: ''
            })
            this.users[index].offline=true;
            layer.msg("操作成功");
          }else{
              this.message=response.data.message;
              this.showDialog();
          }
       }
       catch(error) {
           this.message='出现意想不到的问题';
           this.showDialog();
       };
    },
    async getUsers() {
      try {
        const response = await axios.get('/users');
        this.users = response.data.users;
        this.users.forEach(item => {
          this.dropdown.push(false);
        });
      }
      catch (error) {
        console.log(error);
      };
    },
    showDrop(index){
      this.dropdown[index]=true;
      this.index=index;
    },
    refresh() {
      this.users = null;
      this.getUsers();
    },
    showDialogPayment(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`姓名:${this.users[index].name} 上下分 [下分输入负数]`,
        content: `<input type="number" class='inputPayment' >`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          const inputValue = layero.find('input').val();
          this.addPayment(index,inputValue);
          layer.close(i);
        },
      });
      // playSound(2);
    },
    showDialogDetail(index){
      this.showdetail=true;
      this.form={
        id:this.users[index].id,
        name:this.users[index].name,
        phonenumber:this.users[index].bank.phonenumber,
        realname:this.users[index].bank.realname,
        bankname:this.users[index].bank.name,
        password:'',
        cardnumber:this.users[index].bank.cardnumber,
        address:this.users[index].bank.address,
        securityNumber:null,
        created_at:this.users[index].created_at,
        IP:this.users[index].IP,
        lastlogin:this.users[index].lastlogin
      }
    },
    showOfflinePayment(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`信息`,
        content: `是否将该用户强制离线?`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.OfflineUser(index);
          layer.close(i);
        },
      });
    },
    showDeleteUser(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除用户`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteUser(index);
          layer.close(i);
        },
      });
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

<style>
.inputPayment {
  display: block;
  width: 260px;
  height: 36px;
  margin: 0 auto;
  line-height: 30px;
  padding-left: 10px;
  border: 1px solid #e6e6e6;
  color: #333;
}
</style>