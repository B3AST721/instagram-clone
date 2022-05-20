import { React, useState } from 'react'
import { Button } from '@mui/material';
import { storage, db } from '../firebase';
import firebase from 'firebase/compat/app';
import '/home/jaheel/instagram/src/UploadImage.css';

function UploadImage({username}) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    //Get the first file selected and change the state to the file selected
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //If there is an error...
                console.log(error.message);
            },
            () => {
                //When the upload is complete
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //add image to the database
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })
                    
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })
            }
        )
    }

  return (
    <div className='image-upload'>
        <progress value={progress} max='100' />
        <input placeholder='Enter a caption....' onChange={(e) => setCaption(e.target.value)} type='text'/>
        <input type='file' onChange={handleChange} />
        <Button className='upload-button' onClick={handleUpload}>
            Upload
        </Button>
    </div>
  )
}

export default UploadImage