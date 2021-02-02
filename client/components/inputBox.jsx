import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CalendarBox from './calendarBox';
import GuestMenu from './guestMenu';

const MainInput = styled.div`
  height: 90%;
  width: 100%;
  border: 1px solid rgb(176, 176, 176);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const BottomRow = styled.div`
  flex: 1 1 0;
  border-top: 1px solid rgb(176, 176, 176);
  position: relative;
  display: block;
  box-shadow: ${(props) => (props.focus === 'guest' ? 'rgb(34, 34, 34) 0px 0px 0px 2px inset' : 'none')};
  background-color: ${(props) => (props.focus === 'guest' ? 'rgb(255, 255, 255)' : 'transparent')};
  border-radius: ${(props) => (props.focus === 'guest' ? '8px' : '0px')};
`;

const DivFlex2 = styled.div`
  height: 125px;
  flex: 2 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const TopLeft = styled.div`
  position: relative ;
  flex: 1 1 0% ;
  padding: 0px ;
  width: 100% ;
  z-index: 8px;
`;

const TopRight = styled.div`
  position: relative ;
  flex: 1 1 0% ;
  padding: 0px ;
  width: 100% ;
  border-left: 1px solid rgb(176, 176, 176) ;
  z-index: 8px;
`;

const TopRow = styled.div`
  position: relative ;
  display: flex ;
  width: 100% ;
  margin: 0px ;
  border: none transparent ;
  color: rgb(34, 34, 34) ;
  background-color: transparent ;
  box-shadow: none ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-size: 16px ;
  line-height: 20px ;
  font-weight: 400 ;
  outline: 0px ;
  flex: 1 1 0;
  height: 100%;
`;

const InputTopHeading = styled.div`
  position: absolute ;
  top: 12px ;
  left: 12px ;
  right: 12px ;
  margin: 0px ;
  padding: 0px ;
  pointer-events: none ;
  font-size: 10px ;
  line-height: 12px ;
  color: rgb(34, 34, 34) ;
  text-transform: uppercase ;
  font-weight: 800 ;
  max-width: 100% ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  white-space: nowrap ;
`;

const InputBottomHeading = styled.div`
  width: 100% ;
  border: none ;
  outline: none ;
  margin: 0px ;
  padding: 26px 12px 10px ;
  background-color: transparent ;
  font-family: inherit ;
  font-size: 14px ;
  font-weight: inherit ;
  line-height: 18px ;
  appearance: none ;
  cursor: pointer ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  white-space: nowrap ;
  color: rgb(113, 113, 113) ;
`;

const LowerRowTopDiv = styled.div`
  position: absolute ;
  top: 12px ;
  left: 12px ;
  right: 12px ;
  margin: 0px ;
  padding: 0px ;
  pointer-events: none ;
  font-size: 10px ;
  line-height: 12px ;
  color: rgb(34, 34, 34) ;
  text-transform: uppercase ;
  font-weight: 800 ;
  max-width: 100% ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  white-space: nowrap ;
`;

const LowerRowBottomDiv = styled.div`
  width: 80% ;
  border: none ;
  outline: none ;
  margin: 0px ;
  padding: 26px 36px 10px 12px ;
  background-color: transparent ;
  color: inherit ;
  font-family: inherit ;
  font-size: inherit ;
  font-weight: 300 ;
  line-height: 16 ;
  appearance: none ;
  cursor: pointer ;
  overflow: hidden ;
  text-overflow: ellipsis ;
  white-space: nowrap ;
  font-size: 14px ;
  line-height: 18px
`;

const RightIconDiv = styled.div`
  -webkit-box-pack: center ;
  -webkit-box-align: center ;
  position: absolute ;
  right: 0px ;
  top: 0px;
  display: flex ;
  align-items: center ;
  justify-content: center ;
  height: 100% ;
  max-width: 50% ;
  min-width: 36px ;
  padding-right: 12px ;
  pointer-events: none ;
  color: rgb(34, 34, 34) ;

`;

