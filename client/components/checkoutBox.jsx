import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import InputBox from './inputBox';

const StyledDiv = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 48px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 120px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const DivFlex1 = styled.div`
  height: 82px;
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between !important;
  align-items: baseline !important;
  flex-direction: column;
`;

const TitleSubHeading = styled.div`
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 300 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  display: flex !important;
  flex: .5 0 0;
  margin-bottom: 16px;
`;

const TitleTopHeading = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: space-between !important;
  align-items: baseline !important;
  width: 100%;
  margin-bottom: 24px;
`;

const DivFlex = styled.div`
  flex: 1 0 auto;
  display: block;
`;

const ReservationButton = styled.button`
  cursor: pointer !important;
  display: inline-block !important;
  margin: 0px !important;
  position: relative !important;
  text-align: center !important;
  text-decoration: none !important;
  touch-action: manipulation !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  outline: none !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  border: none !important;
  background: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%) !important;
  color: rgb(255, 255, 255) !important;
  width: 100% !important;
`;

const Span = styled.span`
  position: absolute !important;
  top: 0px !important;
  left: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  width: 100% !important;
  height: 100% !important;
`;

const InnerSpan = styled.span`
  background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%);
  --mouse-x: ${(props) => props.x};
  --mouse-y: ${(props) => props.y};
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  background-size: 200% 200% !important;
  background-image: radial-gradient(circle at center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%) !important;
  border-radius: 8px;
`;

const TitleSpan = styled.span`
  display: block !important;
  position: relative !important;
  pointer-events: none !important;
  cursor: pointer !important;
  display: inline-block !important;
  margin: 0px !important;
  position: relative !important;
  text-align: center !important;
  text-decoration: none !important;
  touch-action: manipulation !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  outline: none !important;
  padding: 14px 24px !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  border: none !important;
`;

const TitleItem = styled.div`
  flex: 0 0 auto;
  display: block;
`;

const TitlSpan = styled.span`
  font-size: 22px !important;
  line-height: 26px !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
`;

const SmallSpan = styled.span`
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  white-space: nowrap !important;
  padding-left: 4px !important;
`;

const ReviewsDiv = styled.div`
  display: block;
  flex: 0 0 auto;
`;

const ReviewSpanLeft = styled.span`
  color: rgb(34, 34, 34) !important;
  padding-left: 4px !important;
  font-weight: 600 !important;
`;

const ReviewSpanRight = styled.span`
  color: rgb(113, 113, 113) !important;
  padding-left: 4px !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 300;
  font-size: 14px;
`;

const SVG = styled.svg`
  display: block;
  height: 16px;
  width: 16px;
  fill: currentcolor;
`;

const StarSpan = styled.span`
  font-size: 14px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  color: rgb(255, 56, 92);
`;

const CalendarIconDiv = styled.div`
  margin-right: 8px !important;
  display: block;
`;

const SubSpan = styled.span`
  flex: 0 1 auto;
  margin-right: 8px;
`;

const SubSpanLink = styled.span`
  flex: 1;
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
`;

const PricingSpan = styled.span`
  font-weight: 300 !important;
  color: rgb(34, 34, 34) !important;
  display: block !important;
  text-align: left !important;
  text-decoration: underline;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  flex: 0 0 auto;
`;

const PricingSpanRight = styled.span`
  padding-left: 16px !important;
  text-decoration: underline;
  white-space: nowrap !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 300 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  flex: 0 0 auto;
`;

const TotalSpan = styled.span`
  white-space: nowrap !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  flex: 0 0 auto;
`;

const TotalSpanRight = styled.span`
  white-space: nowrap !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  flex: 0 0 auto;
`;

const PriceListItem = styled.li`
  padding-bottom: 12px !important;
  display: flex !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  justify-content: space-between;
`;

const StyledList = styled.ul`
  margin-top: 16px;
`;

const TotalDiv = styled.div`
  border-top: 1px solid rgb(221, 221, 221) !important;
  font-weight: 800;
  text-direction: none;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 24px;
  padding-bottom: 4px;
`;

const ChargedDiv = styled.div`
  font-weight: 300;
  font-size: 14px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

class CheckoutBox extends React.Component {
  static calculateAvailable(month, day, availability) {
    const days = availability[month];
    let lastDayAvailable = day + 1;
    for (; lastDayAvailable < days.length; lastDayAvailable += 1) {
      if (days[lastDayAvailable].available === 1) {
        break;
      }
    }
    return lastDayAvailable;
  }

