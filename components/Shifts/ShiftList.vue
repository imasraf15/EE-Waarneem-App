<template>
  <div>
    <div class="d-flex justify-content-between mb-2">
      <h3 class="shift-heading">
        Shifts
        <div class="bottom-line"></div>
      </h3>
      <b-button variant="dark" class="float-right wid-150" @click="updateShiftFormPanel">Add Shift</b-button>
    </div>
    <div v-if="!shiftList || shiftList.length == 0">
      <h3 class="text-center p-5">No shift records found. To add new records, please click on 'Add Shift'. </h3>
    </div>
    <div v-else>
      <div v-for="(list, index) in shiftList" :key="index">
        <b-card class="mt-4">
          <b-card-text>
            <div class="d-flex justify-content-between">
              <h3 class="col-10 text-truncate pl-0" :title=list.shiftTitle>{{ list.shiftTitle }}</h3>
              <div class="d-flex">            
                <div @click="editShift(list)" class="cursor-pointer mr-2 action-icons"><img src="~/assets/images/edit.svg"/></div>
                <div @click="deleteShift(list)" class="cursor-pointer action-icons"><img src="~/assets/images/delete.svg" /></div>
              </div>
            </div>
            <p>{{ list.shiftDescription }}</p>
          </b-card-text>
          <table class="table table-borderless">
            <tr v-for="(x, index) in list.shiftDateGroup" :key="index">
              <td>{{ x.shiftDate }}</td>
              <td>{{ x.shiftStartTime }}</td>
              <td>{{ x.shiftEndTime }}</td>
              <td>{{ x.shiftType }}</td>
              <td>{{ x.shiftPrice }}</td>
            </tr>
          </table>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
    }
  },

  computed: {
    ...mapState('shifts', ['shiftList']),
  },

  methods: {
    ...mapActions({
      editShiftDetailsAction: 'shifts/editShiftDetailsAction',
    }),
    ...mapMutations({
      showShiftFormPanel: 'shifts/showShiftFormPanel',
      clearShiftDetailsMutation: 'shifts/clearShiftDetailsMutation',
      deleteShiftMutation: 'shifts/deleteShiftMutation',

    }),
    updateShiftFormPanel() {
      this.clearShiftDetailsMutation();
      this.showShiftFormPanel(true);
    },
    editShift(list) {
      this.clearShiftDetailsMutation();
      this.showShiftFormPanel(true)
      this.editShiftDetailsAction(list.shiftId)
    },
    deleteShift(list) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#484848',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteShiftMutation(list.shiftId);
          Swal.fire({     
            title: 'Deleted!',
            text: "Shift file has been deleted.",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    },
  },
}
</script>