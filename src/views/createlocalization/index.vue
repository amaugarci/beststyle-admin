<template>
  <div class="content grow p-3">
    <div class="flex items-center breadcrumb justify-between mb-2">
      <p>新闻编辑</p>
      <BIconArrowRepeat @click="refresh" />
    </div>
    <div class="card-header">
      <div class="flex items-center gap-2">
        <div>姓名</div>
        <div><input type="text" name="web_name" v-model="form.language" class="form-control"></div>
      </div>
    </div>
    <div class="m-5 grid grid-cols-3 items-center md:gap-x-[0.5rem] lg:gap-x-[3rem] gap-y-2">
      <div class="flex items-center justify-between">
        <div>登陆</div>
        <div><input type="text" name="web_name" v-model="form.login" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>开户</div>
        <div><input type="text" name="web_name" v-model="form.signup" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>您的帐号</div>
        <div><input type="text" name="web_name" v-model="form.accountid" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>登陆密码</div>
        <div><input type="text" name="web_name" v-model="form.password" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>注册</div>
        <div><input type="text" name="web_name" v-model="form.register" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>香港网络安全局认证</div>
        <div><input type="text" name="web_name" v-model="form.certificatedhk" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>京公网安备11010202000001号</div>
        <div><input type="text" name="web_name" v-model="form.Beijingno" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>忘记密码？请联系客服!</div>
        <div><input type="text" name="web_name" v-model="form.forgotpassword" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>帐号 [6-16位英文开头和数字]</div>
        <div><input type="text" name="web_name" v-model="form.accountnumberlimit" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>登陆密码 [6~16位]</div>
        <div><input type="text" name="web_name" v-model="form.loginpasswordlimit" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>再次输入密码</div>
        <div><input type="text" name="web_name" v-model="form.reloginpassword" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>安全密码 [6位数字]</div>
        <div><input type="text" name="web_name" v-model="form.securitycodelimit" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>真实姓名</div>
        <div><input type="text" name="web_name" v-model="form.realname" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>首页</div>
        <div><input type="text" name="web_name" v-model="form.home" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>持仓</div>
        <div><input type="text" name="web_name" v-model="form.position" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>客服</div>
        <div><input type="text" name="web_name" v-model="form.service" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>资讯</div>
        <div><input type="text" name="web_name" v-model="form.news" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>我</div>
        <div><input type="text" name="web_name" v-model="form.profile" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>热门产品</div>
        <div><input type="text" name="web_name" v-model="form.product" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>最新</div>
        <div><input type="text" name="web_name" v-model="form.last" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>买涨</div>
        <div><input type="text" name="web_name" v-model="form.buy" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>买跌</div>
        <div><input type="text" name="web_name" v-model="form.sell" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>K线</div>
        <div><input type="text" name="web_name" v-model="form.kline" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>走势</div>
        <div><input type="text" name="web_name" v-model="form.trend" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>结算时间</div>
        <div><input type="text" name="web_name" v-model="form.settlementtime" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>秒</div>
        <div><input type="text" name="web_name" v-model="form.second" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>盈亏</div>
        <div><input type="text" name="web_name" v-model="form.profit" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>投资金额</div>
        <div><input type="text" name="web_name" v-model="form.investamount" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>全部</div>
        <div><input type="text" name="web_name" v-model="form.all" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>其它</div>
        <div><input type="text" name="web_name" v-model="form.custom" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>余额</div>
        <div><input type="text" name="web_name" v-model="form.balance" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>手续费</div>
        <div><input type="text" name="web_name" v-model="form.fee" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>实际支付</div>
        <div><input type="text" name="web_name" v-model="form.actualpayment" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>币名</div>
        <div><input type="text" name="web_name" v-model="form.symbolname" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>方向</div>
        <div><input type="text" name="web_name" v-model="form.direction" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>现价</div>
        <div><input type="text" name="web_name" v-model="form.currentprice" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>金额</div>
        <div><input type="text" name="web_name" v-model="form.amount" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>确认下单</div>
        <div><input type="text" name="web_name" v-model="form.conformorder" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>退格</div>
        <div><input type="text" name="web_name" v-model="form.backspace" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>清空</div>
        <div><input type="text" name="web_name" v-model="form.empty" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>关闭</div>
        <div><input type="text" name="web_name" v-model="form.close" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>确认</div>
        <div><input type="text" name="web_name" v-model="form.conform" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>订单确认</div>
        <div><input type="text" name="web_name" v-model="form.orderconform" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>确定</div>
        <div><input type="text" name="web_name" v-model="form.ok" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>取消</div>
        <div><input type="text" name="web_name" v-model="form.cancel" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>订单记录</div>
        <div><input type="text" name="web_name" v-model="form.orderrecord" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>暂⽆订单</div>
        <div><input type="text" name="web_name" v-model="form.noorder" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>未平仓</div>
        <div><input type="text" name="web_name" v-model="form.openposition" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>已平仓</div>
        <div><input type="text" name="web_name" v-model="form.closeposition" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>买入金额</div>
        <div><input type="text" name="web_name" v-model="form.orderbalance" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>建仓价格</div>
        <div><input type="text" name="web_name" v-model="form.openprice" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>建仓时间</div>
        <div><input type="text" name="web_name" v-model="form.opentime" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>返回</div>
        <div><input type="text" name="web_name" v-model="form.return" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>暂⽆资讯</div>
        <div><input type="text" name="web_name" v-model="form.nonews" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>查看更多</div>
        <div><input type="text" name="web_name" v-model="form.seemore" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>充值</div>
        <div><input type="text" name="web_name" v-model="form.recharge" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>提现</div>
        <div><input type="text" name="web_name" v-model="form.withdrawal" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>充值记录</div>
        <div><input type="text" name="web_name" v-model="form.rechargehistory" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>提现记录</div>
        <div><input type="text" name="web_name" v-model="form.withdrawalhistory" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>新闻公告</div>
        <div><input type="text" name="web_name" v-model="form.newannouncement" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>修改密码</div>
        <div><input type="text" name="web_name" v-model="form.passwordchange" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>退出登陆</div>
        <div><input type="text" name="web_name" v-model="form.signout" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>银行名称</div>
        <div><input type="text" name="web_name" v-model="form.bankname" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>卡号</div>
        <div><input type="text" name="web_name" v-model="form.cardnumber" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>开户地址</div>
        <div><input type="text" name="web_name" v-model="form.aaddress" class="form-control"></div>
      </div><div class="flex items-center justify-between">
        <div>请先绑定银行卡</div>
        <div><input type="text" name="web_name" v-model="form.bankinvalid" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>银行存在</div>
        <div><input type="text" name="web_name" v-model="form.bexist" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>网络错误，请稍候再试</div>
        <div><input type="text" name="web_name" v-model="form.neterror" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>请输入所有值</div>
        <div><input type="text" name="web_name" v-model="form.allvalue" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>手机号码 [8-16位数字]</div>
        <div><input type="text" name="web_name" v-model="form.pnumberinvalid" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>银行名称是不正确的</div>
        <div><input type="text" name="web_name" v-model="form.bnameinvalid" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>真实姓名是不正确的</div>
        <div><input type="text" name="web_name" v-model="form.rnameinvalid" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>编辑</div>
        <div><input type="text" name="web_name" v-model="form.edit" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>充值金额</div>
        <div><input type="text" name="web_name" v-model="form.ramount" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>安全密码</div>
        <div><input type="text" name="web_name" v-model="form.scode" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>成功</div>
        <div><input type="text" name="web_name" v-model="form.success" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>安全密码必须为6位或更长</div>
        <div><input type="text" name="web_name" v-model="form.spassincorrect" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>暂⽆充值</div>
        <div><input type="text" name="web_name" v-model="form.norecharge" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>管理员</div>
        <div><input type="text" name="web_name" v-model="form.administrator" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>充值后金额</div>
        <div><input type="text" name="web_name" v-model="form.afterrecharge" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>充值时间</div>
        <div><input type="text" name="web_name" v-model="form.rechargetime" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>状态</div>
        <div><input type="text" name="web_name" v-model="form.state" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>已通过</div>
        <div><input type="text" name="web_name" v-model="form.passed" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>审核中</div>
        <div><input type="text" name="web_name" v-model="form.underreview" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>最小提现金额</div>
        <div><input type="text" name="web_name" v-model="form.minwithdrawal" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>取款金额超出范围</div>
        <div><input type="text" name="web_name" v-model="form.withdrawalout" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>您的账户余额不足</div>
        <div><input type="text" name="web_name" v-model="form.invalidbalance" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>原密码</div>
        <div><input type="text" name="web_name" v-model="form.opass" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>密码必须为6位或更长。</div>
        <div><input type="text" name="web_name" v-model="form.passsix" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>确认密码不正确</div>
        <div><input type="text" name="web_name" v-model="form.cpassincorrect" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>绑定银行卡</div>
        <div><input type="text" name="web_name" v-model="form.bbcard" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>立即退出</div>
        <div><input type="text" name="web_name" v-model="form.exitnow" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>用户名</div>
        <div><input type="text" name="web_name" v-model="form.username" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>银行编辑</div>
        <div><input type="text" name="web_name" v-model="form.editbank" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>暂无公告</div>
        <div><input type="text" name="web_name" v-model="form.noannouncement" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>提现金额</div>
        <div><input type="text" name="web_name" v-model="form.withdrawalamount" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>暂⽆提现</div>
        <div><input type="text" name="web_name" v-model="form.nowithdrawal" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>提现后金额</div>
        <div><input type="text" name="web_name" v-model="form.afterwithdrawal" class="form-control"></div>
      </div>
      <div class="flex items-center justify-between">
        <div>提现时间</div>
        <div><input type="text" name="web_name" v-model="form.withdrawaltime" class="form-control"></div>
      </div>
    </div>
    <button class="btn btn-success btn-block w-full" @click="save()" :disabled="disabled">保存</button>
  </div>
