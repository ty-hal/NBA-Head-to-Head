const Glossary = () => {
    return (
      <div id="glossary">
        <div id="glossary-info">
          <p>
            All statistics are measured per game except for the GAMES statistic. If the data for a statistic of one or both players in a search are missing then the statistic will be ignored for both players. 
            If both players have identical values for a statistic then neither will be displayed as green nor red.
          </p>
        </div>
        <div id="glossary-stats">
          <p>
            Each statistics' abbreviation is listed below: 
          </p>
        </div>
        <ul>
          <li>
            <span className="bold">PTS</span> - Points
          </li>
          <li>
            <span className="bold">REB</span> - Rebounds
          </li>
          <li>
            <span className="bold">AST</span> - Assists
          </li>
          <li>
            <span className="bold">BLK</span> - Blocks
          </li>
          <li>
            <span className="bold">STL</span> - Steals
          </li>
          <li>
            <span className="bold">TO</span> - Turnovers
          </li>
          <li>
            <span className="bold">FGA</span> - Field Goal Attempts
          </li>
          <li>
            <span className="bold">FG%</span> - Field Goal Percent Made
          </li>
          <li>
            <span className="bold">3PA</span> - 3 Point Shot Attempts
          </li>
          <li>
            <span className="bold">3P%</span> - 3 Point Shot Percent Made
          </li>
          <li>
            <span className="bold">FTA</span> - Free Throw Attempts
          </li>
          <li>
            <span className="bold">FT%</span> - Free Throw Percent Made
          </li>
          <li>
            <span className="bold">FOULS</span> - Fouls
          </li>
          <li>
            <span className="bold">MIN</span> - Minutes Played
          </li>
          <li>
            <span className="bold">GAMES</span> - Total Games Played 
          </li>
        </ul>
      </div>
    )
  };
  
export default Glossary;