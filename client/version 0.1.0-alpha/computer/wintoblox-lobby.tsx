import React, { useState } from 'react';
import './wintoblox-lobby.css';
import Cursor from './games/Cursor';
import Obby from './games/obby';
import IgraVKalmara from './games/igra_v_kalmara';

type GameView = 'lobby' | 'obby' | 'kalmara' | 'third';

const WintoBloxLobby: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>('lobby');
  const [skin, setSkin] = useState('Default');
  const [showSkinChange, setShowSkinChange] = useState(false);

  const games = [
    {
      id: 'obby' as const,
      title: 'WintoCraft Test Obby',
      description: 'Платформер с препятствиями',
    },
    {
      id: 'kalmara' as const,
      title: 'Красный цвет, зеленый цвет',
      description: 'Игра в кальмара',
    },
    {
      id: 'third' as const,
      title: 'Игра 3',
      description: 'Скоро...',
    },
  ];

  const handlePlay = (gameId: GameView) => {
    setCurrentView(gameId);
  };

  const handleBack = () => {
    setCurrentView('lobby');
  };

  const handleSkinChange = () => {
    const skins = ['Default', 'Red', 'Blue', 'Green', 'Gold'];
    const currentIndex = skins.indexOf(skin);
    const nextSkin = skins[(currentIndex + 1) % skins.length];
    setSkin(nextSkin);
    setShowSkinChange(true);
    setTimeout(() => setShowSkinChange(false), 1500);
  };

  if (currentView !== 'lobby') {
    if (currentView === 'obby') {
      return <Obby />;
    }
    if (currentView === 'kalmara') {
      return <IgraVKalmara />;
    }
    return (
      <div className="coming-soon">
        <h1>Скоро...</h1>
        <button onClick={handleBack}>Назад в лобби</button>
      </div>
    );
  }

  return (
    <div className="lobby-container">
      <Cursor />
      
      {/* Logo */}
      <div className="logo-container">
        <img src="../logos/bolshoe_logo.svg" alt="WintoBlox" className="main-logo" />
      </div>

      {/* Header */}
      <div className="lobby-header">
        <div className="user-info">
          <div className="user-avatar" style={{ backgroundColor: getSkinColor(skin) }}>
            <span className="user-avatar-text">{skin[0]}</span>
          </div>
          <span className="user-name">User</span>
        </div>
        <button className="skin-btn" onClick={handleSkinChange}>
          Сменить скин
        </button>
      </div>

      {showSkinChange && (
        <div className="skin-notification">
          Скины: {skin}
        </div>
      )}

      {/* Games Grid */}
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-title">{game.title}</div>
            <div className="game-description">{game.description}</div>
            <button
              className="play-btn"
              onClick={() => handlePlay(game.id)}
              disabled={game.id === 'third'}
            >
              <svg viewBox="0 0 24 24" className="play-icon">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="lobby-footer">
        <button className="studio-btn" disabled>
          Winto Studio
        </button>
      </div>
    </div>
  );
};

function getSkinColor(skin: string): string {
  const colors: Record<string, string> = {
    Default: '#4ecca3',
    Red: '#e94560',
    Blue: '#0f3460',
    Green: '#00d2d3',
    Gold: '#ffd700',
  };
  return colors[skin] || '#4ecca3';
}

export default WintoBloxLobby;
