import { useState, useEffect, useCallback, useMemo } from 'react';

interface Speaker {
  id: string;
  name: string;
}

interface SpeakerState {
  speakers: Speaker[];
  filter: string;
}

const useFetchSpeakers = (URL: string) => {
/*
Definimos los estados iniciales para manejar,tambien para cargar y paa manejar errores
*/
  const [state, setState] = useState<SpeakerState>({ speakers: [], filter: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
/*
Usamos funcion asincronica para obtnerlos datos del url externo y en base realizar
interaciones como poder generar datos,filtar,actualizar y manipular la informacion.
*/
  const fetchSpeakers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      /*
      Vemos la data inicializamos utilizado el id,name de interface speaker.
      */
      setState(prevState => ({
        ...prevState,
        speakers: data.users.map((user: any) => ({ 
          id: user.id.toString(), 
          name: `${user.firstName} ${user.lastName}` 
        }))
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');//Manejo de errores
    } finally {
      setLoading(false);
    }
  }, [URL]);// la dependencia en este caso es la url para menajar todo

  //optenemos cuando inicia
  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);
//en este para ñadir un nuevo dato
//añadir 
  const handleAddSpeaker = useCallback((name: string) => {
    const newSpeaker: Speaker = { id: Date.now().toString(), name };
    setState(prevState => ({
      ...prevState,
      speakers: [...prevState.speakers, newSpeaker]
    }));
  }, []);
//este es para eliminar teniendo el id 
  const handleRemoveSpeaker = useCallback((id: string) => {
    setState(prevState => ({
      ...prevState,
      speakers: prevState.speakers.filter(s => s.id !== id)
    }));
  }, []);
//este para filtrar
  const setFilter = useCallback((filter: string) => {
    setState(prevState => ({ ...prevState, filter }));
  }, []);
//es para obtener despues del filtrado los datos
  const filteredSpeakers = useMemo(() => {
    return state.speakers.filter(speaker => 
      speaker.name.toLowerCase().includes(state.filter.toLowerCase())
    );
  }, [state.speakers, state.filter]);

  return { 
    speakers: filteredSpeakers, 
    loading, 
    error, 
    handleAddSpeaker, 
    handleRemoveSpeaker,
    setFilter
  };
};

export default useFetchSpeakers;