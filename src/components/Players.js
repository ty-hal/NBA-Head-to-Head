import React from 'react';

// Array of all player stats IDs
const statNames = ["#pts-1", "#pts-2", "#reb-1", "#reb-2", "#ast-1", "#ast-2", "#blk-1", "#blk-2", "#stl-1", "#stl-2", "#to-1", "#to-2", "#fga-1", "#fga-2", "#fg_pct-1", "#fg_pct-2", "#three-pa-1", "#three-pa-2", "#three_pct-1", "#three_pct-2", "#fta-1", "#fta-2", "#ft_pct-1", "#ft_pct-2", "#fouls-1", "#fouls-2", "#games-1", "#games-2", "#min-1", "#min-2"];

const Players = ({player1, player2, btnClick, findStats}) => {
    const onSubmit = () => {
        // Hide previous headshots
        document.querySelector("#player-1-img").style.visibility="hidden"
        document.querySelector("#player-2-img").style.visibility="hidden"
        document.querySelector("#player-1-stats-name").innerHTML=""
        document.querySelector("#player-2-stats-name").innerHTML=""
        statNames.forEach(stat => {
            document.querySelector(stat).innerHTML=""
            document.querySelector(stat).style.border = "0px"
        });

        // Check if valid players are inputted
        if (!document.querySelector("#search-bar-1").value || !document.querySelector("#search-bar-2").value){
            document.querySelector("#search-error").innerHTML="Enter valid player(s).";
            return;
        }

        // Check if valid seasons are inputted
        if (parseInt(document.querySelector("#season-1").value.substring(0,4)) > 2022 || parseInt(document.querySelector("#season-2").value.substring(0,4)) > 2022){
            document.querySelector("#search-error").innerHTML="Enter valid season(s).";
            return;
        }

        // Overwrites player1 and player2 
        btnClick(document.querySelector("#search-bar-1").value, document.querySelector("#search-bar-2").value);

        // Gets the stats and headshot URL for player1 and player 2
        findStats()
        .then(() => showStats(player1, player2)) // Update all of the HTML
        .catch(() => { // If something goes wrong
            statNames.forEach(stat => {
                document.querySelector("#player-1-stats-name").innerHTML=""
                document.querySelector("#player-2-stats-name").innerHTML=""
                document.querySelector(stat).innerHTML=""
                document.querySelector(stat).style.border = "0px"
            });
            if (document.querySelector("#search-error").innerHTML === ""){
                document.querySelector("#search-error").innerHTML = "There is no available data for one or both players from the inputted season(s)."
            }
        });
    }
    
    const showStats = (player1, player2) => { //Changes the HTML
        // Reset the stats ul text and update the players names
        statNames.forEach(stat => document.querySelector(stat).innerHTML="")
        document.querySelector("#player-1-stats-name").innerHTML=player1.name
        document.querySelector("#player-2-stats-name").innerHTML=player2.name
        document.querySelector("#search-error").innerHTML=""

        // Remove all classes from each stat ul
        statNames.forEach( stat => {
            document.querySelector(stat).style.border = "2px black solid";
            document.querySelector(stat).classList.remove("better-stat")
            document.querySelector(stat).classList.remove("worst-stat")});

        // If either of the players stats are NULL (missing)
        if (typeof player1.stats === 'undefined' || player1.stats === null){
            document.querySelector("#search-error").innerHTML=`${player1.name} did not play in the ${document.querySelector("#season-1").value}-${parseInt(document.querySelector("#season-1").value)+1} season or his stats are unavailable.`;
        }
        if (typeof player2.stats === 'undefined' || player2.stats === null){
            document.querySelector("#search-error").innerHTML=`${player2.name} did not play in the ${document.querySelector("#season-2").value}-${parseInt(document.querySelector("#season-2").value)+1} season or his stats are unavailable.`;
        }

        // Update the headshots src URLs and make them visible
        document.querySelector("#player-1-img").src=player1.img
        document.querySelector("#player-1-img").style.visibility="visible"
        document.querySelector("#player-2-img").src=player2.img
        document.querySelector("#player-2-img").style.visibility="visible"

        // For each stat, if BOTH players have a defined value, then update each ul
        if (typeof player1.stats.pts !== 'undefined' && player1.stats.pts !== null && typeof player2.stats.pts !== 'undefined' && player2.stats.pts !== null){
            // Update the text content
            document.querySelector("#pts-1").innerHTML=`${player1.stats.pts} PTS`
            document.querySelector("#pts-2").innerHTML=`${player2.stats.pts} PTS`
            // If they aren't equal, assign the red and green colors (classes)
            if (player1.stats.pts !== player2.stats.pts){
                player1.stats.pts > player2.stats.pts ? document.querySelector("#pts-1").classList.add("better-stat") : document.querySelector("#pts-2").classList.add("better-stat");
                player1.stats.pts < player2.stats.pts ? document.querySelector("#pts-1").classList.add("worst-stat") : document.querySelector("#pts-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#pts-1").style.border = "0px"
            document.querySelector("#pts-2").style.border = "0px"
        }

        if (typeof player1.stats.reb !== 'undefined' && player1.stats.reb !== null && typeof player2.stats.reb !== 'undefined' && player2.stats.reb !== null){
            document.querySelector("#reb-1").innerHTML=`${player1.stats.reb} REB`
            document.querySelector("#reb-2").innerHTML=`${player2.stats.reb} REB`
            if (player1.stats.reb !== player2.stats.reb){
                player1.stats.reb > player2.stats.reb ? document.querySelector("#reb-1").classList.add("better-stat") : document.querySelector("#reb-2").classList.add("better-stat");
                player1.stats.reb < player2.stats.reb ? document.querySelector("#reb-1").classList.add("worst-stat") : document.querySelector("#reb-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#reb-1").style.border = "0px"
            document.querySelector("#reb-2").style.border = "0px"
        }
        
        if (typeof player1.stats.ast !== 'undefined' && player1.stats.ast !== null && typeof player2.stats.ast !== 'undefined' && player2.stats.ast !== null){
            document.querySelector("#ast-1").innerHTML=`${player1.stats.ast} AST`
            document.querySelector("#ast-2").innerHTML=`${player2.stats.ast} AST`
            if (player1.stats.ast !== player2.stats.ast){
                player1.stats.ast > player2.stats.ast ? document.querySelector("#ast-1").classList.add("better-stat") : document.querySelector("#ast-2").classList.add("better-stat");
                player1.stats.ast < player2.stats.ast ? document.querySelector("#ast-1").classList.add("worst-stat") : document.querySelector("#ast-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#ast-1").style.border = "0px"
            document.querySelector("#ast-2").style.border = "0px"
        }

        if (typeof player1.stats.blk !== 'undefined' && player1.stats.blk !== null && typeof player2.stats.blk !== 'undefined' && player2.stats.blk !== null){
            document.querySelector("#blk-1").innerHTML=`${player1.stats.blk} BLK`
            document.querySelector("#blk-2").innerHTML=`${player2.stats.blk} BLK`
            if (player1.stats.blk !== player2.stats.blk){
                player1.stats.blk > player2.stats.blk ? document.querySelector("#blk-1").classList.add("better-stat") : document.querySelector("#blk-2").classList.add("better-stat");
                player1.stats.blk < player2.stats.blk ? document.querySelector("#blk-1").classList.add("worst-stat") : document.querySelector("#blk-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#blk-1").style.border = "0px"
            document.querySelector("#blk-2").style.border = "0px"
        }

        if (typeof player1.stats.stl !== 'undefined' && player1.stats.stl !== null && typeof player2.stats.stl !== 'undefined' && player2.stats.stl !== null){
            document.querySelector("#stl-1").innerHTML=`${player1.stats.stl} STL`
            document.querySelector("#stl-2").innerHTML=`${player2.stats.stl} STL`
            if (player1.stats.stl !== player2.stats.stl){
                player1.stats.stl > player2.stats.stl ? document.querySelector("#stl-1").classList.add("better-stat") : document.querySelector("#stl-2").classList.add("better-stat");
                player1.stats.stl < player2.stats.stl ? document.querySelector("#stl-1").classList.add("worst-stat") : document.querySelector("#stl-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#stl-1").style.border = "0px"
            document.querySelector("#stl-2").style.border = "0px"
        }

        if (typeof player1.stats.turnover !== 'undefined' && player1.stats.turnover !== null && typeof player2.stats.turnover !== 'undefined' && player2.stats.turnover !== null){
            document.querySelector("#to-1").innerHTML=`${player1.stats.turnover} TO`
            document.querySelector("#to-2").innerHTML=`${player2.stats.turnover} TO`
            if (player1.stats.turnover !== player2.stats.turnover){
                player1.stats.turnover < player2.stats.turnover ? document.querySelector("#to-1").classList.add("better-stat") : document.querySelector("#to-2").classList.add("better-stat");
                player1.stats.turnover > player2.stats.turnover ? document.querySelector("#to-1").classList.add("worst-stat") : document.querySelector("#to-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#to-1").style.border = "0px"
            document.querySelector("#to-2").style.border = "0px"
        }

        if (typeof player1.stats.fga !== 'undefined' && player1.stats.fga !== null && typeof player2.stats.fga !== 'undefined' && player2.stats.fga !== null){
            document.querySelector("#fga-1").innerHTML=`${player1.stats.fga} FGA`
            document.querySelector("#fga-2").innerHTML=`${player2.stats.fga} FGA`
            if (player1.stats.fga !== player2.stats.fga){
                player1.stats.fga > player2.stats.fga ? document.querySelector("#fga-1").classList.add("better-stat") : document.querySelector("#fga-2").classList.add("better-stat");
                player1.stats.fga < player2.stats.fga ? document.querySelector("#fga-1").classList.add("worst-stat") : document.querySelector("#fga-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#fga-1").style.border = "0px"
            document.querySelector("#fga-2").style.border = "0px"
        }

        if (typeof player1.stats.fg_pct !== 'undefined' && player1.stats.fg_pct !== null && typeof player2.stats.fg_pct !== 'undefined' && player2.stats.fg_pct !== null){
            document.querySelector("#fg_pct-1").innerHTML=`${player1.stats.fg_pct} FG%`
            document.querySelector("#fg_pct-2").innerHTML=`${player2.stats.fg_pct} FG%`
            if (player1.stats.fg_pct !== player2.stats.fg_pct){
                player1.stats.fg_pct > player2.stats.fg_pct ? document.querySelector("#fg_pct-1").classList.add("better-stat") : document.querySelector("#fg_pct-2").classList.add("better-stat");
                player1.stats.fg_pct < player2.stats.fg_pct ? document.querySelector("#fg_pct-1").classList.add("worst-stat") : document.querySelector("#fg_pct-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#fg_pct-1").style.border = "0px"
            document.querySelector("#fg_pct-2").style.border = "0px"
        }

        if (typeof player1.stats.fg3a !== 'undefined' && player1.stats.fg3a !== null && typeof player2.stats.fg3a !== 'undefined' && player1.stats.fg3a !== null){
            document.querySelector("#three-pa-1").innerHTML=`${player1.stats.fg3a} 3PA`
            document.querySelector("#three-pa-2").innerHTML=`${player2.stats.fg3a} 3PA`
            if (player1.stats.fg3a !== player2.stats.fg3a){
                player1.stats.fg3a > player2.stats.fg3a ? document.querySelector("#three-pa-1").classList.add("better-stat") : document.querySelector("#three-pa-2").classList.add("better-stat");
                player1.stats.fg3a < player2.stats.fg3a ? document.querySelector("#three-pa-1").classList.add("worst-stat") : document.querySelector("#three-pa-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#three-pa-1").style.border = "0px"
            document.querySelector("#three-pa-2").style.border = "0px"
        }

        if (typeof player1.stats.fg3_pct !== 'undefined' && player1.stats.fg3_pct !== null && typeof player2.stats.fg3_pct !== 'undefined' && player1.stats.fg3_pct !== null){
            document.querySelector("#three_pct-1").innerHTML=`${player1.stats.fg3_pct} 3P%`
            document.querySelector("#three_pct-2").innerHTML=`${player2.stats.fg3_pct} 3P%`
            if (player1.stats.fg3_pct !== player2.stats.fg3_pct){
                player1.stats.fg3_pct > player2.stats.fg3_pct ? document.querySelector("#three_pct-1").classList.add("better-stat") : document.querySelector("#three_pct-2").classList.add("better-stat");
                player1.stats.fg3_pct < player2.stats.fg3_pct ? document.querySelector("#three_pct-1").classList.add("worst-stat") : document.querySelector("#three_pct-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#three_pct-1").style.border = "0px"
            document.querySelector("#three_pct-2").style.border = "0px"
        }

        if (typeof player1.stats.fta !== 'undefined' && player1.stats.fta !== null && typeof player2.stats.fta !== 'undefined' && player2.stats.fta !== null){
            document.querySelector("#fta-1").innerHTML=`${player1.stats.fta} FTA`
            document.querySelector("#fta-2").innerHTML=`${player2.stats.fta} FTA`
            if (player1.stats.fta !== player2.stats.fta){
                player1.stats.fta > player2.stats.fta ? document.querySelector("#fta-1").classList.add("better-stat") : document.querySelector("#fta-2").classList.add("better-stat");
                player1.stats.fta < player2.stats.fta ? document.querySelector("#fta-1").classList.add("worst-stat") : document.querySelector("#fta-2").classList.add("worst-stat");
            }    
        }
        else{
            document.querySelector("#fta-1").style.border = "0px"
            document.querySelector("#fta-2").style.border = "0px"
        }

        if (typeof player1.stats.ft_pct !== 'undefined' && player1.stats.ft_pct !== null && typeof player2.stats.ft_pct !== 'undefined' && player2.stats.ft_pct !== null){
            document.querySelector("#ft_pct-1").innerHTML=`${player1.stats.ft_pct} FT%`
            document.querySelector("#ft_pct-2").innerHTML=`${player2.stats.ft_pct} FT%`
            if (player1.stats.ft_pct !== player2.stats.ft_pct){
                player1.stats.ft_pct > player2.stats.ft_pct ? document.querySelector("#ft_pct-1").classList.add("better-stat") : document.querySelector("#ft_pct-2").classList.add("better-stat");
                player1.stats.ft_pct < player2.stats.ft_pct ? document.querySelector("#ft_pct-1").classList.add("worst-stat") : document.querySelector("#ft_pct-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#ft_pct-1").style.border = "0px"
            document.querySelector("#ft_pct-2").style.border = "0px"
        }

        if (typeof player1.stats.pf !== 'undefined' && player1.stats.pf !== null && typeof player2.stats.pf !== 'undefined' && player2.stats.pf !== null){
            document.querySelector("#fouls-1").innerHTML=`${player1.stats.pf} FOULS`
            document.querySelector("#fouls-2").innerHTML=`${player2.stats.pf} FOULS`
            if (player1.stats.pf !== player2.stats.pf){
                player1.stats.pf < player2.stats.pf ? document.querySelector("#fouls-1").classList.add("better-stat") : document.querySelector("#fouls-2").classList.add("better-stat");
                player1.stats.pf > player2.stats.pf ? document.querySelector("#fouls-1").classList.add("worst-stat") : document.querySelector("#fouls-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#fouls-1").style.border = "0px"
            document.querySelector("#fouls-2").style.border = "0px"
        }

        if (typeof player1.stats.games_played !== 'undefined' && player1.stats.games_played !== null && typeof player2.stats.games_played !== 'undefined' && player2.stats.games_played !== null){
            document.querySelector("#games-1").innerHTML=`${player1.stats.games_played} GAMES`
            document.querySelector("#games-2").innerHTML=`${player2.stats.games_played} GAMES`
            if (player1.stats.games_played !== player2.stats.games_played){
                player1.stats.games_played > player2.stats.games_played ? document.querySelector("#games-1").classList.add("better-stat") : document.querySelector("#games-2").classList.add("better-stat");
                player1.stats.games_played < player2.stats.games_played ? document.querySelector("#games-1").classList.add("worst-stat") : document.querySelector("#games-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#games-1").style.border = "0px"
            document.querySelector("#games-2").style.border = "0px"
        }

        if (typeof player1.stats.min !== 'undefined' && player1.stats.min !== null && typeof player2.stats.min !== 'undefined' && player2.stats.min !== null){
            document.querySelector("#min-1").innerHTML=`${player1.stats.min} MIN`
            document.querySelector("#min-2").innerHTML=`${player2.stats.min} MIN`
            if (player1.stats.min !== player2.stats.min){
                player1.stats.min > player2.stats.min ? document.querySelector("#min-1").classList.add("better-stat") : document.querySelector("#min-2").classList.add("better-stat");
                player1.stats.min < player2.stats.min ? document.querySelector("#min-1").classList.add("worst-stat") : document.querySelector("#min-2").classList.add("worst-stat");
            }
        }
        else{
            document.querySelector("#min-1").style.border = "0px"
            document.querySelector("#min-2").style.border = "0px"
        }
    }
  
    return (
        <>
        <div className="nba-search">
            <div className="nba-players">
                <input type="submit" value="Search" id = "search-button" onClick={onSubmit}/>
            </div>
            
            <div id="search-error"></div>

            <div className="player-stats">
                <div id="player-1-stats">
                    <img src="" id="player-1-img" alt=""/>
                    <div id="player-1-info">
                        <div id="player-1-stats-name"></div>
                        <ul id="player-1-stats-list">
                            <li id="pts-1"></li>
                            <li id="reb-1"></li>
                            <li id="ast-1"></li>
                            <li id="blk-1"></li>
                            <li id="stl-1"></li>
                            <li id="to-1"></li>
                            <li id="fga-1"></li>
                            <li id="fg_pct-1"></li>
                            <li id="three-pa-1"></li>
                            <li id="three_pct-1"></li>
                            <li id="fta-1"></li>
                            <li id="ft_pct-1"></li>
                            <li id="fouls-1"></li>
                            <li id="min-1"></li>
                            <li id="games-1"></li>
                        </ul>
                    </div>
                </div> 
                <div id="player-2-stats">
                    <div id="player-2-info">
                        <div id="player-2-stats-name"></div>
                        <ul id="player-2-stats-list">
                            <li id="pts-2"></li>
                            <li id="reb-2"></li>
                            <li id="ast-2"></li>
                            <li id="blk-2"></li>
                            <li id="stl-2"></li>
                            <li id="to-2"></li>
                            <li id="fga-2"></li>
                            <li id="fg_pct-2"></li>
                            <li id="three-pa-2"></li>
                            <li id="three_pct-2"></li>
                            <li id="fta-2"></li>
                            <li id="ft_pct-2"></li>
                            <li id="fouls-2"></li>
                            <li id="min-2"></li>
                            <li id="games-2"></li>
                        </ul>
                    </div>
                    <img src="" id="player-2-img" alt=""/>
                </div> 
            </div>
        </div>
        </>
  )
}
  
export default Players