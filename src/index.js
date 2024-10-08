import {React, useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import GetTrackMeta from './components/GetTrackMeta';
import Text from './components/Text';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modules from './components/Modules';
import NextDownload from './components/NextDownload';
import UseSpotifyData from './utilities/UseSpotifyData'
import downloadFile from './utilities/DownloadFile'
import DownloadAnimation from './utilities/DownloadAnimation'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  typography: {
    fontFamily: 'Gotham, sans-serif',
  },
});


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
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ForgotPassword />} />
      </Routes>
  </Router>
  
);