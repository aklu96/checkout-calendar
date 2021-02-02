import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CalendarTable from './calendarTable';

const CalendarCarouselTransform = styled.div`
  display: flex;
  left: 0px;
  position: relative;
  transform: translateX(${(props) => props.translate}px);
  transition: transform .2s ease-in-out;
  justify-content: center;
`;

const CalendarCarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const I = styled.i`
  height: 12px;
  width: 12px;
`;

const Button = styled.button`
  appearance: none !important;
  display: inline-block !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  margin: 0px !important;
  padding: 0px !important;
  color: rgb(34, 34, 34) !important;
  cursor: pointer !important;
  touch-action: manipulation !important;
  position: relative !important;
  background: transparent !important;
  transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
  z-index: 999;
`;

const ButtonDivLeft = styled.div`
  position: absolute !important;
  top: 154px !important;
  left: 37px !important;
`;

const ButtonDivRight = styled.div`
  position: absolute !important;
  top: 154px !important;
  right: 37px !important;
`;

const SVG = styled.svg`
  height: 12px;
  width: 12px;
  display: block;
  fill: currentcolor;
`;

class CalendarCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.months = {
      0: 'January 2021',
      1: 'February 2021',
      2: 'March 2021',
      3: 'April 2021',
      4: 'May 2021',
      5: 'June 2021',
      6: 'July 2021',
      7: 'August 2021',
      8: 'September 2021',
      9: 'October 2021',
      10: 'November 2021',
      11: 'December 2021',
    };
  }

  render() {
    const {
      availability, handleDateClick, cellHover, availableAfterCheckin,
      translateRight, checkinDate, hoverDate, checkoutDate, focus,
      translate, translateLeft, today,
    } = this.props;
    const chevronPathLeft = 'm 13.7 16.29 a 1 1 0 1 1 -1.42 1.41 l -8 -8 a 1 1 0 0 1 0 -1.41 l 8 -8 a 1 1 0 1 1 1.42 1.41 l -7.29 7.29 Z';
    const chevronPathRight = 'm 4.29 1.71 a 1 1 0 1 1 1.42 -1.41 l 8 8 a 1 1 0 0 1 0 1.41 l -8 8 a 1 1 0 1 1 -1.42 -1.41 l 7.29 -7.29 Z';
    return (
      <CalendarCarouselContainer>
        <ButtonDivLeft>
          <Button disabled={translate === 1600} onClick={translateLeft}>
            <SVG viewBox="0 0 18 18">
              <path d={chevronPathLeft} />
            </SVG>
          </Button>
        </ButtonDivLeft>
        <ButtonDivRight>
          <Button disabled={translate === -1600} onClick={translateRight}>
            <SVG viewBox="0 0 18 18">
              <path d={chevronPathRight} />
            </SVG>
          </Button>
        </ButtonDivRight>
        <CalendarCarouselTransform translate={translate}>
          {availability.map((month, i) => (
            <CalendarTable
              handleDateClick={handleDateClick}
              month={month}
              title={this.months[i]}
              key={this.months[i]}
              cellHover={cellHover}
              checkinDate={checkinDate}
              hoverDate={hoverDate}
              checkoutDate={checkoutDate}
              focus={focus}
              availableAfterCheckin={availableAfterCheckin}
              today={today}
            />
          ))}
        </CalendarCarouselTransform>
      </CalendarCarouselContainer>
    );
  }
}

export default CalendarCarousel;

CalendarCarousel.propTypes = {
  focus: PropTypes.string.isRequired,
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
  handleDateClick: PropTypes.func.isRequired,
  checkinDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  checkoutDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  translate: PropTypes.number.isRequired,
  translateLeft: PropTypes.func.isRequired,
  translateRight: PropTypes.func.isRequired,
  cellHover: PropTypes.func.isRequired,
  hoverDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

CalendarCarousel.defaultProps = {
  checkinDate: {},
  checkoutDate: {},
  hoverDate: {},
};
