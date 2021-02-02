import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  margin-bottom: 24px ;
  margin-top: 8px ;
`;

const SubContainer = styled.div`
  -webkit-box-align: center ;
  align-items: center ;
  display: flex ;
  width: 100% ;
  color: rgb(34, 34, 34) ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
  font-weight: 400 ;
`;

const TitleDiv = styled.div`
  font-size: 16px ;
  line-height: 20px ;
  padding-bottom: 4px ;
  font-weight: 600 ;
`;

const ExtraDiv = styled.div`
  flex: 1 1 0% ;
`;

const InputContainer = styled.div`
  display: flex ;
`;

const InputSubDiv = styled.div`
  display: inline-flex ;
  align-items: center ;
  justify-content: space-between ;
  width: 104px ;
  height: 32px ;
  color: rgb(34, 34, 34) ;
  font-weight: 400 ;
  font-size: 16px ;
  line-height: 20px ;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif ;
`;

const Button = styled.button`
  width: 32px !important;
  height: 32px !important;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  margin: 0px !important;
  padding: 0px !important;
  text-align: center !important;
  text-decoration: none !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(176, 176, 176) !important;
  color: rgb(113, 113, 113) !important;
  font-family: inherit !important;
  outline: none !important;
  touch-action: manipulation !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgb(255, 255, 255) !important;
  border-radius: 50% !important;
`;

const DisabledButton = styled(Button)`
  cursor: not-allowed !important;
  color: rgb(235, 235, 235) !important;
  border-color: rgb(235, 235, 235) !important;
  background: rgb(255, 255, 255) !important;
`;

const MiddleDiv = styled.div`
  position: relative !important;
  color: inherit !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
`;

const NumberSpan = styled.span`
  font-weight: 400;
  position: relative !important;
  color: inherit !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
`;

const SubHeading = styled.div`
  display: block;
  font-size: 12px !important;
  line-height: 16px !important;
`;

const SVG = styled.svg`
  display: block;
  fill: none;
  height: 12px;
  width: 12px;
  stroke: currentcolor;
  stroke-width: 5.33333;
  overflow: visible;
`;

class GuestInput extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  add(e) {
    e.stopPropagation();
    const { updateGuests, title } = this.props;
    updateGuests(title.toLowerCase(), '+');
  }

  subtract(e) {
    e.stopPropagation();
    const { updateGuests, title } = this.props;
    updateGuests(title.toLowerCase(), '-');
  }

  render() {
    const { title, passDownGuests, pricing } = this.props;
    const { maxGuests } = pricing;
    const { adults, children } = passDownGuests;
    const num = passDownGuests[title.toLowerCase()];
    const totalGuests = adults + children;
    let subElement;
    if (title === 'Children') {
      subElement = <SubHeading>Ages 2-12</SubHeading>;
    }
    if (title === 'Infants') {
      subElement = <SubHeading>Under 2</SubHeading>;
    }
    if (title === 'Adults') {
      subElement = <></>;
    }
    const pathPlus = 'm 2 16 h 28 m -14 -14 v 28';
    const pathMinus = 'm 2 16 h 28';
    const regularMinus = (
      <Button onClick={this.subtract}>
        <SVG viewBox="0 0 32 32">
          <path d={pathMinus} />
        </SVG>
      </Button>
    );
    const regularPlus = (
      <Button onClick={this.add}>
        <SVG viewBox="0 0 32 32">
          <path d={pathPlus} />
        </SVG>
      </Button>
    );
    const disabledMinus = (
      <DisabledButton disabled>
        <SVG viewBox="0 0 32 32">
          <path d={pathMinus} />
        </SVG>
      </DisabledButton>
    );
    const disabledPlus = (
      <DisabledButton disabled>
        <SVG viewBox="0 0 32 32">
          <path d={pathPlus} />
        </SVG>
      </DisabledButton>
    );
    let minus;
    if (title === 'Adults') {
      minus = num === 1 ? disabledMinus : regularMinus;
    } else {
      minus = num === 0 ? disabledMinus : regularMinus;
    }
    const plus = totalGuests < maxGuests ? regularPlus : disabledPlus;
    return (
      <MainContainer>
        <SubContainer>
          <ExtraDiv>
            <TitleDiv>
              {title}
            </TitleDiv>
            {subElement}
          </ExtraDiv>
          <InputContainer>
            <InputSubDiv>
              {minus}
              <MiddleDiv>
                <NumberSpan>{num}</NumberSpan>
              </MiddleDiv>
              {plus}
            </InputSubDiv>
          </InputContainer>
        </SubContainer>
      </MainContainer>
    );
  }
}

export default GuestInput;

GuestInput.propTypes = {
  passDownGuests: PropTypes.shape({
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
    infants: PropTypes.number.isRequired,
  }).isRequired,
  pricing: PropTypes.shape({
    maxGuests: PropTypes.number,
    price: PropTypes.number,
    serviceFee: PropTypes.number,
    cleaningFee: PropTypes.number,
    minStay: PropTypes.number,
  }).isRequired,
  updateGuests: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
