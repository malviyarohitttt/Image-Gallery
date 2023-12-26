import React, { useEffect, useState } from 'react'
import './MainPage.css'
import axios from 'axios';
import IsLoading from './IsLoading/Isloading';

function MainPage() {
    const [image,setImage] = useState([]);
    const [query,setQuery] = useState('nature');
    const [page,setPage] = useState(1);
    const [isloading,setIsLoading] = useState(true);
    
    if(query.length==0){setQuery('nature')}

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

  return <>
    <div className="container mt-5">
        <div>
            <h1 className='text-center mb-4 text-white'>Image Gallery</h1>
        </div>
        <div class="form-group">
            <input onChange={(event)=>setQuery(event.target.value)} type="text" class="form-control" id="searchInput" placeholder="Search Images" />            </div>
        <button onClick={()=>{
                loadimages()
                setIsLoading(true)
        }} class="btn btn-primary">Submit</button>

        <h1 className='text-center text-white'>Images</h1>
        <div className='row imageContainer d-flex mt-3'>
            { isloading ? <IsLoading/> 
                : image.length === 0 ? 
                <h1 className="w-100 text-center text-white">
                    No image related to <span className="text-dark">{query}</span>
                </h1> 
                :image?.map((photo)=>
                    <div className='col-md-4 img-box'>
                        <div className="img">
                            <div className="imageDiv">
                            <img src={photo.src.original} alt={photo.alt} />
                            </div>
                            <div className="btnDiv p-1">
                                <button onClick={()=>{downloadButton(photo.src.original)}} className='btn btn-success w-100'>Download</button>
                            </div>
                        </div>
                    </div>
                ) 
            }
            <div className='d-flex w-100 justify-content-around align-items-center mt-2'>
                <button onClick={()=>setPage(page-1)} className='btn btn-primary'>Prev</button>
                <button onClick={()=>setPage(page+1)} className='btn btn-primary'>Next</button>
            </div>
        </div>
    </div>
  </>
}

export default MainPage