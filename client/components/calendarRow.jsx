import React from 'react';
import PropTypes from 'prop-types';
import CalendarCell from './calendarCell';

const CalendarRow = (props) => {
  const {
    row, handleDateClick, cellHover, checkinDate,
    hoverDate, checkoutDate, availableAfterCheckin,
    today,
  } = props;
  const cells = [];
  for (let i = 0; i < 7; i += 1) {
    if (row[i]) {
      cells.push(<CalendarCell
        handleDateClick={handleDateClick}
        cellInfo={row[i]}
        cellHover={cellHover}
        checkinDate={checkinDate}
        hoverDate={hoverDate}
        checkoutDate={checkoutDate}
        key={JSON.stringify(row[i])}
        availableAfterCheckin={availableAfterCheckin}
        today={today}
      />);
    } else {
      cells.push(<CalendarCell key={i} />);
    }
  }
  return (
    <tr>
      {cells}
    </tr>
  );
};

export default CalendarRow;

CalendarRow.propTypes = {
  availableAfterCheckin: PropTypes.number.isRequired,
  row: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      available: PropTypes.number.isRequired,
      dayOfWeek: PropTypes.number.isRequired,
      day: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
    }),
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
  cellHover: PropTypes.func.isRequired,
  hoverDate: PropTypes.shape({
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

CalendarRow.defaultProps = {
  checkinDate: {},
  checkoutDate: {},
  hoverDate: {},
};
