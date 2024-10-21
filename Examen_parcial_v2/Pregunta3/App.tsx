import React, { useEffect, useState } from 'react';
import { agregarEvent } from './Pregunta3';

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalLog = console.log;
    console.log = (args) => {
      setLogs(args.join(' '));
      originalLog.apply(console, args);
    };

 
    agregarEvent();

    
    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div>
      <h1>Gestor de Eventos</h1>
      <h2>Logs:</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;