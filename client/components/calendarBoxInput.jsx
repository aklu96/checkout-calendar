import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  order: 2 ;
  flex: 0 0 calc(((100vw - 256px) / 12) * 5 + 16px) ;
  margin-left: 24px ;
  max-width: 350px ;
  display: block ;
  margin-top: 24px;
  margin-right: 32px;
  z-indez: 999;
`;

const InnerFlex = styled.div`
  display: flex ;
  border-radius: 8px ;
  box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset ;
`;

const CheckinInput = styled.div`
  position: relative ;
  cursor: text ;
  display: flex ;
  height: 56px ;
  width: 100% ;
  margin: 0px ;
  border: none transparent ;
  color: rgb(34, 34, 34) ;
  border-radius: 8px ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-size: 16px ;
  line-height: 20px ;
  font-weight: 400 ;
  flex: 1 1 0% ;
  outline: none ;
  box-shadow: ${(props) => (props.focus === 'checkin' ? 'rgb(34, 34, 34) 0px 0px 0px 2px inset' : 'none')};
  background-color: ${(props) => (props.focus === 'checkin' ? 'rgb(255, 255, 255)' : 'transparent')};
`;

const CheckoutInput = styled.div`
  position: relative ;
  cursor: text ;
  display: flex ;
  height: 56px ;
  width: 100% ;
  margin: 0px ;
  border: none transparent ;
  color: rgb(34, 34, 34) ;
  border-radius: 8px ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-size: 16px ;
  line-height: 20px ;
  font-weight: 400 ;
  flex: 1 1 0% ;
  outline: none ;
  box-shadow: ${(props) => (props.focus === 'checkout' ? 'rgb(34, 34, 34) 0px 0px 0px 2px inset' : 'none')};
  background-color: ${(props) => (props.focus === 'checkout' ? 'rgb(255, 255, 255)' : 'transparent')};
`;

const Disabled = styled.div`
  position: relative !important;
  display: flex !important;
  height: 56px !important;
  width: 100% !important;
  margin: 0px !important;
  border: none transparent !important;
  border-radius: 8px !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 400 !important;
  flex: 1 1 0% !important;
  opacity: 1 !important;
  cursor: not-allowed !important;
  background-color: transparent !important;
  box-shadow: none !important;
  color: rgb(221, 221, 221) !important;
  -webkit-text-fill-color: rgb(221, 221, 221) !important;
`;

const InputLabel = styled.div`
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
  white-space: nowrap
`;

const Input = styled.input`
  width: 100% ;
  border: none ;
  outline: none ;
  padding: 0px ;
  margin: 26px 12px 10px ;
  min-height: 1px ;
  color: inherit ;
  background-color: transparent ;
  font-family: inherit ;
  font-size: inherit ;
  font-weight: inherit ;
  line-height: inherit ;
  appearance: none ;
`;

const InputContainer = styled.div`
  display: flex ;
  font-size: 14px ;
  line-height: 18px ;
  color: rgb(34, 34, 34) ;
  opacity: 1 ;
`;

const ButtonContainer = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  max-width: 50% !important;
  min-width: 36px !important;
  overflow: visible !important;
  white-space: nowrap !important;
  padding-left: 0px !important;
  padding-right: 12px !important;
`;

const Button = styled.button`
  appearance: none !important;
  display: inline-block !important;
  border-radius: 50% !important;
  border: 0px !important;
  outline: 0px !important;
  margin: -2px !important;
  padding: 2px !important;
  color: buttontext !important;
  background-color: transparent !important;
  cursor: pointer !important;
  touch-action: manipulation !important;
`;

// const I = styled.i`
//   height: 24px;
//   width: 24px;
//   margin: auto auto;
// `;

const Label = styled.label`
  position: relative !important;
  flex: 1 1 0% !important;
  padding: 0px !important;
`;

const SVG = styled.svg`
  height: 24px;
  width: 24px;
  display: block;
  overflow: visible;
  fill: currentcolor;
  fill-opacity: 0;
  stroke: rgb(34, 34, 34);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

class CalendarBoxInput extends React.Component {
  constructor(props) {
    super(props);
    this.checkinRef = React.createRef();
    this.checkoutRef = React.createRef();
    this.focusInputCheckin = this.focusInputCheckin.bind(this);
    this.focusInputCheckout = this.focusInputCheckout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  focusInputCheckin() {
    this.checkinRef.current.focus();
    const { setFocus } = this.props;
    setFocus('checkin');
  }

  focusInputCheckout() {
    this.checkoutRef.current.focus();
    const { setFocus } = this.props;
    setFocus('checkout');
  }

  render() {
    const {
      checkinDate, checkoutDate, focus, eraseStateDate,
    } = this.props;
    const checkin = checkinDate.day ? `${checkinDate.month + 1}/${checkinDate.day}/2021` : 'Add date';
    const checkout = checkoutDate.day ? `${checkoutDate.month + 1}/${checkoutDate.day}/2021` : 'Add date';
    const xPath = 'm19.1 19.1 l14 14 m 0 -14 l -14 14';
    const xSVG = (
      <SVG viewBox="0 0 52 52">
        <path d={xPath} />
      </SVG>
    );
    const clearDateCheckout = (
      <ButtonContainer>
        <Button onClick={(e) => {
          e.stopPropagation();
          eraseStateDate('checkoutDate');
        }}
        >
          {xSVG}
        </Button>
      </ButtonContainer>
    );
    const clearDateCheckin = (
      <ButtonContainer>
        <Button onClick={(e) => {
          e.stopPropagation();
          eraseStateDate('checkinDate');
        }}
        >
          {xSVG}
        </Button>
      </ButtonContainer>
    );
    const regularCheckout = (
      <CheckoutInput focus={focus} onClick={this.focusInputCheckout}>
        <Label>
          <InputLabel>CHECKOUT</InputLabel>
          <InputContainer>
            <Input name="checkout" placeholder="MM/DD/YYYY" onChange={this.handleChange} ref={this.checkoutRef} type="text" value={checkout} disabled={!checkoutDate.day} />
          </InputContainer>
        </Label>
        {checkoutDate.day ? clearDateCheckout : <></>}
      </CheckoutInput>
    );
    const disabledCheckout = (
      <Disabled name="checkout" focus={focus}>
        <Label>
          <InputLabel>CHECKOUT</InputLabel>
          <InputContainer>
            <Input ref={this.checkoutRef} type="text" value={checkout} disabled={!checkoutDate.day} placeholder="MM/DD/YYYY" />
          </InputContainer>
        </Label>
      </Disabled>
    );
    const checkoutDiv = checkinDate.day ? regularCheckout : disabledCheckout;
    return (
      <MainContainer>
        <InnerFlex>
          <CheckinInput focus={focus} onClick={this.focusInputCheckin}>
            <Label>
              <InputLabel>CHECK-IN</InputLabel>
              <InputContainer>
                <Input name="checkin" onChange={this.handleChange} ref={this.checkinRef} type="text" value={checkin} placeholder="MM/DD/YYYY" />
              </InputContainer>
            </Label>
            {checkinDate.day ? clearDateCheckin : <></>}
          </CheckinInput>
          {checkoutDiv}
        </InnerFlex>
      </MainContainer>
    );
  }
}

export default CalendarBoxInput;

CalendarBoxInput.propTypes = {
  focus: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
  checkinDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  checkoutDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  eraseStateDate: PropTypes.func.isRequired,
};

CalendarBoxInput.defaultProps = {
  checkinDate: {},
  checkoutDate: {},
};
