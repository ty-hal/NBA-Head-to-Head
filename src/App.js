import Header from './components/Header';
// import PlayerSearch from './components/PlayerSearch';
// import PlayerStats from './components/PlayerStats';
import Players from './components/Players';
import Footer from './components/Footer';
import './updateStats'

function App() {
  let player1 = {name:"LeBron James", stats: null};
  let player2 = {name:"Jimmy Butler", stats: null};

  //BELOW
  const getPlayerData = async (player) => {
    var url = new URL('https://www.balldontlie.io/api/v1/players');
    var param = {search: player};
    url.search = new URLSearchParams(param).toString();
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  const getSeasonData = async (id) => {
      var url = new URL('https://www.balldontlie.io/api/v1/season_averages');
      var param = {"player_ids[]": id, "season" : "2021"};
      url.search = new URLSearchParams(param).toString();
      const response = await fetch(url);
      const data = response.json();
      return data;
  }
  const getStats = async () => {
    var player1ID = await getPlayerData(player1.name);
    player1ID = player1ID.data[0].id;
    let player1Stats = await getSeasonData(player1ID);
    player1Stats = player1Stats.data[0];
    player1.stats = player1Stats;

    let player2ID = await getPlayerData(player2.name);
    player2ID = player2ID.data[0].id;
    let player2Stats = await getSeasonData(player2ID);
    player2Stats = player2Stats.data[0];
    player2.stats = player2Stats;
  }
  //ABOVE


  const editPlayers = (newPlayer1, newPlayer2) => {
    player1.name = newPlayer1;
    player2.name = newPlayer2;
    player1.stats = null;
    player2.stats = null;
    console.log(player1, player2);
  }

  return (
    <div className="container">
    <Header/>
    <Players btnClick={editPlayers} findStats={getStats} player1={player1} player2={player2}/>
    {/* <PlayerSearch />
    <PlayerStats /> */}
    <Footer />
  </div>
  );
}

export default App;