  constructor(props) {
    super(props);
    const { today } = this.props;
    this.state = {
      checkinDate: {},
      checkoutDate: {},
      focus: 'checkin',
      adults: 1,
      children: 0,
      infants: 0,
      availableAfterCheckin: 0,
      translate: 1600 - today.month * 320,
      x: 0,
      y: 0,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.eraseStateDate = this.eraseStateDate.bind(this);
    this.updateGuests = this.updateGuests.bind(this);
    this.translateLeft = this.translateLeft.bind(this);
    this.translateRight = this.translateRight.bind(this);
    this.checkAvailabilityClick = this.checkAvailabilityClick.bind(this);
    this.changeButtonBackground = this.changeButtonBackground.bind(this);
    this.buttonRef = React.createRef();
  }

  handleDateClick(month, day) {
    const {
      focus,
      adults,
      children,
      infants,
    } = this.state;
    const { inputClick } = this.props;
    if (focus === 'checkout') {
      this.setState({
        checkoutDate: {
          month,
          day,
        },
      });
      inputClick(false, 'calendar');
      if (adults + children + infants === 1) {
        inputClick(true, 'guest');
      }
    } else {
      this.setState({
        checkinDate: {
          month,
          day,
        },
        focus: 'checkout',
      });
      this.availableAfterCheckin(month, day);
    }
  }

  setFocus(whichFocus) {
    const { checkinDate } = this.state;
    if (!checkinDate.day) {
      this.setState({
        focus: 'checkin',
      });
    } else {
      this.setState({
        focus: whichFocus,
      });
    }
  }

  updateGuests(whichGuest, operator) {
    if (operator === '+') {
      this.setState((state) => ({
        [whichGuest]: state[whichGuest] + 1,
      }));
    } else {
      this.setState((state) => ({
        [whichGuest]: state[whichGuest] - 1,
      }));
    }
  }

  availableAfterCheckin(month, day) {
    const { availability } = this.props;
    const lastDayAvailable = CheckoutBox.calculateAvailable(month, day, availability);
    this.setState({
      availableAfterCheckin: lastDayAvailable,
    });
  }

  eraseStateDate(whichDate) {
    if (whichDate === 'checkinDate') {
      this.setState({
        checkinDate: {},
        checkoutDate: {},
        focus: 'checkin',
      });
    } else {
      this.setState({
        [whichDate]: {},
      });
    }
  }

  translateLeft() {
    this.setState((state) => ({
      translate: state.translate + 320,
    }));
  }

  translateRight() {
    this.setState((state) => ({
      translate: state.translate - 320,
    }));
  }

  checkAvailabilityClick() {
    const { inputClick } = this.props;
    inputClick(true, 'calendar');
  }

  changeButtonBackground(e) {
    const elementRectangle = this.buttonRef.current.getBoundingClientRect();
    this.setState({
      x: ((e.pageX - elementRectangle.left) / elementRectangle.width) * 100,
      y: ((e.pageY - (window.scrollY + elementRectangle.top)) / elementRectangle.height) * 100,
    });
  }

  render() {
    const {
      availability, pricing, firstDayAvailable, guestInputClick,
      inputClick, renderCalendar, renderGuest, today,
    } = this.props;
    const {
      checkinDate, checkoutDate, focus, availableAfterCheckin,
      adults, children, infants, translate, x, y,
    } = this.state;
    const passDownGuests = { adults, children, infants };
    const buttonText = checkinDate.day && checkoutDate.day ? 'Reserve' : 'Check Availability';
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
    const { price, cleaningFee } = pricing;
    const nights = checkoutDate.day - checkinDate.day;
    const guests = adults + children;
    let { serviceFee } = pricing;
    serviceFee = Math.floor((nights / 1.2) * (guests / 1.5) * serviceFee);
    const total = price * nights + cleaningFee + serviceFee;
    const listElement = (
      <div>
        <ChargedDiv>
          You won&apos;t be charged yet
        </ChargedDiv>
        <StyledList>
          <PriceListItem>
            <PricingSpan>{`${price} x ${nights} nights`}</PricingSpan>
            <PricingSpanRight>{`$${price * nights}`}</PricingSpanRight>
          </PriceListItem>
          <PriceListItem>
            <PricingSpan>Cleaning Fee</PricingSpan>
            <PricingSpanRight>{`$${cleaningFee}`}</PricingSpanRight>
          </PriceListItem>
          <PriceListItem>
            <PricingSpan>Service Fee</PricingSpan>
            <PricingSpanRight>{`$${serviceFee}`}</PricingSpanRight>
          </PriceListItem>
        </StyledList>
        <TotalDiv>
          <TotalSpan>Total</TotalSpan>
          <TotalSpanRight>{`$${total}`}</TotalSpanRight>
        </TotalDiv>
      </div>
    );
    const pricingList = checkinDate.day && checkoutDate.day ? listElement : <></>;
    const calendarPathTop = 'M 23 21.5 a 2.502 2.502 0 0 0 -2.5 2.5 v 6.767 c 0.182 -0.094 0.354 -0.207 0.5 -0.353 L 29.414 22 c 0.146 -0.146 0.26 -0.318 0.353 -0.5 H 23 Z M 30 5 c 0 -1.103 -0.897 -2 -2 -2 h -5.7 V 1 h -2.6 v 2 h -7.4 V 1 H 9.7 v 2 H 4 c -1.103 0 -2 0.897 -2 2 v 5.5 h 28 V 5 Z M 12.5 7 h -3 V 5 h 3 v 2 Z m 10 0 h -3 V 5 h 3 v 2 Z';
    const calendarPathBottom = 'M 23 18.5 h 7 v -5 H 2 V 26 c 0 2.757 2.243 5 5 5 h 10.5 v -7 c 0 -3.032 2.468 -5.5 5.5 -5.5 Z';
    return (
      <StyledDiv className="checkoutBox">
        <DivFlex1>
          <TitleTopHeading>
            <TitleItem>
              <TitlSpan>{`$${pricing.price || 100}`}</TitlSpan>
              <SmallSpan>/ night</SmallSpan>
            </TitleItem>
            <ReviewsDiv>
              <StarSpan>&#9733;</StarSpan>
              <ReviewSpanLeft>4.82</ReviewSpanLeft>
              <ReviewSpanRight>(267)</ReviewSpanRight>
            </ReviewsDiv>
          </TitleTopHeading>
          <TitleSubHeading>
            <CalendarIconDiv>
              <SVG viewBox="0 0 32 32">
                <path d={calendarPathTop} />
                <path d={calendarPathBottom} />
              </SVG>
            </CalendarIconDiv>
            <SubSpan>
              {`Earliest availability is ${months[firstDayAvailable.month]} ${firstDayAvailable.day + 1}`}
            </SubSpan>
            <SubSpanLink onClick={() => inputClick(true, 'calendar')}>Add check-in date</SubSpanLink>
          </TitleSubHeading>
        </DivFlex1>
        <InputBox
          availability={availability}
          renderGuest={renderGuest}
          renderCalendar={renderCalendar}
          inputClick={inputClick}
          pricing={pricing}
          handleDateClick={this.handleDateClick}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          focus={focus}
          setFocus={this.setFocus}
          availableAfterCheckin={availableAfterCheckin}
          eraseStateDate={this.eraseStateDate}
          updateGuests={this.updateGuests}
          passDownGuests={passDownGuests}
          translate={translate}
          translateLeft={this.translateLeft}
          translateRight={this.translateRight}
          guestInputClick={guestInputClick}
          today={today}
        />
        <DivFlex>
          <ReservationButton onClick={this.checkAvailabilityClick}>
            <Span>
              <InnerSpan
                x={x}
                y={y}
                ref={this.buttonRef}
                onMouseMove={this.changeButtonBackground}
              />
            </Span>
            <TitleSpan>
              {buttonText}
            </TitleSpan>
          </ReservationButton>
        </DivFlex>
        {pricingList}
      </StyledDiv>
    );
  }
}

export default CheckoutBox;

CheckoutBox.propTypes = {
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
  renderGuest: PropTypes.bool.isRequired,
  renderCalendar: PropTypes.bool.isRequired,
  inputClick: PropTypes.func.isRequired,
  pricing: PropTypes.shape({
    maxGuests: PropTypes.number,
    price: PropTypes.number,
    serviceFee: PropTypes.number,
    cleaningFee: PropTypes.number,
    minStay: PropTypes.number,
  }).isRequired,
  firstDayAvailable: PropTypes.number.isRequired,
  today: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }).isRequired,
  guestInputClick: PropTypes.func.isRequired,
};
