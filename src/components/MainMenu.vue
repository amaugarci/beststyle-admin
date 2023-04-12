<template>
    <div class=" py-4 px-[24px] flex justify-between items-center border-l-5 text-gray-500 cursor-pointer" :class="{'':!append}" @click="toggleSubmenu">
        <div class="flex items-center">
            <img :src="'../src/assets/icons/'+value.icon+'.svg'" class="icon mr-[12px]"/>
            <p class="font-bold text-[#B2B2B2]  text-[16px]"  :class="{'hidden':!append}">{{ value.name }}</p>
        </div>
        <BIconChevronDown v-if="showSubmenu" class="icon text-[18px]"  :class="{'hidden':!append}"/>
        <BIconChevronRight v-else class="icon text-[18px]"  :class="{'hidden':!append}"/>
    </div>
    <ul v-if="showSubmenu&&getAdmin" class="bg-[#2E313B] ">
        <template v-for="(item, index) in value.submenu" :key="index"  >
            <li v-if="isAvailable(item)" class="py-4 px-[44px]" :class="{'px-[8px]':!append}">
                <router-link :to="{name:item.url}" class="font-bold text-center  text-[16px] nav-link" active-class="active-nav-link"><p class="font-bold">{{ append? item.name:item.name.slice(0,2) }}</p></router-link>
            </li>
        </template>

    </ul>
</template>
  
<script>
import {BIconChevronRight, BIconChevronDown } from 'bootstrap-icons-vue';
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
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
        },
        ...mapState(useAuthStore, ['getAdmin']),
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
        isAvailable(item){
            if(this.getAdmin.permissions[item.id]){
                return true;
            }
            return true;
        }
    },
};
</script>