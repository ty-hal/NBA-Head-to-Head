import React from 'react';
// import {getStats} from '../updateStats';

const PlayerSearch = () => {
  const getStats = (player) => {
    console.log('Clicked!');
    // document.querySelector("#player-2-stats").textContent= "LOL";
  }

  return (
    <div className="nba-search">
        <p>Please enter two players to compare</p>
        <div className="nba-players">
              <input type="text" placeholder = "Player 1" id = "player-1-name"/>
              <input type="text" placeholder = "Player 2" id = "player-2-name"/>
              <input type="submit" value="Search" id = "search-button" onClick={getStats(1)}/>
        </div>
    </div>
  )
}

export default PlayerSearch