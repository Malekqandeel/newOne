"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hooks";
import { createTicket } from "../lib/features/ticket";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, token } = useAppSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,

    };
  });

  const [title, setTitle] = useState("")
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("");
  
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [time, setTime] = useState('');

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );
  };
const createTicketFun = ()=>{
  axios.post(`http://localhost:5000/tickets/create`,{
        title,
        body,
        photo,
        cover,
        priority,
        user_id :localStorage.getItem("userId")
  },
  {
    headers: {
      authorization: `Bearer ${token || localStorage.getItem("token")}`
    }
  })
  .then((result) => {
    console.log(result);
    dispatch(createTicket(result))
  })
  .catch((err) => {
    console.error(
      err.response ? err.response.data : err.message
    );
  });
}
  return (
    <>
    
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2"> 
  
    </div>
    <div className="mb-6">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" 
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }} required />
    </div> 
    
    <div className="mb-6">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description </label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" 
                    onChange={(e) => {
                      setBody(e.target.value);
                    }} required />
    </div> 

    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload photo</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleChange}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={handleUpload}>Upload</button>
      <div>Progress: {progress}%</div>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />}
   
    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload cover</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onClick={handleUpload}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={handleUpload}>Upload</button>
      <div>Progress: {progress}%</div>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />}
   
    </div> 
<form class="max-w-sm mx-auto">
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">priority</label>
  <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Priority</option>
    <option value="Low">Green</option>
    <option value="Med">Yellow</option>
    <option value="High">Red</option>
  </select>
</form>

<div className="relative">
      <label htmlFor="time-picker" className="block text-sm font-medium text-gray-700">
        Select Time
      </label>
      <input
        type="time"
        id="time-picker"
        value={time}
        onChange={handleChangeTime}
        className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>


    </div> 
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
        </div>
        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createTicketFun()}>Submit</button>
</form>

    </>
  )
}

export default Dashboard