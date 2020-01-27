import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Vacations from './Components/Vacations';
import CreateVacation from './Components/CreateVacation';

/*
return (
  <div>
  <h1> Acme Vacatio Planner for { user.fullName } ({vacations.length}) </h1>
  <CreateVacation createVacation={createVacation}/>
  <Vacations vacations ={ vacations } destroyVacation= { destroyVacation} />
  </div>
)
*/

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

function App() {
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetchUser().then(data => setUser(data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://acme-users-api-rev.herokuapp.com/api/users/${user.id}/vacations`
      )
      .then(response => setVacations(response.data));
  }, [user.id]);

  const deleteVacation = e => {
    let oneLessVacation = vacations.filter(function(vacation, index, arr) {
      return index !== e.target.parentElement.value;
    });
    setVacations(oneLessVacation);
  };

  return (
    <div>
      <h1>
        Acme Vacation Planner for {user.fullName} ({vacations.length})
      </h1>
      <CreateVacation
        user={user}
        vacations={vacations}
        setVacations={setVacations}
      />
      <Vacations vacations={vacations} deleteVacation={deleteVacation} />
    </div>
  );
}

export default App;
