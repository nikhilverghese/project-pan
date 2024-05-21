import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GetTrackMeta from './components/GetTrackMeta';
import reportWebVitals from './reportWebVitals';
import Text from './components/Text';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modules from './components/Modules';
import NextDownload from './components/NextDownload';
const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  typography: {
    fontFamily: 'Gotham, sans-serif',
  },
});

export default function App() {
  const[track, setTrack] = useState(null);

  const updateTrack = (track) => {
    setTrack(track)
  }
  return (
    <>
    <ThemeProvider theme={theme}>
      <Text />
      <GetTrackMeta trackSelected = {updateTrack}/>
      {track && (
        <>
         <Modules trackFromDownload = {track}/>
         <NextDownload toggle = {updateTrack}/>
        </>
       
      )}
    </ThemeProvider>
              
    </>
  )
  
}
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();