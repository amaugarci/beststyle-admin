<template>
    <div class="pagination mt-[24px] flex items-center justify-center">
        <p class="mr-[13px]">共1条</p>
        <select class="form-control mr-[28px] pagination-select" :value="index" @change="onchangePage" >
            <option value="15" >15条/页</option>
            <option value="30" >30条/页</option>
            <option :value="totalItems" >全部</option>
        </select>
        <!-- pagination -->
        <vue-awesome-paginate v-if="index<totalItems"
            :total-items="totalItems"
            v-model="computedcurrentPage"
            :items-per-page="index"
            :max-pages-shown="6"
            paginate-buttons-class="h-[40px] w-[40px] border-none m-[5px] cursor-pointer pagination-bg"
            active-page-class="pagination-active-bg  text-white"
            :on-click="onClick"
        />
    </div>
</template>
  
<script>

export default {
    name:'Pagination',
    props: {
        index:Number,
        currentPage:Number,
        totalItems:Number,
    },
    components: {

    },
    computed:{
        computedcurrentPage: {
            get() {
                return this.currentPage;
            },
            set(value) {
            }
        }
    },
    data() {
    },
    methods: {
        onClick(event) {
            this.$emit('onClick', event);
        },
        onchangePage(event) {
            this.$emit('onchangePage', event.target.value);
        },
    }
};
</script>