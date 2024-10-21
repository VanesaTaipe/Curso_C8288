import React, { useState } from 'react';
import useFetchSpeakers from './Pregunta2';

const App = () => {
  const API_URL = "https://dummyjson.com/users";
  const { speakers, loading, error, handleAddSpeaker, handleRemoveSpeaker, setFilter } = useFetchSpeakers(API_URL);
  const [newSpeakerName, setNewSpeakerName] = useState('');//iniciar

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Speaker</h1>
      <input 
        type="text" 
        placeholder="Filter speakers" 
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {speakers.map((speaker) => (
          <li key={speaker.id}>
            {speaker.name}
            <button onClick={() => handleRemoveSpeaker(speaker.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newSpeakerName}
        onChange={(e) => setNewSpeakerName(e.target.value)}
        placeholder="New speaker name"
      />
      <button 
        onClick={() => {
          if (newSpeakerName) {
            handleAddSpeaker(newSpeakerName);
            setNewSpeakerName('');
          }
        }}
      >
        Add Speaker
      </button>
    </div>
  );
};

export default App;