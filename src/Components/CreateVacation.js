import React from 'react';
import moment from 'moment';

function CreateVacations(props) {
  const createVacation = e => {
    e.preventDefault();
    let newVacation = {};
    let now = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    newVacation['id'] = props.vacations.length + 1;
    newVacation['startDate'] = e.target.elements[0].value;
    newVacation['endDate'] = e.target.elements[1].value;
    newVacation['createdAt'] = now;
    newVacation['updatedAt'] = now;

    props.setVacations([...props.vacations, newVacation]);
  };

  return (
    <form onSubmit={createVacation}>
      <div>
        Start Date <input type="date" />
      </div>
      <div>
        End Date <input type="date" />
      </div>
      <div>
        <button className="create" type="submit">
          Create Vacation
        </button>
      </div>
    </form>
  );
}

export default CreateVacations;
