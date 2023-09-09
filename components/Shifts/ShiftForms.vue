<template>
    <b-sidebar no-header right shadow width="500px" :visible="isShowShiftFormPanel">
        <div class="p-3">
            <div class="d-flex justify-content-between">
                <h3 class="shift-heading">
                    <span v-if="shiftDetails.shiftId == 0">Create Shift</span>
                    <span v-else>Edit Shift</span>
                    <div class="bottom-line"></div>
                </h3>
                <div @click="showShiftFormPanel(false)" class="cursor-pointer">
                    <h4>x</h4>
                </div>
            </div>          
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <ValidationProvider rules="required|max:100" v-slot="{ errors }"
                        name="shift title">
                        <b-form-group label="Title">
                            <input v-model="shiftDetails.shiftTitle" type="text" class="form-control"
                                placeholder="Enter Shift Title" />
                            <span class="error-message">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider rules="max:500" v-slot="{ errors }" name="shift description">
                        <b-form-group label="Description">
                            <textarea v-model="shiftDetails.shiftDescription" class="form-control"
                                placeholder="Enter Shift Description"></textarea>
                            <span class="error-message">{{ errors[0] }}</span>
                        </b-form-group>
                    </ValidationProvider>
                    <b-form-group label="Dates">
                        <ValidationProvider name="shift date" rules="required|maxDataRangeCheck" v-slot="{ errors }">
                            <date-picker v-model="shiftDetails.shiftDates" multiple name="shiftDates" class="from-control"
                                placholder="Enter Date" @input="updateShiftDates"></date-picker>
                            <span class="error-message">{{ errors[0] }}</span>
                            <shifts-shift-date-group v-if="!errors[0]" />
                        </ValidationProvider>
                    </b-form-group>
                    <div class="text-right mt-3 mb-3">
                        <b-button type="submit" class="wid-150" variant="dark">
                            <span v-if="shiftDetails.shiftId == 0">SAVE</span>
                            <span v-else>UPDATE</span>
                        </b-button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </b-sidebar>
</template>


<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Swal from 'sweetalert2'
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
    name: 'IndexPage',   
    components: { DatePicker, ValidationProvider, ValidationObserver },
    computed: {
        ...mapState('shifts', ['isShowShiftFormPanel', 'shiftDetails']),
    },
    methods: {
        ...mapActions({
            saveShiftDetailsAction: 'shifts/saveShiftDetailsAction',
        }),
        ...mapMutations({
            showShiftFormPanel: 'shifts/showShiftFormPanel',
            clearShiftDetailsMutation: 'shifts/clearShiftDetailsMutation',
            clearShiftDateGroupMutation: 'shifts/clearShiftDateGroupMutation',
            updateShiftDatesMutation: 'shifts/updateShiftDatesMutation',
            updateShiftDateGroupMutation: 'shifts/updateShiftDateGroupMutation'
        }),

        onSubmit() {
            this.saveShiftDetailsAction(this.shiftDetails.shiftId);
            this.showShiftFormPanel(false);
            this.clearShiftDetailsMutation();
            Swal.fire({
                icon: 'success',
                title: 'Shift Details has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        },
        updateShiftDates(e) {
            this.updateShiftDatesMutation(e);
            if(this.shiftDetails.shiftDates && this.shiftDetails.shiftDates.length > 0) {
                this.shiftDetails.shiftDates.forEach(element => {
                    this.updateShiftDateGroupMutation({ 
                        shiftGroupId: Math.floor((Math.random() * 100) + 1), 
                        shiftDate: this.formatDate(new Date(element)), 
                        ...this.loadEmptyShiftDateGroup() 
                    })
                });
            } 
            else {
                this.clearShiftDateGroupMutation()
            }
        },       
        loadEmptyShiftDateGroup() {
            return {
                shiftStartTime: '',
                shiftEndime: '',
                shiftPrice: '',
                shiftType: '',
            }
        },    
    }
}
</script>