
const shifts = {
    namespaced: true,
    
    state: {
        isShowShiftFormPanel: false,
        shiftList: pageLoadShiftList(),
        defaultShiftList: pageLoadShiftList(),
        shiftDetails: loadEmptyShiftDetils(),
    },

    actions: {
        async saveShiftDetailsAction({ commit, state }, shiftId) {
            if (shiftId == 0) {
                state.shiftDetails.shiftId = Math.floor((Math.random() * 100) + 1);
                await commit('updateShiftListMutation', state.shiftDetails);
                return
            }
            else {
                let index = state.shiftList.findIndex(shift => shift.shiftId == shiftId)
                if (index !== -1) {
                    state.shiftList.splice(index, 1);    
                    state.defaultShiftList.splice(index, 1);  
                }
                await commit('updateShiftListMutation', state.shiftDetails);
                return
            }
        },
        async editShiftDetailsAction({ commit, state }, shiftId) {
            let filteredList = state.shiftList.find(list => list.shiftId == shiftId);
            if (filteredList) {
                await commit('editShiftListMutation', filteredList);
                return
            }
        },
    },

    mutations: {
        showShiftFormPanel(state, value) {
            state.isShowShiftFormPanel = value;
        },
        updateShiftListMutation(state, value) {
            state.shiftList.push(value);
            state.defaultShiftList.push(value);
        },      
        editShiftListMutation(state, value) {
            state.shiftDetails = value;
        },
        clearShiftDetailsMutation(state) {
            state.shiftDetails = loadEmptyShiftDetils()
        },
        updateShiftDatesMutation(state, payload) {
            state.shiftDetails.shiftDates = payload;            
        },
        updateShiftDateGroupMutation(state, payload) {
            let filteredData = state.shiftDetails.shiftDateGroup.find(x => x.shiftDate == payload.shiftDate);
            filteredData ? '' : state.shiftDetails.shiftDateGroup.push(payload);
        },
        removeShiftDateGroupMutation(state, shiftGroupId) {
            let index = state.shiftDetails.shiftDateGroup.findIndex(shiftGroup => shiftGroup.shiftGroupId == shiftGroupId)
            if (index !== -1) {
                state.shiftDetails.shiftDateGroup.splice(index, 1);
            }
        },
        removeShiftDateMutation(state, shift) {
            let index = state.shiftDetails.shiftDates.findIndex(shiftDate => formatDate(shiftDate) == shift.shiftDate)
            if (index !== -1) {
                state.shiftDetails.shiftDates.splice(index, 1);
            }
        },
        deleteShiftMutation(state, shiftId) {
            let index = state.shiftList.findIndex(shift => shift.shiftId == shiftId)
            if (index !== -1) {
                state.shiftList.splice(index, 1);
                state.defaultShiftList.splice(index, 1);
            }
        },
        clearShiftDateGroupMutation(state) {            
            state.shiftDetails.shiftDateGroup = []
        },
        filterShiftListMutation (state, value) { 
            let minValue = value.minValue;
            let maxValue = value.maxValue;
            let shiftList = JSON.parse(JSON.stringify(state.defaultShiftList))
            state.shiftList = shiftList.filter(shiftData => {
                return shiftData.shiftDateGroup.some(shiftDateGroup => {
                  const shiftPrice = parseInt(shiftDateGroup.shiftPrice);
                  return shiftPrice >= minValue && shiftPrice <= maxValue;
                });
              });         
        }
    },   
};

function pageLoadShiftList() {
    return [
        {
            shiftId: 10,
            shiftTitle: "Day 1 - Morning Shift",
            shiftDescription: "Day 1 - Morning Shift",
            shiftDates: ["2023-09-02T18:30:00.000Z", "2023-09-02T18:30:00.000Z"],
            shiftDateGroup: [
                {
                    shiftGroupId: 81,
                    shiftDate: "02-09-2023",
                    shiftStartTime: "10:00 am",
                    shiftEndTime: "11:00 am",
                    shiftType: "Consultation",
                    shiftPrice: "150",
                },
                {
                    shiftGroupId: 83,
                    shiftDate: "02-09-2023",
                    shiftStartTime: "11:00 am",
                    shiftEndTime: "11:30 am",
                    shiftType: "Telephone",
                    shiftPrice: "50",
                },
            ]
        }        
    ]
}
function loadEmptyShiftDetils() {
    return {
        shiftId: 0,
        shiftTitle: '',
        shiftDescription: '',
        shiftDates: [],
        shiftDateGroup: [],
    }
};

function formatDate(value) {
    if (value) {
        let date = new Date(value);
        const formatDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const formatMonth = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        return [formatDate, formatMonth, date.getFullYear()].join('-');
    }
}

export default shifts;
