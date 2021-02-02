import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { get } from 'axios';
import { PropTypes } from 'prop-types';
import CheckoutBox from './checkoutBox';
import NavBar from './navBar';

const LeftColumn = styled.div`
  flex: 1.8;
  box-sizing: border-box;
`;

const RightColumn = styled.div`
  flex: 1.2;
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1128px;
  width: 100%;
  margin: 0 auto;
  height: 1000px;
  display: flex;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

class App extends React.Component {
  // eslint-disable-next-line consistent-return
  static calculateFirstAvailable(month, day, availability) {
    let days;
    let m = month;
    let firstDayAvailable = day + 1;
    for (; m < 12; m += 1) {
      days = availability[m];
      if (m !== month) {
        firstDayAvailable = 0;
      }
      for (; firstDayAvailable < days.length; firstDayAvailable += 1) {
        if (days[firstDayAvailable].available === 0) {
          return {
            day: firstDayAvailable,
            month: m,
          };
        }
      }
    }
  }

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      scrollPos: 0,
      calendar: false,
      guest: false,
      availability: [],
      pricing: {},
      today: {
        month: today.getMonth(),
        day: today.getDate() - 1,
      },
      firstDayAvailable: {
        month: 0,
        day: 1,
      },
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.inputClick = this.inputClick.bind(this);
    this.guestInputClick = this.guestInputClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.getData(id);
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({
      scrollPos: window.scrollY,
    });
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  getData(id) {
    get(`/api/checkout/${id}`).then(({ data }) => {
      const { availability } = data;
      delete data.availability;
      this.setState({
        availability,
        pricing: data,
      });
      const { today } = this.state;
      const { month, day } = today;
      const firstDayAvailable = App.calculateFirstAvailable(month, day, availability);
      this.setState({
        firstDayAvailable,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  inputClick(toRender, whichModal) {
    this.setState({
      [whichModal]: toRender,
    });
  }

  guestInputClick() {
    this.setState((state) => ({
      guest: !state.guest,
    }));
  }

  renderNavBar() {
    const { scrollPos } = this.state;
    return scrollPos > 500 ? <NavBar /> : <></>;
  }

  render() {
    const {
      availability,
      guest,
      calendar,
      pricing,
      focus,
      today,
      firstDayAvailable,
    } = this.state;
    return (
      <RowContainer className="rowContainer">
        <GlobalStyle />
        {this.renderNavBar()}
        <Container>
          <LeftColumn />
          <RightColumn>
            <CheckoutBox
              availability={availability}
              renderGuest={guest}
              renderCalendar={calendar}
              inputClick={this.inputClick}
              pricing={pricing}
              focus={focus}
              firstDayAvailable={firstDayAvailable}
              today={today}
              guestInputClick={this.guestInputClick}
            />
          </RightColumn>
        </Container>
      </RowContainer>
    );
  }
}

export default App;

App.propTypes = {
  id: PropTypes.number.isRequired,
};
