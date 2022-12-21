import React from 'react';
const Header = () => {
  return (
    <header>
        <div className="webname">
            <h1><span className="title-highlight">NBA</span> Head-to-Head</h1>
        </div>
        <nav>
            <ul>
                <li className ="current"><a href="index.html">Home</a></li>
                <li>Glossary</li>
                <li>Contact</li>
                {/* <li><a href="#">Glossary</a></li>
                <li><a href="#">Contact</a></li> */}
            </ul>
        </nav>
    </header>
  )
}

export default Header