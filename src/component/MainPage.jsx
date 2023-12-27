import React, { useEffect, useState } from 'react'
import './MainPage.css'
import axios from 'axios';
import IsLoading from './IsLoading/Isloading';

function MainPage() {
    const [image,setImage] = useState([]);
    const [query,setQuery] = useState('nature');
    const [page,setPage] = useState(1);
    const [isloading,setIsLoading] = useState(true);
    
    
    const downloadButton =  (imageurl)=>{
        fetch(imageurl)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement('a');
            const fileNeme = imageurl.split('/').pop();
            link.href = URL.createObjectURL(blob);
            link.download = fileNeme;
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
            console.error('Error fetching the image:', error);
        });
    }
    
    const loadimages = async ()=>{
        window.scrollTo(0,0);
        const api = "https://api.pexels.com/v1/search?query="+`${query}`+"&per_page=12&page="+`${page}`;
        const apiKey = "1ldQPaQOIK5ZVAr9qCVtSyTLNI17oZAKkBsIACMj9fh4z0Y9uf2Dbtuu"
        try {
            let response = await axios.get(api,{
                headers:{
                    Authorization: `${apiKey}`
                }
            })
            setIsLoading(false)
            setImage(response.data.photos)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        loadimages();
    },[page])
    
    if(query.length===0){
        setQuery('nature'); 
        loadimages();
    }

    
    return <>
    <div className="container mt-4">
        <div>
            <h1 className='text-center mb-4 text-white'>Image Gallery</h1>
        </div>
        <div class="form-group">
            <input onChange={(event)=>{
                setQuery(event.target.value)
            }} type="text" class="form-control" id="searchInput" placeholder="Search Images" />          
        </div>
        <button onClick={()=>{
            setIsLoading(true)
            loadimages()
        }} class="btn nav-btn">Submit</button>

        <div className="row">
            <div className='col-md-12'>
                <h1 className='text-center'><span className='heading'>Image</span></h1>
            </div>
            <div className='col-md-6 mt-5'>
                <h4 className='text-center info-heading'>Page Number : <span className='text-white'>{page}</span></h4>
            </div>
            <div className='col-md-6 mt-5'>
                <h4 className='text-center info-heading'>Total images : <span className='text-white'>{image.length}</span></h4>
            </div>
        </div>

        <div className='row imageContainer d-flex mt-3'>
            { isloading ? <IsLoading/>
                : image.length === 0 ? 
                <h1 className="w-100 text-center text-white mt-3">
                    No image related to <span className="text-dark">{query}</span>
                </h1> 
                :
                image?.map((photo)=>
                    <div className='col-md-4 img-box'>
                        <div className="img">
                            <div className="imageDiv">
                                <img src={photo.src.original} alt={photo.alt} />
                            </div>
                            <div className="btnDiv p-1">
                                <button onClick={()=>{downloadButton(photo.src.original)}} className='btn downloadBtn w-100'>Download</button>
                            </div>
                        </div>
                    </div>
                )
            }
            { !isloading && image.length!==0 ? <div className='d-flex w-100 justify-content-around align-items-center mt-2 mb-4'>
                <button onClick={()=>setPage(page-1)} className='btn nav-btn'>Prev</button>
                <button onClick={()=>setPage(page+1)} className='btn nav-btn'>Next</button>
            </div> : <p></p>}
            
        </div>
    </div>
  </>
}

export default MainPage