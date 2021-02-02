import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import GuestInput from './guestInput';

const Box = styled.div`
  background: rgb(255, 255, 255) !important;
  border-radius: 4px !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px !important;
  box-sizing: border-box !important;
  margin-bottom: 16px !important;
  min-width: 280px !important;
  padding: 16px !important;
  position: absolute !important;
  text-align: left !important;
  width: 100% !important;
  z-index: 999 !important;
  right: 0px !important;
  top: 100%;
`;

const BlockDiv = styled.div`
  display: block;
`;

const MaxGuestDiv = styled.div`
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 300 !important;
  font-size: 14px !important;
  line-height: 16px !important;
`;
const CloseButtonContainer = styled.div`
  display: flex !important;
  justify-content: flex-end !important;
`;

const CloseButton = styled.button`
  cursor: pointer !important;
  display: inline-block !important;
  margin: 0px -10px !important;
  position: relative !important;
  text-align: center !important;
  width: auto !important;
  touch-action: manipulation !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  outline: none !important;
  padding: 10px !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  border: none !important;
  background: transparent !important;
  color: rgb(34, 34, 34) !important;
  text-decoration: underline !important;
`;

class GuestMenu extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    event.stopPropagation();
    const { inputClick } = this.props;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      inputClick(false, 'guest');
    }
  }

  render() {
    const inputNames = ['Adults', 'Children', 'Infants'];
    const {
      updateGuests, passDownGuests, pricing, inputClick,
    } = this.props;
    const { maxGuests } = pricing;
    const maxGuestHeading = `${maxGuests} guest maximum. Infants don't count toward the number of guests`;
    return (
      <BlockDiv>
        <Box ref={this.wrapperRef}>
          {inputNames.map((title) => (
            <GuestInput
              pricing={pricing}
              passDownGuests={passDownGuests}
              updateGuests={updateGuests}
              title={title}
              key={title}
            />
          ))}
          <BlockDiv>
            <MaxGuestDiv>
              {maxGuestHeading}
            </MaxGuestDiv>
          </BlockDiv>
          <CloseButtonContainer>
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                inputClick(false, 'guest');
              }}
            >
              Close
            </CloseButton>
          </CloseButtonContainer>
        </Box>
      </BlockDiv>
    );
  }
}

export default GuestMenu;

GuestMenu.propTypes = {
  inputClick: PropTypes.func.isRequired,
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
};
