<template>
    <div @click="click" class="flex items-center w-[80px] h-[30px] justify-center rounded-[10px] border-gray-100 border-[3px]" :class="{'bg-[#0B88F9]':value==index}">
        <svg
            class=" h-5 w-5"
            :class="{'hidden':value!=index}"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            :fill="'#FFFFFF'"
        >
            <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
            />
        </svg>
        <p class="text-sm font-medium">{{name}}</p>
  </div>
</template>
  
<script>

export default {
    name:'radiobutton',
    props: {
        name:String,
        value:Number,
        index:String,
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