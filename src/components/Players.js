import React from 'react';

const Players = ({player1, player2, btnClick, findStats}) => {
    const onSubmit = () => {
        btnClick(document.querySelector("#player-1-name").value, document.querySelector("#player-2-name").value);
        findStats()
        .then(() => console.log(player1, player2))
        .then(() => showStats(player1, player2))
        .catch(() => alert("Error. Check for player name typos."));
    }
    
    const showStats = (player1, player2) => {
        document.querySelector("#player-1-stats-name").innerHTML=player1.name
        document.querySelector("#player-2-stats-name").innerHTML=player2.name

        if (player1.stats.pts && player2.stats.pts){
            document.querySelector("#pts-1").classList.remove("highlight");
            document.querySelector("#pts-2").classList.remove("highlight");
            player1.stats.pts > player2.stats.pts ? document.querySelector("#pts-1").classList.add("highlight") : document.querySelector("#pts-2").classList.add("highlight");
            document.querySelector("#pts-1").innerHTML=`${player1.stats.pts} PTS`
            document.querySelector("#pts-2").innerHTML=`${player2.stats.pts} PTS`
        }
        if (player1.stats.reb && player2.stats.reb){
            document.querySelector("#reb-1").classList.remove("highlight");
            document.querySelector("#reb-2").classList.remove("highlight");
            player1.stats.reb > player2.stats.reb ? document.querySelector("#reb-1").classList.add("highlight") : document.querySelector("#reb-2").classList.add("highlight");
            document.querySelector("#reb-1").innerHTML=`${player1.stats.reb} REB`
            document.querySelector("#reb-2").innerHTML=`${player2.stats.reb} REB`
        }
        if (player1.stats.ast && player2.stats.ast){
            document.querySelector("#ast-1").classList.remove("highlight");
            document.querySelector("#ast-2").classList.remove("highlight");
            player1.stats.ast > player2.stats.ast ? document.querySelector("#ast-1").classList.add("highlight") : document.querySelector("#ast-2").classList.add("highlight");
            document.querySelector("#ast-1").innerHTML=`${player1.stats.ast} AST`
            document.querySelector("#ast-2").innerHTML=`${player2.stats.ast} AST`
        }
        if (player1.stats.blk && player2.stats.blk){
            document.querySelector("#blk-1").classList.remove("highlight");
            document.querySelector("#blk-2").classList.remove("highlight");
            player1.stats.blk > player2.stats.blk ? document.querySelector("#blk-1").classList.add("highlight") : document.querySelector("#blk-2").classList.add("highlight");
            document.querySelector("#blk-1").innerHTML=`${player1.stats.blk} BLK`
            document.querySelector("#blk-2").innerHTML=`${player2.stats.blk} BLK`
        }
        if (player1.stats.stl && player2.stats.stl){
            document.querySelector("#stl-1").classList.remove("highlight");
            document.querySelector("#stl-2").classList.remove("highlight");
            player1.stats.stl > player2.stats.stl ? document.querySelector("#stl-1").classList.add("highlight") : document.querySelector("#stl-2").classList.add("highlight");
            document.querySelector("#stl-1").innerHTML=`${player1.stats.stl} STL`
            document.querySelector("#stl-2").innerHTML=`${player2.stats.stl} STL`
        }
        if (player1.stats.turnover && player2.stats.turnover){
            document.querySelector("#to-1").classList.remove("highlight");
            document.querySelector("#to-2").classList.remove("highlight");
            player1.stats.turnover < player2.stats.turnover ? document.querySelector("#to-1").classList.add("highlight") : document.querySelector("#to-2").classList.add("highlight");
            document.querySelector("#to-1").innerHTML=`${player1.stats.turnover} TO`
            document.querySelector("#to-2").innerHTML=`${player2.stats.turnover} TO`
        }
        if (player1.stats.fga && player2.stats.fga){
            document.querySelector("#fga-1").classList.remove("highlight");
            document.querySelector("#fga-2").classList.remove("highlight");
            player1.stats.fga > player2.stats.fga ? document.querySelector("#fga-1").classList.add("highlight") : document.querySelector("#fga-2").classList.add("highlight");
            document.querySelector("#fga-1").innerHTML=`${player1.stats.fga} FGA`
            document.querySelector("#fga-2").innerHTML=`${player2.stats.fga} FGA`
        }
        if (player1.stats.fg_pct && player2.stats.fg_pct){
            document.querySelector("#fg_pct-1").classList.remove("highlight");
            document.querySelector("#fg_pct-2").classList.remove("highlight");
            player1.stats.fg_pct > player2.stats.fg_pct ? document.querySelector("#fg_pct-1").classList.add("highlight") : document.querySelector("#fg_pct-2").classList.add("highlight");
            document.querySelector("#fg_pct-1").innerHTML=`${player1.stats.fg_pct} FG%`
            document.querySelector("#fg_pct-2").innerHTML=`${player2.stats.fg_pct} FG%`
        }
        if (player1.stats.fg3a && player2.stats.fg3a){
            document.querySelector("#three-pa-1").classList.remove("highlight");
            document.querySelector("#three-pa-2").classList.remove("highlight");
            player1.stats.fg3a > player2.stats.fg3a ? document.querySelector("#three-pa-1").classList.add("highlight") : document.querySelector("#three-pa-2").classList.add("highlight");
            document.querySelector("#three-pa-1").innerHTML=`${player1.stats.fg3a} 3PA`
            document.querySelector("#three-pa-2").innerHTML=`${player2.stats.fg3a} 3PA`
        }
        if (player1.stats.fg3_pct && player2.stats.fg3_pct){
            document.querySelector("#three_pct-1").classList.remove("highlight");
            document.querySelector("#three_pct-2").classList.remove("highlight");
            player1.stats.fg3_pct > player2.stats.fg3_pct ? document.querySelector("#three_pct-1").classList.add("highlight") : document.querySelector("#three_pct-2").classList.add("highlight");
            document.querySelector("#three_pct-1").innerHTML=`${player1.stats.fg3_pct} 3P%`
            document.querySelector("#three_pct-2").innerHTML=`${player2.stats.fg3_pct} 3P%`
        }
        if (player1.stats.fta && player2.stats.fta){
            document.querySelector("#fta-1").classList.remove("highlight");
            document.querySelector("#fta-2").classList.remove("highlight");
            player1.stats.fta > player2.stats.fta ? document.querySelector("#fta-1").classList.add("highlight") : document.querySelector("#fta-2").classList.add("highlight");
            document.querySelector("#fta-1").innerHTML=`${player1.stats.fta} FTA`
            document.querySelector("#fta-2").innerHTML=`${player2.stats.fta} FTA`
        }
        if (player1.stats.ft_pct && player2.stats.ft_pct){
            document.querySelector("#ft_pct-1").classList.remove("highlight");
            document.querySelector("#ft_pct-2").classList.remove("highlight");
            player1.stats.ft_pct > player2.stats.ft_pct ? document.querySelector("#ft_pct-1").classList.add("highlight") : document.querySelector("#ft_pct-2").classList.add("highlight");
            document.querySelector("#ft_pct-1").innerHTML=`${player1.stats.ft_pct} FT%`
            document.querySelector("#ft_pct-2").innerHTML=`${player2.stats.ft_pct} FT%`
        }
        if (player1.stats.pf && player2.stats.pf){
            document.querySelector("#fouls-1").classList.remove("highlight");
            document.querySelector("#fouls-2").classList.remove("highlight");
            player1.stats.pf < player2.stats.pf ? document.querySelector("#fouls-1").classList.add("highlight") : document.querySelector("#fouls-2").classList.add("highlight");
            document.querySelector("#fouls-1").innerHTML=`${player1.stats.pf} FOULS`
            document.querySelector("#fouls-2").innerHTML=`${player2.stats.pf} FOULS`
        }
        if (player1.stats.games_played && player2.stats.games_played){
            document.querySelector("#games-1").classList.remove("highlight");
            document.querySelector("#games-2").classList.remove("highlight");
            player1.stats.games_played > player2.stats.games_played ? document.querySelector("#games-1").classList.add("highlight") : document.querySelector("#games-2").classList.add("highlight");
            document.querySelector("#games-1").innerHTML=`${player1.stats.games_played} GAMES`
            document.querySelector("#games-2").innerHTML=`${player2.stats.games_played} GAMES`
        }
        if (player1.stats.min && player2.stats.min){
            document.querySelector("#min-1").classList.remove("highlight");
            document.querySelector("#min-2").classList.remove("highlight");
            player1.stats.min > player2.stats.min ? document.querySelector("#min-1").classList.add("highlight") : document.querySelector("#min-2").classList.add("highlight");
            document.querySelector("#min-1").innerHTML=`${player1.stats.min} MIN`
            document.querySelector("#min-2").innerHTML=`${player2.stats.min} MIN`
        }

    }
  

    return (
        <>
        <div className="nba-search">
            <p>Please enter two players to compare</p>
            <div className="nba-players">
                <input type="text" placeholder = "Player 1" id = "player-1-name"/>
                <input type="text" placeholder = "Player 2" id = "player-2-name"/>
                <input type="submit" value="Search" id = "search-button" onClick={onSubmit}/>
            </div>
            
            <div className="player-stats">
                <div id="player-1-stats">
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
                        <li id="games-1"></li>
                        <li id="min-1"></li>
                    </ul>
                </div> 
                <div id="player-2-stats">
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
                        <li id="games-2"></li>
                        <li id="min-2"></li>
                    </ul>
                </div> 
            </div>

        </div>
        {/* {showStats(player1, player2)} */}
        </>
  )
}

export default Players