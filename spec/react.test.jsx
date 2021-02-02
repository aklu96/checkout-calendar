/* eslint-disable */
import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../client/components/App'
import CheckoutBox from '../client/components/checkoutBox';
import NavBar from '../client/components/navBar';
import CalendarBox from '../client/components/calendarBox';
import InputBox from '../client/components/inputBox';
import CalendarTable from '../client/components/calendarTable';
import axios from 'axios';

describe('<App />', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.rowContainer')).toHaveLength(1);
  });
  it('contains checkoutBox', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CheckoutBox)).toHaveLength(1);
  });
  it('does not have navBar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavBar)).toHaveLength(0);
  });
  it('does not have CalendarBox', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CalendarBox)).toHaveLength(0);
  });
  it('does have InputBox mount', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(InputBox)).toHaveLength(1);
  });
});

describe('<CalendarTable />', () => {
  it('table contains right amount of rows for id 1 january', () => {
    axios.get('http://localhost:3010/api/checkout/1').then(response => {
      const month = response.data.availability[0];
      const wrapper = shallow(<CalendarTable month={month}/>);
      expect(wrapper.find('tr')).toHaveLength(6);
    })

  });
  it('table contains right amount of rows for id 1 feb', () => {
    axios.get('http://localhost:3010/api/checkout/1').then(response => {
      const month = response.data.availability[1];
      const wrapper = shallow(<CalendarTable month={month}/>);
      expect(wrapper.find('tr')).toHaveLength(5);
    })

  });
});

