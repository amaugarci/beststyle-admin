<template>
    <button @click="click" class=" flex items-center py-[8px] bg-[#0B88F9]  rounded-[8px] text-white text-center" :class="{'pl-[15px] pr-[33px]':icon!='none','flex justify-center':icon=='none'}" >
        <img v-if="icon!='none'" :src="'/assets/icons/'+icon+'.svg'" class="icon mr-[12px]"/>
        <p class="font-black">{{ name }}</p>
    </button>
</template>
  
<script>

export default {
    name:'button',
    props: {
        name:String,
        icon:String,
    },
    components: {
    },
    data() {
    },
    methods: {
        click(event) {
            this.$emit('onclick', event);
        }
    }
};
</script>