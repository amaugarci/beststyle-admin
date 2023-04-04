<template>
    <select class="form-control mr-[28px] w-[120px] h-[41px]" style="border-radius: 12px;" :value="group" @change="onChnage"  >
        <option value="" selected>{{placeholder}}</option>
        <option v-for="(item, index) in groups" :key="item.id" :value="item.id" >{{item.name}}</option>
    </select>
</template>
  
<script>

export default {
    name:'SelectBox',
    props: {
        placeholder:String,
        groups:Array,
        group:String

    },
    components: {
    },
    data() {
    },
    methods: {
        onChnage(event) {
            this.$emit('onChnage', event.target.value);
        }
    }
};
</script>