<template>
    <button @click="click" class="w-[83px] h-[33px] bg-[#CBCBCB]  rounded-[8px] text-white text-center" :class="{'bg-gradient-to-r from-blue-400 to-blue-500':active}">
        {{ name }}
    </button>
</template>
  
<script>

export default {
    name:'button',
    props: {
        name:String,
        active:Boolean,

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