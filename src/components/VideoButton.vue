<template>
    <label @click="click" for="AcceptConditions" class="relative h-8 w-14 cursor-pointer">
    <span
        class="absolute inset-0 rounded-full bg-gray-300 transitio" :class="{'bg-green-500':active}"
    ></span>
    <span
        class="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition " :class="{'translate-x-6':active}"
    ></span>
    </label>
</template>
  
<script>

export default {
    name:'button',
    props: {
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