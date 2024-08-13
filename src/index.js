import {React, useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GetTrackMeta from './components/GetTrackMeta';
import Text from './components/Text';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modules from './components/Modules';
import NextDownload from './components/NextDownload';
import UseSpotifyData from './utilities/UseSpotifyData'
const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  typography: {
    fontFamily: 'Gotham, sans-serif',
  },
});



export default function App() {
  const [track, setTrack] = useState(null);
  const { trackData,error } = UseSpotifyData(track); 
  const updateTrack = (newTrack) => {
    if(newTrack !== track) {
      setTrack(newTrack);
    }
  };
  console.log(error);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Text />
        {trackData == null && <GetTrackMeta trackSelected={updateTrack} />}
        {trackData &&
          <>
            <Modules trackFromDownload={track} />
            <NextDownload toggle={updateTrack} />
          </>
          }
        {
          error && trackData == null &&
          (<p style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: 15 }}>
            Not a valid Spotify link
          </p>) 
        }
      </ThemeProvider>
    </>
  );
}
root.render(
  <App />
);