import axios from 'axios';

export default async function downloadFile(url,trackData) {
    const apiUrl = `http://localhost:3001/download-track?trackUrl=${encodeURIComponent(url)}`;
    
    try {
        const response = await axios.get(apiUrl, {
            responseType: 'blob' 
        });
        const blob = new Blob([response.data]);
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        const filePath = `${trackData.artists[0].name} - ${trackData.name}.mp3`
        link.setAttribute('download', filePath); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error occurred while retrieving track:', error);
    }
}