<template>
    <div class="mb-5 mb-5">
        <h3 class="shift-heading mb-3">
            <span>Filter</span>
            <div class="bottom-line"></div>
        </h3>
        <p class="m-0 p-0">Filter on Price</p>
        <MultiRangeSlider :label="findMinAndMaxShiftPrice" :min="shiftMinPrice" :max="shiftMaxPrice" :ruler="false"
            :step="10" @input="filterShiftList" />
    </div>
</template>
  
<script>
import MultiRangeSlider from "multi-range-slider-vue";
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'ShiftFilter',
    components: {
        MultiRangeSlider
    },
    data() {
        return {
            shiftMinPrice: 0,
            shiftMaxPrice: 0,
        };
    },

    computed: {
        ...mapState('shifts', ['defaultShiftList']),
        findMinAndMaxShiftPrice() {
            if(this.defaultShiftList && this.defaultShiftList.length > 0) {
                const shiftListData = JSON.parse(JSON.stringify(this.defaultShiftList));
                this.shiftMinPrice = parseInt(shiftListData[0].shiftDateGroup[0].shiftPrice);
                this.shiftMaxPrice = this.shiftMinPrice;
                shiftListData.forEach(shiftData => {
                    shiftData.shiftDateGroup.forEach(shiftDateGroup => {
                        const shiftPrice = parseInt(shiftDateGroup.shiftPrice);
                        if (shiftPrice < this.shiftMinPrice) {
                            this.shiftMinPrice = shiftPrice;
                        }
                        if (shiftPrice > this.shiftMaxPrice) {
                            this.shiftMaxPrice = shiftPrice;
                        }
                    });
                });
            }
            else {
                this.shiftMinPrice = 0;
                this.shiftMaxPrice = 100
            }
        }
    },
    methods: {
        ...mapMutations({
            filterShiftListMutation: 'shifts/filterShiftListMutation',
        }),
        filterShiftList(e) {
            this.filterShiftListMutation(e)
        },

    }
}
</script>