</template>
<script>

import { defineComponent } from 'vue'
import { BIconArrowRepeat, BIconX } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'createlocalization',
  components: {
    BIconX,
    BIconArrowRepeat
  },
  data: () => ({
    languages:null,
    disabled:false,
    form:{
      language:'',
      login:'',
      signup:'',
      accountid:'',
      password:'',
      register:'',
      certificatedhk:'',
      Beijingno:'',
      forgotpassword:'',
      accountnumberlimit:'',
      loginpasswordlimit:'',
      reloginpassword:'',
      securitycodelimit:'',
      realname:'',
      home:'',
      position:'',
      service:'',
      news:'',
      profile:'',
      product:'',
      last:'',
      buy:'',
      sell:'',
      kline:'',
      trend:'',
      settlementtime:'',
      second:'',
      profit:'',
      investamount:'',
      all:'',
      custom:'',
      balance:'',
      fee:'',
      actualpayment:'',
      symbolname:'',
      direction:'',
      currentprice:'',
      amount:'',
      conformorder:'',
      backspace:'',
      empty:'',
      close:'',
      conform:'',
      orderconform:'',
      ok:'',
      cancel:'',
      orderrecord:'',
      noorder:'',
      openposition:'',
      closeposition:'',
      orderbalance:'',
      openprice:'',
      opentime:'',
      return:'',
      nonews:'',
      seemore:'',
      recharge:'',
      withdrawal:'',
      rechargehistory:'',
      withdrawalhistory:'',
      newannouncement:'',
      passwordchange:'',
      signout:'',
      bankname:'',
      cardnumber:'',
      aaddress:'',
      bankinvalid:'',
      bexist:'',
      neterror:'',
      allvalue:'',
      pnumberinvalid:'',
      bnameinvalid:'',
      rnameinvalid:'',
      edit:'',
      ramount:'',
      scode:'',
      success:'',
      spassincorrect:'',
      norecharge:'',
      administrator:'',
      afterrecharge:'',
      rechargetime:'',
      state:'',
      passed:'',
      underreview:'',
      minwithdrawal:'',
      withdrawalout:'',
      invalidbalance:'',
      opass:'',
      passsix:'',
      cpassincorrect:'',
      bbcard:'',
      exitnow:'',
      username:'',
      editbank:'',
      noannouncement:'',
      withdrawalamount:'',
      nowithdrawal:'',
      afterwithdrawal:'',
      withdrawaltime:'',
    }
  }),
  mounted() {
  },
  methods: {
    moment: function () {
      return moment;
    },
    refresh(){
      this.form={};
    },
    async save() {
      try {
        this.disabled=true;
        const response = await axios.post(`/createlocalization`, {
          ...this.form
        });
        if (response.data.status == 1) {
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.refresh();
        } else {
          this.showDialog();
        }
        this.disabled=false;
      }
      catch (error) {
        this.disabled=false;
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
        content: '无效的参数',
        closeBtn: 0,
        shadeClose: 1,
      });
    },
  }
})
</script>