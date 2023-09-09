<template>
    <div>
        <div v-for="(shift, index) in shiftDetails.shiftDateGroup" :key="index" >
            <div class="d-flex justify-content-between align-items-end">
                <h6>{{ shift.shiftDate }} </h6>
                <div @click="removeShiftDateGroup(shift)" class="cursor-pointer"><h4>x</h4></div>
            </div>
            <div class="shift-date-group-bg mb-3">
                <b-row class="shift-date-group-panel">
                    <b-col>
                        <ValidationProvider rules="required" v-slot="{ errors }" :name="shift.shiftStartTime">
                            <b-form-group label="Start Time">
                                <date-picker v-model="shift.shiftStartTime" format="hh:mm a" value-type="format" type="time"
                                placeholder="hh:mm a"></date-picker>
                                <span class="error-message" v-if="errors[0]">Start time {{ index + 1 }} is required</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col>
                        <!-- :rules="`required|greater:@{shiftshiftStartTime}`" -->
                       
                        <ValidationProvider :rules="`required|greater:@${shift.shiftStartTime}`" v-slot="{ errors }" :name="shift.shiftEndTime">
                            <b-form-group label="End Time">
                                <date-picker v-model="shift.shiftEndTime" format="hh:mm a" value-type="format" type="time"
                                placeholder="hh:mm a"></date-picker>
                                <span class="error-message">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col>
                        <ValidationProvider rules="required" v-slot="{ errors }" :name="shift.shiftPrice">
                            <b-form-group label="Price" class="position-relative">
                                <input type="number" class="form-control" v-model="shift.shiftPrice" placeholder="Price">
                                <img src="~/assets/images/euro-sign.svg" class="position-absolute" style="top: 2px; right: 2px;"/>
                                <span class="error-message" v-if="errors[0]">Price {{ index + 1 }} is required</span>
                            </b-form-group>
                        </ValidationProvider>                      
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ValidationProvider rules="required" v-slot="{ errors }" :name="shift.shiftType">
                        <b-form-group label="Type">
                            <select class="form-control" v-model="shift.shiftType">
                                <option value="">Select Type</option>
                                <option value="Consultation">Consultation</option>
                                <option value="Telephone">Telephone</option>
                                <option value="Ambulance">Ambulance</option>
                            </select>
                            <span class="error-message" v-if="errors[0]">Type {{ index + 1 }} is required</span>
                        </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ValidationProvider } from "vee-validate";

export default {
    components: { DatePicker,ValidationProvider },
    computed: {
        ...mapState('shifts', ['shiftDetails']),
    },
    methods: {
        ...mapMutations({
            removeShiftDateGroupMutation: 'shifts/removeShiftDateGroupMutation',
            removeShiftDateMutation: 'shifts/removeShiftDateMutation'
        }),
        removeShiftDateGroup(shift) {
            this.removeShiftDateGroupMutation(shift.shiftGroupId);
            this.removeShiftDateMutation(shift);
        }
    }
}
</script>