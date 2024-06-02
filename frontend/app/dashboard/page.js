"use client";

import axios from "axios";
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hooks";
import { createTicket, deleteTicket, setTickets, updateTicketById } from "../lib/features/ticket";
import { storage } from '../firebase';
import React, { useState, useEffect } from "react";
import { ref, uploadBytes,uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


export default function Dashboard () {
  const dispatch = useAppDispatch();
  const { isLoggedIn, token,ticket } = useAppSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      ticket:state.tickets.tickets,
    };
  });



  const [title, setTitle] = useState("")
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [time, setTime] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/`);
  const uploadImage = () => {
    if (imageUpload === null) return;
    console.log(imageUpload);
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUpload((prev) => {
          return [prev, url];
        });
        console.log("images upload");
      });
    });
  };
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/tickets/all`,
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6Im1AZ21haWwuY29tIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE2OTQ3NDEyLCJleHAiOjE3MTcwMzM4MTJ9.lu53XG2SvWWsH3NNJIgCiwKXZn9_bhXNyseXJWO0_eI`
    }
  })
  .then((result) => {
    console.log(result.data.result.rows);
    dispatch(setTickets(result.data.result.rows))
  })
  .catch((err) => {
    console.error(
      err.response ? err.response.data : err.message
    );
  });
  }, []);

  //console.log(ticket);

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
const createTicketFun = ()=>{
  axios.post(`http://localhost:5000/tickets/create`,{
    title,
        photo,
        cover,
        description,
        priority,
        end_at
  },
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6Im1AZ21haWwuY29tIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE2OTQ3NDEyLCJleHAiOjE3MTcwMzM4MTJ9.lu53XG2SvWWsH3NNJIgCiwKXZn9_bhXNyseXJWO0_eI`
    }
  })
  .then((result) => {
    console.log(result);
    dispatch(createTicket(result.data.result.rows))
  })
  .catch((err) => {
    console.error(
      err.response ? err.response.data : err.message
    );
  });
};

const updateTicketFun = (id)=>{
  axios.put(`http://localhost:5000/tickets/update/${id}`,{
    title,
    photo,
    cover,
    description,
    priority,
    end_at
  },
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6Im1AZ21haWwuY29tIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE2OTQ3NDEyLCJleHAiOjE3MTcwMzM4MTJ9.lu53XG2SvWWsH3NNJIgCiwKXZn9_bhXNyseXJWO0_eI`
    }
  })
  .then((result) => {
    //console.log(result);
    dispatch(updateTicketById(result.data.result.rows))
  })
  .catch((err) => {
    console.error(
      err.response ? err.response.data : err.message
    );
  });
}

const deleteTicketFun = (id)=>{
  axios.delete(`http://localhost:5000/tickets/delete/${id}`,
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJ1c2VybmFtZSI6Im1AZ21haWwuY29tIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE2OTQ3NDEyLCJleHAiOjE3MTcwMzM4MTJ9.lu53XG2SvWWsH3NNJIgCiwKXZn9_bhXNyseXJWO0_eI`
    }
  }).then((result) => {
    //console.log(result);
    dispatch(deleteTicket(id))
  })
  .catch((err) => {
    console.error(
      err.response ? err.response.data : err.message
    );
  });
}
  return (
    <>
    <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-8 mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-gray-100">Your Tickets Here</h2>
                <p class="mt-4 text-gray-500 dark:text-gray-400">Should you track it</p>
            </div>

            <div class="overflow-hidden p-0.5 mt-6 border rounded-lg dark:border-gray-700">
                
<button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Create Ticket

      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              
              
<div>
    <div className="grid gap-6 mb-6 md:grid-cols-2"> 
  
    </div>
    <div className="mb-6">
        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" 
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}  />
    </div> 
    
    <div className="mb-6">
        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description </label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" 
                    onChange={(e) => {
                      setBody(e.target.value);
                    }} F />
    </div> 

    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload photo</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={()=>(
  uploadImage())}>Upload</button>
      {/* <div>Progress: {progress}%</div> */}
     {/*  {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />} */}
   
    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload cover</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={()=>{uploadImage()
setTimeout(() => {
  console.log(imageUrl)
}, 5000);
  }}>Upload</button>
      {/* <div>Progress: {progress}%</div> */}
   {/*    {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />} */}
   
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
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  />
        </div>
        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createTicketFun()}>Submit</button>
</div>

                <div className="sm:flex sm:items-center ">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
            </div>
        </div>
{ticket.map((tick)=>{
  return  <div class="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <div class="px-6 py-4 transition-colors duration-300 transform rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
      <p class="text-lg font-medium text-gray-800 dark:text-gray-100">Your Ticket #{tick.id} </p>

      <h4 class="mt-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">$19 <span class="text-base font-normal text-gray-600 dark:text-gray-400">/ Month</span></h4>
      
      <p class="mt-4 text-gray-500 dark:text-gray-300">For most businesses that want to optimaize web queries.</p>

      <div class="mt-8 space-y-8">
          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300">All limited links</span>
          </div>

          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300">Own analytics platform</span>
          </div>

          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300">Chat support</span>
          </div>

          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300">Optimize hashtags</span>
          </div>

          <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300">Unlimited users</span>
          </div>
      </div>

      <button class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={setShow(true)}>
          Update Ticket
      </button>
      <button class="w-full px-4 mt-5 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
          Delete
      </button>
  </div>

</div>
})
       }
    </div>

    {show && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              
              
<div>
    <div className="grid gap-6 mb-6 md:grid-cols-2"> 
  
    </div>
    <div className="mb-6">
        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" 
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}  />
    </div> 
    
    <div className="mb-6">
        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description </label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" 
                    onChange={(e) => {
                      setBody(e.target.value);
                    }} F />
    </div> 

    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload photo</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={()=>(
  uploadImage())}>Upload</button>
      {/* <div>Progress: {progress}%</div> */}
     {/*  {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />} */}
   
    <div className="mb-6">
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload cover</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<button onClick={()=>{uploadImage()
setTimeout(() => {
  console.log(imageUrl)
}, 5000);
  }}>Upload</button>
      {/* <div>Progress: {progress}%</div> */}
   {/*    {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" height="100" />} */}
   
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
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  />
        </div>
        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={updateTicketFun()}>Submit</button>
</div>

                <div className="sm:flex sm:items-center ">
                  <button
                    onClick={() => setShow(false)}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
</section>
  
    </>
  )
}
