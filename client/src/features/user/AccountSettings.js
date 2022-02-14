import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js'
import './User.css'




const AccountSettings = () => {

    const [file, setFile] = useState('')

    const user = useSelector((state) => state.user.entity)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // Taken from https://elliott-king.github.io/2020/09/s3-heroku-rails/
    const md5FromFile = (file) => {

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            
            reader.onload = (fileEvent) => {
                let binary = CryptoJS.lib.WordArray.create(fileEvent.target.result)
                const md5 = CryptoJS.MD5(binary)
                resolve(md5)
            }
            reader.onerror = () => {
                reject('oops, something went wrong with the file reader.')
            }

            reader.readAsArrayBuffer(file)
        })
    }
    
    const fileChecksum = async(file) => {
        const md5 = await md5FromFile(file)
        const checksum = md5.toString(CryptoJS.enc.Base64)
        return checksum
    }

   {/* const createPresignedUrl = async(file, byte_size, checksum) => {
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: {
                filename: file.name,
                byte_size: byte_size,
                checksum: checksum,
                content_type: 'image/png',
                metadata: {
                    'message': 'image for parsing'
                }
                }
            })
        }

        const presignedUrlEndpoint  = '/presigned_url'

        let res = await fetch(presignedUrlEndpoint, options)
        if (res.status !== 200) return res
        return await res.json()
    }  */}

    {/*const updateImage = async(png) => {  
        // To upload pdf file to S3, we need to do three steps:
        // 1) request a pre-signed PUT request (for S3) from the backend
    
        const checksum = await fileChecksum(png)
        const presignedFileParams = await createPresignedUrl(png, png.size, checksum)
        
        // 2) send file to said PUT request (to S3)
        const s3PatchOptions = {
        method: 'PATCH',
        headers: presignedFileParams.direct_upload.headers,
        body: png,
        }
        let awsRes = await fetch(presignedFileParams.direct_upload.url, s3PatchOptions)
        if (awsRes.status !== 200) return awsRes
    
        // 3) confirm & create user with backend
        let usersPatchOptions = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            png: presignedFileParams.blob_signed_id,
        })
        }

        const userEndpoint  = `/api/users/${user.id}`

        let res = await fetch(userEndpoint, usersPatchOptions)
        if (res.status !== 200) return res 
        return await res.json()
    } */}

    const handleSubmit = (e) => {
        e.preventDefault()
        if(file){
            console.log(fileChecksum(file))
        }
    }

    return(
        <div className='account-settings'>
            <div className='account-div-left'>
                <div onClick={() => navigate('/dashboard')}>{'<'} Back to dashboard</div>
            </div>
            <div className='account-div-right'>
                <div><img alt='user' src={user.profile_image_url}></img></div>    
                <form className='upi' onSubmit={handleSubmit}>
                    <label htmlFor='profile-image'>Update profile image: </label>
                    <input 
                        type='file' 
                        name='profile-image'
                        onChange={(e) => setFile(e.target.files[0])}
                    >
                    </input>
                    <input id='account-submit' type='submit'></input>
                </form>
            </div>
        </div>
    )
}

export default AccountSettings