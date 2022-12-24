import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Players from './components/Players';
import Footer from './components/Footer';
import playerNames from './data/player_names.txt';
import seasons from './data/seasons.txt';

let headshotData = [] // Object of the form (player ID : URL) for most NBA players
let NBAplayers = [] // NBA player names from txt file
let NBAseasons = [] // NBA seasons from the txt file

async function getHeadshotData(){
    try{
      // Get and return the JSON data
      const response = await import('./data/players_headshots.json')
      return response
    }catch(err){
      return err
    }
}
getHeadshotData().then(function(response){
    headshotData = response // Save the JSOn data into headshotData
})

async function getNBAPlayers(){
    try{
      // Get and return the JSON data
      let playerData = await fetch(playerNames)
      return playerData.text()
    }catch(err){
      return err
    }
}
getNBAPlayers().then(function(response){
    NBAplayers = response.split("\r\n") // Save the txt data into NBAplayers array
})

async function getNBAseasons(){
  try{
    // Get and return the JSON data
    let seasonData = await fetch(seasons)
    return seasonData.text()
  }catch(err){
    return err
  }
}
getNBAseasons().then(function(response){
  NBAseasons = response.split("\r\n") // Save the txt data into NBAseasons array
})


const SearchbarDropdown = (props) => {
  const { options1, options2, onInputChange} = props;
  const ulRef1 = useRef();
  const inputRef1 = useRef();
  const ulRef2 = useRef();
  const inputRef2 = useRef();
  useEffect(() => {
    inputRef1.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef1.current.style.display = 'flex';
      ulRef1.current.style.flexDirection = "column";
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef1.current.style.display = 'none';
    });
  }, []);
  useEffect(() => {
    inputRef2.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef2.current.style.display = 'flex';
      ulRef2.current.style.flexDirection = "column";
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef2.current.style.display = 'none';
    });
  }, []);
  return (
    <>
      <div className="player-dropdowns">
        <div className="search-bar-dropdown">
          <input
            id="search-bar-1"
            type="text"
            className="form-control"
            placeholder="Player 1"
            ref={inputRef1}
            onChange={onInputChange}
          />
          <ul id="results-1" className="list-group" ref={ulRef1}>
            {options1.map((option, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={(e) => {
                    inputRef1.current.value = option;
                  }}
                  // className="list-group-item list-group-item-action"
                >
                  {option}
                </button>
              );
            })}
          </ul>
        </div>
        <input type="text" placeholder = "2021-2022" id = "season-1"/>
      </div>

      {/* Second one */}

      <div className="player-dropdowns">
        <div className="search-bar-dropdown">
          <input
            id="search-bar-2"
            type="text"
            className="form-control"
            placeholder="Player 2"
            ref={inputRef2}
            onChange={onInputChange}
          />
          <ul id="results-2" className="list-group" ref={ulRef2}>
            {options2.map((option, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={(e) => {
                    inputRef2.current.value = option;
                  }}
                  // className="list-group-item list-group-item-action"
                >
                  {option}
                </button>
              );
            })}
          </ul>
        </div>
        <input type="text" placeholder = "2021-2022" id = "season-2"/>
      </div>
    </>
  );
};

