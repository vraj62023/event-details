import React, { useState, useEffect } from 'react';
import PolygonBanner from "./components/LowPolyBackground";
import "./index.css";
import EventDetails from './eventDetails';

function App() {
  const [intro, setIntro] = useState(true);
  const [rules, setRules] = useState(false);

  useEffect(() => {
    if (intro) {
      console.log("hello");
    }
  }, [intro]);

  return (
    <div className="app-container">
      {/* Background */}
      <div className="background">
        <PolygonBanner />
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${intro ? "active" : ""}`}
          onClick={() => {
            setIntro(true);
            setRules(false);
          }}
        >
          Introduction
        </div>
        <div
          className={`tab ${rules ? "active" : ""}`}
          onClick={() => {
            setIntro(false);
            setRules(true);
          }}
        >
          Rules
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <EventDetails  />
      </div>
    </div>
  );
}

export default App;
