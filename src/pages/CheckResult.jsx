import React, { useState } from 'react';
import './CheckResult.css';

function CheckResult() {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const questions = {
    All: [
      "What is the main idea of the passage?",
      "How does the author support their argument?",
      "What can be inferred from the text?",
    ],
    Reading: [
      "What is the theme of the story?",
      "Identify the key points made by the author.",
      "What is the author's tone in the passage?",
    ],
    Listening: [
      "What was the speaker's main message?",
      "How does the speaker's tone change throughout the talk?",
      "What examples does the speaker give to support their points?",
    ],
    Writing: [
      "How would you structure an essay on this topic?",
      "What are the key components of a strong thesis statement?",
      "How can you effectively argue against the opposing viewpoint?",
    ],
    Speaking: [
      "Describe a situation where you had to convince someone of your opinion.",
      "How do you organize your thoughts before speaking?",
      "What strategies can you use to keep your audience engaged?",
    ],
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => handleTabClick('All')}
        >
          All
        </button>
        <button
          className={`tab-button ${activeTab === 'Reading' ? 'active' : ''}`}
          onClick={() => handleTabClick('Reading')}
        >
          Reading
        </button>
        <button
          className={`tab-button ${activeTab === 'Listening' ? 'active' : ''}`}
          onClick={() => handleTabClick('Listening')}
        >
          Listening
        </button>
        <button
          className={`tab-button ${activeTab === 'Writing' ? 'active' : ''}`}
          onClick={() => handleTabClick('Writing')}
        >
          Writing
        </button>
        <button
          className={`tab-button ${activeTab === 'Speaking' ? 'active' : ''}`}
          onClick={() => handleTabClick('Speaking')}
        >
          Speaking
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'All' && <div>All content goes here...</div>}
        {activeTab === 'Reading' && <div>Reading content goes here...</div>}
        {activeTab === 'Listening' && <div>Listening content goes here...</div>}
        {activeTab === 'Writing' && <div>Writing content goes here...</div>}
        {activeTab === 'Speaking' && <div>Speaking content goes here...</div>}
      </div>

      {/* Questions Section */}
      <div className="questions-list">
        <h2 className="questions-title">Questions for {activeTab}</h2>
        <ul>
          {questions[activeTab].map((question, index) => (
            <li key={index} className="question-item">
              {question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CheckResult;
