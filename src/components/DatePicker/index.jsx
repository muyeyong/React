import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

  class LimitDatePicker extends Component {


    range=(start, end)=> {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }

    disabledDate=(current)=> {
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


  render() {
    const { RangePicker } = DatePicker;
    return (
      <RangePicker
        disabledDate={this.disabledDate}
        disabledTime={this.disabledRangeTime}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
        }}
        format="YYYY-MM-DD HH:mm:ss"
      />
    )
  }
}
export default LimitDatePicker
