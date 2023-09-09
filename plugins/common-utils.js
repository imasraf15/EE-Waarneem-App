import Vue from "vue"

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ 
    methods: {
        formatDate(value) {
            if (value) {
                let date = new Date(value);
                const formatDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                const formatMonth = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
                return [formatDate, formatMonth, date.getFullYear()].join('-');
            }
        }
    }
  })
}