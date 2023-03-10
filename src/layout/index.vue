<template>
  <div class="flex main">
    <div class="menu">
      <div class="logo p-3 flex items-center justify-between">
        <span class="admin-header flex items-center">
          <BIconPersonCircle class="header inline-block"/>
          <span class="mr-[10px]">
            admin
          </span>
          <BIconPencilSquare class="edit inline-block mt-[3px]"/>
        </span>
        <BIconPower @click="signOut" class="out inline-block" />
      </div>
      <router-link to="home" key="home" class="menu-item p-4" active-class="active">
        <BIconHouse class="icon mr-[10px]"/>
        <p>
          <p>
            首页
          </p>
        </p>
      </router-link>
      <router-link to="users" key="users" class="menu-item p-4" active-class="active">
        <BIconPeople class="icon mr-[10px]"/>
        <p>
          <p>
            用户管理
          </p>
        </p>
      </router-link>
      <router-link to="commodity" key="commodity" class="menu-item p-4" active-class="active">
        <BIconBagCheck class="icon mr-[10px]"/>
        <p>
          <p>
            商品管理
          </p>
        </p>
      </router-link>
      <router-link to="Order" key="Order" class="menu-item p-4" active-class="active">
        <BIconCardList class="icon mr-[10px]"/>
        <p>
          <p>
            订单管理
          </p>
        </p>
        <p v-if="getOrder" class="text-[#fff] ml-[40px] w-[15px] h-[15px] text-center rounded-full bg-red-500 text-[8px] flex justify-center items-center">{{getOrder}}</p>
      </router-link>
      <router-link to="financial" key="nfinancial" class="menu-item p-4" active-class="active">
        <BIconCreditCard2Back class="icon mr-[10px]"/>
        <p>
          <p>
            财务管理
          </p>
        </p>
        <p v-if="getPayment" class="text-[#fff] ml-[40px] w-[15px] h-[15px] text-center rounded-full bg-red-500 text-[8px] flex justify-center items-center">{{ getPayment }}</p>
      </router-link>
      <router-link to="news" key="news" class="menu-item p-4" active-class="active">
        <BIconNewspaper class="icon mr-[10px]"/>
        <p>
          <p>
            新闻公告
          </p>
        </p>
      </router-link>
      <router-link to="system" key="system" class="menu-item p-4" active-class="active">
        <BIconHouse class="icon mr-[10px]"/>
        <p>
          <p>
            系统设置
          </p>
        </p>
      </router-link>
    </div>
    <div class="content grow">
      <Content />
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import './app.css'
import { BIconPersonCircle,BIconPencilSquare,BIconPower,BIconHouse,BIconPeople,BIconBagCheck,BIconCardList,BIconCreditCard2Back,BIconNewspaper } from 'bootstrap-icons-vue';
import Content from './components/Content/index.vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import {notifyStore} from '@/pinia/modules/notificationStore';
import { mapState,mapActions  } from 'pinia'
import { Howl, Howler } from 'howler';
import Pusher from 'pusher-js';
export default defineComponent({
  name: 'layout',
  components: {
    BIconPersonCircle,
    BIconPencilSquare,
    BIconHouse,
    BIconNewspaper,
    BIconBagCheck,
    BIconPeople,
    BIconCreditCard2Back,
    BIconCardList,
    BIconPower,
    Content
  },
  data: () => ({
    audioUrl: '../public/audio/1.mp3',
    sound: null,
  }),
  computed:{
    ...mapState(notifyStore, ['getOrder','getPayment']),
  },
  mounted(){
        // const audio = this.$refs.audiofile;
        
      const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
        cluster: import.meta.env.VITE_USHER_APP_CLUSTER,
      });
      const orderChannel = pusher.subscribe('order');
      orderChannel.bind('OrderSent', ($order)=>{
        this.audioUrl='../public/audio/1.mp3',
        this.addOrder();
        this.handlePusherEvent();
      });
      const paymentChannel = pusher.subscribe('payment');
      paymentChannel.bind('PaymentSent', ($payment)=>{
        this.addPayment();
        if($payment.dir){
          this.audioUrl='../public/audio/3.mp3';
        }else{
          this.audioUrl='../public/audio/2.mp3';
        }
        this.handlePusherEvent();
      });
  },
  methods: {
    play() {
      this.sound = new Howl({
        src: [this.audioUrl],
        xhrWithCredentials: false,
        onend: () => {
        },
      });
      this.sound.play();
    },

    handlePusherEvent() {
      this.play();
    },
    ...mapActions(useAuthStore, ['logout']),
    ...mapActions(notifyStore, ['addOrder','addPayment']),
    signOut(){
      layer.config({
        skin: 'logout-class'
      })
      layer.open({
        title:false,
        content: '立即退出？',
        btn:['取消','确定'],
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
        btn2 :()=>{
          console.log('aaa');this.logout();
          this.$router.push({ name: 'login' })
        }
      });
    },
  }
});
</script>