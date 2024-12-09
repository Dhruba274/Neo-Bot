import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setPrevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Load a prompt and execute the onSent function
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  // Delete a specific prompt from the recent list
  const deletePrompt = (index) => {
    setPrevPrompts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`sidebar ${extended ? 'open' : ''}`}>
      {/* Top Section */}
      <div className="top">
        {/* Hamburger menu */}
        <div
          className="hamburger-menu"
          onClick={() => setExtended((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          <img src={assets.menu_icon} alt="Menu" />
        </div>

        {/* New Chat Button */}
        <div onClick={newChat} className="new-chat" aria-label="Start a New Chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts */}
        {extended && prevPrompts.length > 0 && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} className="recent-entry">
                <img
                  onClick={() => loadPrompt(item)}
                  src={assets.message_icon}
                  alt="Load Prompt"
                  aria-label={`Load prompt ${index + 1}`}
                />
                <p onClick={() => loadPrompt(item)}>{item.slice(0, 18)}...</p>
                {/* Delete Icon */}
                <img
                  className="delete-icon"
                  onClick={() => deletePrompt(index)}
                  src={assets.delete_icon}
                  alt="Delete Prompt"
                  aria-label={`Delete prompt ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item recent-entry" aria-label="Help">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry" aria-label="Activity">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry" aria-label="Settings">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
