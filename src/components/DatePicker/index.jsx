import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class LimitDatePicker extends Component {


  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('day');
  }
  disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }
  }

  handleChangle = (start, end) => {

  }


  render() {
    const { RangePicker } = DatePicker;
    return (
      <RangePicker
        disabledDate={this.disabledDate}
        disabledTime={this.disabledRangeTime}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        onChange={this.handleChangle}
      />
    )
  }
}
export default LimitDatePicker
