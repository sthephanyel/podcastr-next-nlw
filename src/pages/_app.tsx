import '../styles/global.scss';
import { Header } from '../components/Header'
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { useState } from 'react';


function MyApp({ Component, pageProps }) {
  
  return(

    // utiliza essa função para adicionar todas as funções que serão usadas na pasta "PlayerContext", para melhor organização do codigo
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        {/* componentes que serão mostrados em todas as telas */}
        <main>
          <Header/>
          {/* é onde será exibido o conteudo da pagina */}
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
    </PlayerContextProvider>
  )
    
}

export default MyApp
