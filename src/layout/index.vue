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
      <router-link to="home" class="menu-item p-4" active-class="active">
        <BIconHouse class="icon mr-[10px]"/>
        <p>
          <p>
            首页
          </p>
        </p>
      </router-link>
      <router-link to="users" class="menu-item p-4" active-class="active">
        <BIconPeople class="icon mr-[10px]"/>
        <p>
          <p>
            用户管理
          </p>
        </p>
      </router-link>
      <router-link to="commodity" class="menu-item p-4" active-class="active">
        <BIconBagCheck class="icon mr-[10px]"/>
        <p>
          <p>
            商品管理
          </p>
        </p>
      </router-link>
      <router-link to="Order" class="menu-item p-4" active-class="active">
        <BIconCardList class="icon mr-[10px]"/>
        <p>
          <p>
            订单管理
          </p>
        </p>
      </router-link>
      <router-link to="financial" class="menu-item p-4" active-class="active">
        <BIconCreditCard2Back class="icon mr-[10px]"/>
        <p>
          <p>
            财务管理
          </p>
        </p>
      </router-link>
      <router-link to="news" class="menu-item p-4" active-class="active">
        <BIconNewspaper class="icon mr-[10px]"/>
        <p>
          <p>
            新闻公告
          </p>
        </p>
      </router-link>
      <router-link to="system" class="menu-item p-4" active-class="active">
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
import { mapState,mapActions  } from 'pinia'


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
  }),
  methods: {
    ...mapActions(useAuthStore, ['logout']),
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