
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState([]);
 
  useEffect(() => {
    // fetch('/mock')
    //   .then(response => response.json())
    //   .then(data => setData(data ));

    // async function fetchMyAPI() {
    //   let response = await fetch('api/data');
    //   response = await response.json();
    //   setData(response);
    // }
    // fetchMyAPI()

    const fetchData = async () => {
      const result = await axios(
        '/mock',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);
  
  return (
    <div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1>Data from the Backend</h1>
					{data.map(person => (
						<p key={person.id}>
							Name: {person.name} <br /> Age: {person.age}
						</p>
					))}
				</header>
			</div>
  );
}

export default App;
