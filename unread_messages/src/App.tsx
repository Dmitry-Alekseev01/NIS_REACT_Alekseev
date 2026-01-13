import React, { useState } from 'react';
import './App.css';
import MessageNotification from './components/MessageNotification/MessageNotification';
import './i18n/config/i18n.config';

function App() {
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');

  return (
    <div className="App">
      <header className="App-header">
        <div className="locale-switcher">
          <button 
            className={`locale-btn ${locale === 'ru' ? 'active' : ''}`}
            onClick={() => setLocale('ru')}
          >
            🇷🇺 Русский
          </button>
          <button 
            className={`locale-btn ${locale === 'en' ? 'active' : ''}`}
            onClick={() => setLocale('en')}
          >
            🇬🇧 English
          </button>
        </div>
      </header>

      <main className="App-main">
        <section className="result">
          <MessageNotification locale={locale} />
        </section>

        <section className="explanation">
          <h3>Объяснение плюрализации:</h3>
          
          <div className="plural-rules">
            <div className="rule">
              <h4>Русский язык:</h4>
              <ul>
                <li><strong>one (1):</strong> "У вас 1 непрочитанное сообщение"</li>
                <li><strong>few (2-4):</strong> "У вас 3 непрочитанных сообщения"</li>
                <li><strong>many (0,5+):</strong> "У вас 7 непрочитанных сообщений"</li>
                <li>Исключение: 11-19, 111-119 и т.д. → many</li>
              </ul>
            </div>
            
            <div className="rule">
              <h4>Английский язык:</h4>
              <ul>
                <li><strong>one (1):</strong> "You have 1 unread message"</li>
                <li><strong>other (2+):</strong> "You have 5 unread messages"</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;