import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">
          <div className="webname">
            <img src={require('../images/logo.png')} alt="NBA" id="nba-logo" />
            <div className="title">
                <span className="blue-highlight">Head</span>
                <span className="black-highlight">-</span>
                <span className="white-highlight">to</span>
                <span className="black-highlight">-</span>
                <span className="red-highlight">Head</span>
            </div>
          </div>
        </Link>
        <nav>
            <ul>
                <li className ="current">
                  <Link to="/">Home</Link>
                </li>
                <li> 
                  <Link to="/glossary">Glossary</Link>
                </li>
            </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
};

export default Layout;