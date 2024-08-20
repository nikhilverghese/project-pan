import {useState,useEffect} from 'react'

export default function DownloadAnimation() {
    const [text,setText] = useState('Downloading');
    const bubbles = ['','.','..','...'];

    useEffect(() => {
        const animation = (index) => {
            const bubble = bubbles[index % bubbles.length];
            setText(`Downloading${bubble}`);
            setTimeout(() => animation(index + 1), 500);
        };
        animation(0);

        return () => clearTimeout(animation);
    }, []);

    return (
        (<p style={{ display: 'flex', color: 'white', justifyContent: 'center', marginTop: 15 }}>
            {text}
        </p>) 
    )
}