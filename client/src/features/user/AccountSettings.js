import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js'
import './User.css'

const md5FromFile = (file) => {
    // https://stackoverflow.com/questions/34495796
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
  
  export const fileChecksum = async(file) => {
    const md5 = await md5FromFile(file)
    const checksum = md5.toString(CryptoJS.enc.Base64)
    return checksum
  }

const AccountSettings = () => {

    const [file, setFile] = useState('')

    const user = useSelector((state) => state.user.entity)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // Sourced from https://elliott-king.github.io/2020/09/s3-heroku-rails/
    const createPresignedUrl = async(file, byte_size, checksum) => {
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
                'message': 'profile image'
              }
            }
          })
        }
        let res = await fetch('/presigned_url', options)
        if (res.status !== 200) return res
        return await res.json()
    }
      
    const updateUser = async(e) => {
        e.preventDefault()
        if(file){
            const checksum = await fileChecksum(file)

            const presignedFileParams = await createPresignedUrl(file, file.size, checksum)

            const s3PutOptions = {
                method: 'PUT',
                headers: presignedFileParams.direct_upload.headers,
                body: file,
            }
            
            let awsRes = await fetch(presignedFileParams.direct_upload.url, s3PutOptions)
            if (awsRes.status !== 200) return awsRes

            let userPatchOptions = {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    png: presignedFileParams.blob_signed_id,
                })
            }
            let res = await fetch(`/api/users/${user.id}`, userPatchOptions)
            if (res.status !== 200){ 
                return res 
            }else{
                window.location.reload(false)
            }
            return await res.json()
        }
    }

    return(
        <div className='account-settings'>
            <div className='account-div-left'>
                <div onClick={() => navigate('/dashboard')}>{'<'} Back to dashboard</div>
            </div>
            <div className='account-div-right'>
                <div><img alt='user' src={user.profile_image_url ? `${user.profile_image_url}` : 'https://i.imgur.com/qbBOch9.png'}></img></div>    
                <form className='upi' onSubmit={updateUser}>
                    <input
                        id='account-choose' 
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