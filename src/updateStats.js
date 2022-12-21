var player1 = 0;
var player2 = 0;

async function getPlayer(player) {
    var url = new URL('https://www.balldontlie.io/api/v1/players')
    if (player == 1){
        var param = {search: document.querySelector("#player1Name").value}
    }
    else{
        var param = {search: document.querySelector("#player2Name").value}
    }
    url.search = new URLSearchParams(param).toString()
    const response = await fetch(url);
    const data = response.json();
    return data;
}

async function getSeasonStats(id) {
    var url = new URL('https://www.balldontlie.io/api/v1/season_averages')
    var param = {"player_ids[]": id, "season" : "2021"};
    url.search = new URLSearchParams(param).toString()
    const response = await fetch(url);
    const data = response.json();
    return data;
}

async function getStats(player) {
    if (player == 1){
        var player1 = await getPlayer(player);
        console.log(player1);
        player1 = player1.data[0];
        var id = player1.id;
    }
    else{
        var player2 = await getPlayer(player);
        player2 = player2.data[0];
        var id = player2.id;
    }
    var stats = await getSeasonStats(id)
    console.log(stats.data[0]);
    let obj = stats.data[0];
    if (player == 1){
        // document.querySelector("#player1").textContent= document.querySelector("#player-1-name").value;
        document.querySelector("#player-1-stats").textContent= obj.pts;
    }
    else{
        // document.querySelector("#player2").textContent= document.querySelector("#player-2-name").value;
        document.querySelector("#player-2-stats").textContent= obj.pts;
    }
}



  //BELOW
//   const getPlayerData = async (player) => {
//     var url = new URL('https://www.balldontlie.io/api/v1/players');
//     if (player == 1){
//         var param = {search: player1.name};
//     }
//     else{
//         var param = {search: player2.name};
//     }
//     url.search = new URLSearchParams(param).toString();
//     const response = await fetch(url);
//     const data = response.json();
//     return data;
//   }

//   const getSeasonData = async (id) => {
//       var url = new URL('https://www.balldontlie.io/api/v1/season_averages');
//       var param = {"player_ids[]": id, "season" : "2021"};
//       url.search = new URLSearchParams(param).toString();
//       const response = await fetch(url);
//       const data = response.json();
//       return data;
//   }

//   const getStats = async (player) => {
//       if (player == "1"){
//           var player1ID = await getPlayerData(player);
//           player1ID = player1ID.data[0].id;
//           let player1Stats = await getSeasonData(player1ID);
//           player1Stats = player1Stats.data[0];
//           console.log(player1Stats);
//           player1.stats = player1Stats;
//           // return player1;
//       }
//       else{
//           let player2ID = await getPlayerData(player);
//           player2ID = player2ID.data[0].id;
//           let player2Stats = await getSeasonData(player2ID);
//           player2Stats = player2Stats.data[0];
//           player2.stats = player2Stats;
//           console.log(player2Stats);
//           // return player2;
//         }
//   }