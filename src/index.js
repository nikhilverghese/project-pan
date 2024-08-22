import {React, useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import GetTrackMeta from './components/GetTrackMeta';
import Text from './components/Text';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modules from './components/Modules';
import NextDownload from './components/NextDownload';
import UseSpotifyData from './utilities/UseSpotifyData'
import downloadFile from './utilities/DownloadFile'
import DownloadAnimation from './utilities/DownloadAnimation'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  typography: {
    fontFamily: 'Gotham, sans-serif',
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyD7qcXACmo46OnWctYpYHgF6GLWOAM8VoU",
  authDomain: "project-pan-f2d92.firebaseapp.com",
  projectId: "project-pan-f2d92",
  storageBucket: "project-pan-f2d92.appspot.com",
  messagingSenderId: "916616314590",
  appId: "1:916616314590:web:e8624b494a46c69a1b0c4f",
  measurementId: "G-24JT73Z3JS"
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const [track, setTrack] = useState(null);
  const { trackData,error } = UseSpotifyData(track); 
  const [submit, updateSubmit] = useState(false);
  const [downloadStatus,setDownloadStatus] = useState(0);
  const updateTrack = (newTrack) => {
    if(newTrack !== track) {
      setTrack(newTrack);
      setDownloadStatus(0);
    }
  };

  useEffect(() => {
    if(submit && trackData !== null) {
      setDownloadStatus(50)
      const download = async () => {
        await downloadFile(track, trackData);
        setDownloadStatus(100);
      }
      download();
    //   setTimeout(() => {
    //     setDownloadStatus(100);
    // }, 1000);
      
    }
  }, [trackData]); 
  return (
    <>
      <ThemeProvider theme={theme}>
        <Text />
        {downloadStatus !== 100 && <GetTrackMeta trackSelected={updateTrack} buttonPressed = {updateSubmit} inDownload={downloadStatus !== 0}/>}
        {trackData && downloadStatus===100 &&
          <>
            <Modules trackFromDownload={track}/>
            <NextDownload toggle={updateTrack} />
          </>
          }
        {
          error && trackData == null &&
          (<p style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: 15 }}>
            Not a valid Spotify link
          </p>) 
        }
        {
          downloadStatus > 0 && downloadStatus < 100 &&
          <DownloadAnimation />
        }
      </ThemeProvider>
    </>
  );
}
root.render(
  <Router>
    <App />
  </Router>
  
);