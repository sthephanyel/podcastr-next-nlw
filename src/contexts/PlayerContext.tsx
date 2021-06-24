import { Children, createContext, ReactNode, useContext, useState } from 'react';

type Episode ={
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData={
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;

    //recebe a função enviada pelo _app.tsx
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext :() => void;
    playPrevious :() => void;
    hasNext: boolean;
    hasPrevious: boolean;

    togglePlay :() => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState:() => void;

    setPlayingState: (state:boolean) => void;

    
};


//compartilha essa informação com outros componentes (_app.tsx)
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps ={
    children: ReactNode;
}

export function PlayerContextProvider({children}:PlayerContextProviderProps){

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);


  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex +1) < episodeList.length;

  function playList(list: Episode[], index: number){

    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function play (episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay (){
    setIsPlaying(!isPlaying);
  }
  function toggleLoop (){
    setIsLooping(!isLooping);
  }
  function toggleShuffle(){
      setIsShuffling(!isLooping);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }
  function playNext(){
      if (isShuffling){
        const nexRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nexRandomEpisodeIndex);
      }else if (hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex +1);
      }
  }
  function playPrevious(){
      if(hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex +1);
      }
  }
  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    
// obrigatorio passar o valor que será utilizado e compartilhado
<PlayerContext.Provider 
value={{
episodeList, 
currentEpisodeIndex, 
play,
playList,
playNext,
hasNext,
hasPrevious,
playPrevious,
isPlaying, 
togglePlay, 
toggleLoop,
isLooping,
isShuffling,
toggleShuffle,
clearPlayerState,
setPlayingState}}>
    {children}
</PlayerContext.Provider>
  )
}


export const usePlayer = () => {
    return useContext(PlayerContext);
}