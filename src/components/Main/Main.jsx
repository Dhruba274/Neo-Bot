import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [isListening, setIsListening] = useState(false);

  // Speech-to-Text Handler
  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prevInput) => prevInput + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      alert(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.start();
  };

  // Function to handle card clicks
  const handleCardClick = (text) => {
    setInput(text); // Set the clicked card's text to the input
  };

  return (
    <div className="main">
      <div className="nav">
        <p>NeoBot</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,</span>
              </p>
              <p>How can I help you, today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick('Generate creative ideas for a weekend project')}>
                <p>Generate creative ideas for a weekend project</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('Suggest innovative solutions for increasing productivity')}>
                <p>Suggest innovative solutions for increasing productivity</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('Provide topics for an engaging blog or article')}>
                <p>Provide topics for an engaging blog or article</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('Give me project ideas for web development')}>
                <p>Give me project ideas for web development</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search your query"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img
                src={assets.mic_icon}
                alt="Microphone Icon"
                onClick={handleSpeechToText}
                style={{
                  cursor: 'pointer',
                  opacity: isListening ? 0.5 : 1,
                }}
                title={isListening ? 'Listening...' : 'Click to Speak'}
              />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">NeoBot may give incorrect results</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
