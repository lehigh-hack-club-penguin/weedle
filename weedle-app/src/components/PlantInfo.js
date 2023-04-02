import {React, useEffect, useState} from 'react'
import './styles/PlantInfoStyles.css'
export default function PlantInfo(props) {

    const [image, setImage] = useState(convertImage())

    function convertImage() {
        const byteCharacters = atob(props.img.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let im = new Blob([byteArray], { type: props.img.mime });

        let imageUrl = URL.createObjectURL(im);
        return imageUrl
    }
    
    useEffect(() => {
        setImage(convertImage)
    }, [props])
    

    return (
        <div className='description-plant'>
            <div className='plant-info'>
                <div className='plant-name'>{props.name}</div>
                <div className='plant-description'>{props.desc}</div>
            </div>
            <img className='plant-img' src={image}></img>
        </div>
    )
}
