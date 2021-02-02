import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CalendarCarousel from './calendarCarousel';
import CalendarBoxInput from './calendarBoxInput';

const Box = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -24px;
  right: -120%;
  width: 660px;
  z-index: 1;
  min-height: 464px;
`;
const HeaderDiv = styled.div`
  height: 130px;
  width: 100%;
  display: flex;
`;
const DivFlex1 = styled.div`
  flex: 1;
`;
const FlexDiv5 = styled.div`
  flex: 4.54;
  display: flex;
  overflow: hidden;
`;

const Button = styled.button`
  cursor: pointer ;
  display: inline-block ;
  margin: 0px ;
  position: relative ;
  text-align: center ;
  text-decoration: none ;
  width: auto ;
  touch-action: manipulation ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-size: 14px ;
  line-height: 18px ;
  font-weight: 600 ;
  border-radius: 8px ;
  outline: none ;
  padding: 8px 16px ;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s ;
  border: none ;
  background: rgb(34, 34, 34) ;
  color: rgb(255, 255, 255) ;
`;

const ClearButton = styled.button`
  cursor: pointer ;
  display: inline-block ;
  margin: 0px -8px ;
  position: relative ;
  text-align: center ;
  width: auto ;
  touch-action: manipulation ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-size: 14px ;
  line-height: 18px ;
  font-weight: 600 ;
  border-radius: 8px ;
  outline: none ;
  padding: 8px ;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s ;
  border: none ;
  background: transparent ;
  color: rgb(34, 34, 34) ;
  text-decoration: underline ;
`;

const Span = styled.span`
  margin-left: 16px ;
`;

const ButtonContainer = styled.div`
  padding-left: 8px ;
  display: flex ;
  align-items: center ;
  flex: 0 0 auto ;
  z-index: 1 ;
`;

const ButtonRowContainer = styled.div`
  padding-left: 72px ;
  display: flex ;
  justify-content: space-between ;
  align-items: center ;
  padding-left: 12px ;
  padding-right: 34px ;
  margin-bottom: 16px ;
`;

const LeftDateHeading = styled.div`
  color: rgb(34, 34, 34) ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-weight: 600 ;
  font-size: 22px ;
  line-height: 26px ;
  margin-top: 24px;
  margin-left: 32px;
`;

const H2Container = styled.div`
  color: rgb(34, 34, 34) ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-weight: 500 ;
  font-size: 22px ;
  line-height: 26px ;
`;

const H2 = styled.h2`
  color: inherit ;
  font-size: 1em ;
  font-weight: inherit ;
  line-height: inherit ;
  margin: 0px ;
  padding: 0px ;
`;

const LowerContainer = styled.div`
  color: rgb(113, 113, 113) ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-weight: 300 ;
  font-size: 14px ;
  line-height: 18px ;
  padding-top: 8px ;
`;

const LowerDateHeading = styled.div`
  line-height: 18px ;
  max-height: 36px ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  display: -webkit-box ;
  -webkit-line-clamp: 2 ;
  -webkit-box-orient: vertical ;
  height: 36px ;
`;

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.cellHover = this.cellHover.bind(this);
    const { availability } = this.props;
    this.state = {
      availability,
      hover: {},
    };
    this.clearDates = this.clearDates.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { inputClick } = this.props;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      inputClick(false, 'calendar');
    }
  }

  cellHover(hoverM, hoverD) {
    if (!hoverD) {
      this.setState({
        hover: {},
      });
    }
    const { availability } = this.state;
    const { pricing, checkinDate } = this.props;
    const { minStay } = pricing;

    // if checkin has been clicked
    if (checkinDate.day) {
      const { month, day } = checkinDate;
      const potentialDays = availability[month].slice(day, hoverD);
      const availableDays = potentialDays.filter((dayInfo) => dayInfo.available === 0);
      const potentialStay = hoverD - day;
      if (potentialStay === availableDays.length && potentialStay > minStay) {
        this.setState({
          hover: {
            month: hoverM,
            day: hoverD,
          },
        });
      }
    }
  }

  makeNewAvailability() {
    const newAvailability = [];
    const { availability } = this.state;
    availability.forEach((month) => {
      newAvailability.push(month);
    });
    return newAvailability;
  }

  clearDates() {
    const { eraseStateDate } = this.props;
    eraseStateDate('checkinDate');
    eraseStateDate('checkoutDate');
  }

  render() {
    const {
      handleDateClick, checkinDate, checkoutDate, focus,
      pricing, translate, translateLeft, setFocus,
      availableAfterCheckin, eraseStateDate, inputClick, translateRight,
      today,
    } = this.props;
    const { availability, hover } = this.state;
    let headingString;
    const months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec',
    };
    if (checkinDate.day && checkoutDate.day) {
      headingString = `${months[checkinDate.month]} ${checkinDate.day + 1}, 2021 - ${months[checkoutDate.month]} ${checkoutDate.day + 1}, 2021`;
    }
    if (!checkinDate.day && !checkoutDate.day) {
      headingString = 'Add your travel dates for exact pricing';
    }
    if (checkinDate.day && !checkoutDate.day) {
      headingString = `Minimum stay: ${pricing.minStay} nights`;
    }
    return (
      <Box ref={this.wrapperRef}>
        <HeaderDiv>
          <DivFlex1>
            <LeftDateHeading>
              <H2Container>
                <H2>
                  Select dates
                </H2>
              </H2Container>
              <LowerContainer>
                <LowerDateHeading>
                  {headingString}
                </LowerDateHeading>
              </LowerContainer>
            </LeftDateHeading>
          </DivFlex1>
          <CalendarBoxInput
            setFocus={setFocus}
            focus={focus}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
            eraseStateDate={eraseStateDate}
            inputClick={inputClick}
            handleDateClick={handleDateClick}
          />
        </HeaderDiv>
        <FlexDiv5>
          <CalendarCarousel
            handleDateClick={handleDateClick}
            availability={availability}
            cellHover={this.cellHover}
            checkinDate={checkinDate}
            hoverDate={hover}
            checkoutDate={checkoutDate}
            focus={focus}
            availableAfterCheckin={availableAfterCheckin}
            translate={translate}
            translateLeft={translateLeft}
            translateRight={translateRight}
            today={today}
          />
        </FlexDiv5>
        <ButtonRowContainer>
          <DivFlex1 />
          <ButtonContainer>
            <ClearButton onClick={this.clearDates}>Clear dates</ClearButton>
            <Span>
              <Button onClick={() => inputClick(false, 'calendar')}>Close</Button>
            </Span>
          </ButtonContainer>
        </ButtonRowContainer>
      </Box>
    );
  }
}

export default CalendarBox;

CalendarBox.propTypes = {
  inputClick: PropTypes.func.isRequired,
  focus: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
  availableAfterCheckin: PropTypes.number.isRequired,
  availability: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        available: PropTypes.number.isRequired,
        dayOfWeek: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  pricing: PropTypes.shape({
    maxGuests: PropTypes.number,
    price: PropTypes.number,
    serviceFee: PropTypes.number,
    cleaningFee: PropTypes.number,
    minStay: PropTypes.number,
  }).isRequired,
  handleDateClick: PropTypes.func.isRequired,
  checkinDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  checkoutDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  eraseStateDate: PropTypes.func.isRequired,
  translate: PropTypes.number.isRequired,
  translateLeft: PropTypes.func.isRequired,
  translateRight: PropTypes.func.isRequired,
};

CalendarBox.defaultProps = {
  checkinDate: {},
  checkoutDate: {},
};
