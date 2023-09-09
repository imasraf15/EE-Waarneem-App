import { extend } from "vee-validate";
import { required, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,   
  message: "The {_field_} is required"
});

extend("max", {
  ...max,   
  validate(value, { max }) {
    if (value.length <= max) {
      return true;
    }
    return false;
  },
  params: ['max'], 
  message: "The {_field_} may not be greater than {max} characters"
});

extend('maxDataRangeCheck', {
  validate: (value) => {
    if(value.length <= 10) {
      return true;
    }
    return false;
  },
  message: 'The {_field_} should contain only 10 days.'
});

extend("greater", {
  params: ["target"],
  convertTimeToMin(value) {
    let timeParts = value.match(/(\d+):(\d+) ([apm]{2})/);
    const hour = parseInt(timeParts[1], 10);
    const minute = parseInt(timeParts[2], 10);
    const period = timeParts[3];
    const hour24 = (hour === 12 ? 0 : hour) + (period === 'PM' ? 12 : 0);
    return hour24 * 60 + minute;
  },
  validate(value, { target }) {
    let toTime = this.convertTimeToMin(value)
    let fromTime = this.convertTimeToMin(target)
    if( toTime < fromTime) {
      return false;
    }
    return true;
  },
  message: "End time must be greater then from time"
});
