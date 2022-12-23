import Header from './components/Header';
import Players from './components/Players';
import Footer from './components/Footer';

let headshotData = [] // Object of the form (player ID : URL) for most NBA players
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

function App() {
  let player1 = {name: null, stats: null, season: null, img: null}; // Objects for player1 and player2
  let player2 = {name: null, stats: null, season: null, img: null};

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
    <Players btnClick={editPlayers} findStats={getStats} player1={player1} player2={player2}/>
    <Footer />
  </div>
  );
}

export default App;
