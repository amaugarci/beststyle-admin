<template>
    <div class=" py-4 px-[24px] flex justify-between items-center border-l-5 text-gray-500 cursor-pointer" :class="{'':!append}" @click="toggleSubmenu">
        <div class="flex items-center">
            <img :src="'../src/assets/icons/'+value.icon+'.svg'" class="icon mr-[12px]"/>
            <p class="font-bold text-[#B2B2B2]  text-[16px]"  :class="{'hidden':!append}">{{ value.name }}</p>
        </div>
        <BIconChevronDown v-if="showSubmenu" class="icon text-[18px]"  :class="{'hidden':!append}"/>
        <BIconChevronRight v-else class="icon text-[18px]"  :class="{'hidden':!append}"/>
    </div>
    <ul v-if="showSubmenu" class="bg-[#2E313B] ">
        <li v-for="(item, index) in value.submenu" :key="index" class="py-4 px-[44px]" :class="{'px-[8px]':!append}">
            <router-link :to="item.url" class="font-bold  text-[16px] nav-link" active-class="active-nav-link"><p >{{ append? item.name:item.name.slice(0,2) }}</p></router-link>
        </li>
    </ul>
</template>
  
<script>
import {BIconChevronRight, BIconChevronDown } from 'bootstrap-icons-vue';

export default {
    name:'mainmenu',
    props: {
        value:Object,
        append:Boolean
    },
    components: {
        BIconChevronDown,
        BIconChevronRight
    },
    data() {
        return {
            showSubmenu: false,
        };
    },
    computed: {
        currentUrl() {
            return window.location.href;
        }
    },
    mounted(){
        this.value.submenu.forEach(item => {
            if(this.currentUrl.includes(item.url)){
                this.showSubmenu=true;
            }
        });
    },
    methods: {
        toggleSubmenu() {
            this.showSubmenu = !this.showSubmenu;
        },
    },
};
</script>