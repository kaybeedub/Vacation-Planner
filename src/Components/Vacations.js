import React from 'react';
import moment from 'moment';

function Vacations(props) {
  const renderVacations = () => {
    if (props.vacations.length === 0) {
      return <p>User has no vacations planned.</p>;
    } else {
      return props.vacations.map(vacation => (
        <li key={props.vacations.indexOf(vacation)}>
          {moment(vacation.startDate).format('dddd MM/DD/YYYY')} to{' '}
          {moment(vacation.endDate).format('dddd MM/DD/YYYY')} (
          {moment(vacation.endDate).diff(vacation.startDate, 'days')}{' '}
          {moment(vacation.endDate).diff(vacation.startDate, 'days') > 1
            ? `days`
            : `day`}
          ) <button onClick={props.deleteVacation}>X</button>
        </li>
      ));
    }
  };

  return (
    <div>
      <h3>User Vacations</h3>
      <ul>
        {renderVacations()}
        {console.log(props.vacations)}
      </ul>
    </div>
  );
}

export default Vacations;