function App() {
  let player1 = {name: null, stats: null, season: null, img: null}; // Objects for player1 and player2
  let player2 = {name: null, stats: null, season: null, img: null};

  const [options1, setOptions] = useState([]); // Player 1 search bar
  const [options2, setOptions2] = useState([]); // Player 2 search bar


  const onInputChange = (event) => {
    if (event.target.id === "search-bar-1"){
      if (event.target.value.length > 2) { // If user input is more than 2 characters long
        setOptions(
          NBAplayers.filter((option) => {
            return option.toLowerCase().includes(event.target.value.toLowerCase())
          }
        ))
      }
      else {
        setOptions(
          NBAplayers.filter((option) => {
            return false
          }
        ))
      }
    }
    else if (event.target.id === "search-bar-2"){
      if (event.target.value.length > 2) { // If user input is more than 2 characters long
        setOptions2(
          NBAplayers.filter((option) => {
            return option.toLowerCase().includes(event.target.value.toLowerCase())
          }
        ))
      }
      else {
        setOptions2(
          NBAplayers.filter((option) => {
            return false
          }
        ))
      }
    }

  }
  const getPlayerStats = async (player) => {
    let url = new URL('https://www.balldontlie.io/api/v1/players'); // Get player info (to eventually get their ID)
    let param = {search: player};
    url.search = new URLSearchParams(param).toString();
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  const getSeasonStats = async (id, season) => {
    let url = new URL('https://www.balldontlie.io/api/v1/season_averages'); // Get player season stats from inputted season
    let param = {"player_ids[]": id, "season" : season};
    url.search = new URLSearchParams(param).toString();
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  const getPlayersImgs = (player1, player2) => {
    // Headshot data has two possible forms for unique player key, so we will check for both of these possible keys for player1 and player2:
    // 1) first 5 letters of last name + first 2 letters of first name + extra numbers
    // 2) extra stuff + last name _ first name 
    let player1key = [`${player1.name.split(' ')[1].substring(0,5).toLowerCase()}${player1.name.split(' ')[0].substring(0,2).toLowerCase()}`,`${player1.name.split(' ')[0].toLowerCase()}_${player1.name.split(' ')[1].toLowerCase()}`]
    let player2key = [`${player2.name.split(' ')[1].substring(0,5).toLowerCase()}${player2.name.split(' ')[0].substring(0,2).toLowerCase()}`,`${player2.name.split(' ')[0].toLowerCase()}_${player2.name.split(' ')[1].toLowerCase()}`]        

    for (const item in headshotData){
        if (item.indexOf(player1key[0]) !== -1 || item.indexOf(player1key[1]) !== -1){
            player1.img = headshotData[item];
        }
        if (item.indexOf(player2key[0]) !== -1 || item.indexOf(player2key[1]) !== -1){
            player2.img = headshotData[item];
        }
        if (player1.img !== null && player2.img !== null) break;
    }
  }
  const getStats = async () => {
    let player1ID = await getPlayerStats(player1.name);
    player1.name = player1ID.data[0].first_name + ' ' + player1ID.data[0].last_name; // Save player1 name (e.g. "LeBron James")
    player1.season = document.querySelector("#season-1").value.substring(0,4); // Save player1 season (e.g. "2022")
    let player1Stats = await getSeasonStats(player1ID.data[0].id, player1.season);
    player1.stats = player1Stats.data[0]; // Save player1 stats (object)

    let player2ID = await getPlayerStats(player2.name);
    player2.name = player2ID.data[0].first_name + ' ' + player2ID.data[0].last_name;
    player2.season = document.querySelector("#season-2").value.substring(0,4);
    let player2Stats = await getSeasonStats(player2ID.data[0].id, player2.season);
    player2.stats = player2Stats.data[0];

    getPlayersImgs(player1, player2); //Get the img URLs for player1 and player2
  }
  const editPlayers = (newPlayer1, newPlayer2) => {
    // After user presses the search button, clear the player1 and player2 objects
    Object.keys(player1).forEach(key => {
      player1[key] = null;
    });
    Object.keys(player2).forEach(key => {
      player2[key] = null;
    });
    player1.name = newPlayer1;
    player2.name = newPlayer2;
  }

  return (
    <div className="container">
    <Header/>
    <div id="message">
        <p>Please enter two NBA players and seasons to compare their season per game stats.</p>
    </div>
    <SearchbarDropdown options1={options1} options2={options2} onInputChange={onInputChange} />
    <Players btnClick={editPlayers} findStats={getStats} player1={player1} player2={player2} NBAplayers={NBAplayers}/>
    <Footer />
  </div>
  );
}

export default App;
