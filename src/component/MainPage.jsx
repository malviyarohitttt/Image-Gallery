import React, { useEffect, useState } from 'react'
import './MainPage.css'
import axios from 'axios';

function MainPage() {
    const [image,setImage] = useState([]);
    const [query,setQuery] = useState('nature');
    const [isloading,setIsLoading] = useState(true);
    
    if(query.length==0){setQuery('nature')}

    const loadimages = async ()=>{
            const api = "https://api.pexels.com/v1/search?query="+`${query}`+"&per_page=21"
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
    },[])

  return <>
    <div className="container mt-5">
            <div>
                <h1 className='text-center mb-4'>Image Gallary</h1>
            </div>
            <div class="form-group">
                <input onChange={(event)=>setQuery(event.target.value)} type="text" class="form-control" id="searchInput" placeholder="Search Images" />
            </div>
            <button onClick={()=>{
                loadimages()
                setIsLoading(true)
            }} class="btn btn-primary">Submit</button>

            <h1 className='text-center'>Images</h1>
        <div className='row imageContainer d-flex mt-3'>
            { isloading ? <h2>Loading</h2> : image?.map((photo)=>
                <div className='col-md-4 img-box'>
                    <div className="img">
                    <img className='w-100' src={photo.src.original} alt={photo.alt} />
                    </div>
                </div>
            ) 
            }
        </div>
    </div>
  </>
}

export default MainPage