const SVG = styled.svg`
  height: 16px;
  width: 16px;
  display: block;
  fill: currentcolor;
`;

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.leftCalendarButton = React.createRef();
    this.rightCalendarButton = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    const { inputClick, setFocus } = this.props;
    if (e.target === this.leftCalendarButton.current) {
      inputClick(true, 'calendar');
      setFocus('checkin');
    }
    if (e.target === this.rightCalendarButton.current) {
      inputClick(true, 'calendar');
      setFocus('checkout');
    }
  }

  render() {
    const {
      renderCalendar, renderGuest, inputClick,
      focus, setFocus, availableAfterCheckin, passDownGuests,
      availability, pricing, handleDateClick, checkinDate,
      checkoutDate, eraseStateDate, updateGuests, translate,
      translateLeft, translateRight, guestInputClick, today,
    } = this.props;

    const cal = (
      <CalendarBox
        inputClick={inputClick}
        availability={availability}
        pricing={pricing}
        handleDateClick={handleDateClick}
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        focus={focus}
        setFocus={setFocus}
        availableAfterCheckin={availableAfterCheckin}
        eraseStateDate={eraseStateDate}
        translate={translate}
        translateLeft={translateLeft}
        translateRight={translateRight}
        today={today}
      />
    );
    const element = renderCalendar ? cal : <></>;
    const guest = (
      <GuestMenu
        pricing={pricing}
        passDownGuests={passDownGuests}
        updateGuests={updateGuests}
        inputClick={inputClick}
      />
    );
    const upPath = 'm 1.71 13.71 a 1 1 0 1 1 -1.42 -1.42 l 8 -8 a 1 1 0 0 1 1.41 0 l 8 8 a 1 1 0 1 1 -1.41 1.42 l -7.29 -7.29 Z';
    const downPath = 'm 16.29 4.3 a 1 1 0 1 1 1.41 1.42 l -8 8 a 1 1 0 0 1 -1.41 0 l -8 -8 a 1 1 0 1 1 1.41 -1.42 l 7.29 7.29 Z';
    const guestRender = renderGuest ? guest : <></>;
    const chevronUp = (
      <SVG viewBox="0 0 18 18">
        <path d={upPath} />
      </SVG>
    );
    const chevronDown = (
      <SVG viewBox="0 0 18 18">
        <path d={downPath} />
      </SVG>
    );
    const Chevron = renderGuest ? chevronUp : chevronDown;
    const { adults, children } = passDownGuests;
    const totalGuests = adults + children;
    const checkin = `${checkinDate.month + 1}/${checkinDate.day}/2021`;
    const checkout = `${checkoutDate.month + 1}/${checkoutDate.day}/2021`;
    const leftInputString = checkinDate.day ? checkin : 'Add date';
    const rightInputString = checkoutDate.day ? checkout : 'Add date';
    return (
      <DivFlex2>
        <MainInput>
          <TopRow>
            <TopLeft>
              <InputTopHeading>
                CHECK-IN
              </InputTopHeading>
              <InputBottomHeading onClick={this.handleClick} ref={this.leftCalendarButton}>
                {leftInputString}
              </InputBottomHeading>
              <div>
                {element}
              </div>
            </TopLeft>
            <TopRight>
              <InputTopHeading>
                CHECKOUT
              </InputTopHeading>
              <InputBottomHeading ref={this.rightCalendarButton} onClick={this.handleClick}>
                {rightInputString}
              </InputBottomHeading>
            </TopRight>
          </TopRow>
          <BottomRow focus="notGuest" onClick={() => guestInputClick()}>
            <LowerRowTopDiv>
              GUESTS
            </LowerRowTopDiv>
            <LowerRowBottomDiv>
              {`${totalGuests} guests`}
            </LowerRowBottomDiv>
            <RightIconDiv>
              {Chevron}
            </RightIconDiv>
            <>
              {guestRender}
            </>
          </BottomRow>
        </MainInput>
      </DivFlex2>
    );
  }
}

export default InputBox;

InputBox.propTypes = {
  renderCalendar: PropTypes.bool.isRequired,
  renderGuest: PropTypes.bool.isRequired,
  inputClick: PropTypes.func.isRequired,
  focus: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
  availableAfterCheckin: PropTypes.number.isRequired,
  passDownGuests: PropTypes.shape({
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
    infants: PropTypes.number.isRequired,
  }).isRequired,
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
  updateGuests: PropTypes.func.isRequired,
  translate: PropTypes.number.isRequired,
  translateLeft: PropTypes.func.isRequired,
  translateRight: PropTypes.func.isRequired,
  guestInputClick: PropTypes.func.isRequired,
};

InputBox.defaultProps = {
  checkinDate: {},
  checkoutDate: {},
};
