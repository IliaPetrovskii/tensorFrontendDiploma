import player_default_album from './player_default_album.png';
import prev from './prev.png';
import play from './play.png';
import next from './next.png';
import search from './search.png';

//Компонент хэдера страниц
export const Header = () => {
    return (
        <header className="header">
            <div className="player-bar">
                <div className="player-bar-poster">
                    <img className="player-bar-img" src={player_default_album} alt="default poster"/>
                </div>
                <div><img className="player-bar-img" src={prev} alt="prev"/></div>
                <div><img className="player-bar-img" src={play} alt="play"/></div>
                <div><img className="player-bar-img" src={next} alt="next"/></div>
            </div>
            <a className="header-website-name" href="/">Last.fm</a>
            <nav className="navbar">
                <a className="navbar-search navbar-item" href="/search">
                    <img className="navbar-search-img" src={search} alt="search"/>
                </a>
                <div className="navbar-item">Live</div>
                <div className="navbar-item">Music</div>
                <div className="navbar-item">Charts</div>
                <div className="navbar-item">Events</div>
                <div className="navbar-item">Features</div>
            </nav>
        </header>
    );
};