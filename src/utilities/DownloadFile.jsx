// const apiUrl = `http://localhost:3001/download-track?trackUrl=${encodeURIComponent(url)}`;
        // try {
        //     axios.get(apiUrl, { 
        //         responseType: 'blob' 
        //     })
        //     .then((obj) => {console.log(obj.data)})
        //     .catch(err => console.log(err))
        //     // const response = await axios.get(apiUrl, { responseType: 'blob' });
        //     // const blob = new Blob([response.data]);
        //     // const { data: { filename } } = response;
        //     // const link = document.createElement('a');
        //     // link.href = window.URL.createObjectURL(blob);
        //     // link.download = `${filename}.mp3`;
        //     // link.click();
        //     // console.log('Track downloaded successfully');
        // } catch (error) {
        //     console.error('Error occurred while retriving track:', error);
        // }