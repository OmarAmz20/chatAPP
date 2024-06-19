import React from 'react'
import logo from "./image 2.svg"
export default function User(props) {
  return (
    <div className='w-full h-24 border-2xl text-white  bg-blue-400 rounded-xl p-2 flex  gap-2'>
        <img src={logo} className='w-20 h-20'/>
        <div className='flex flex-col  justify-center text-left font-bold'>
            <h3>{props.name}</h3>
            <h4 className="break-words truncate overflow-hidden max-w-full pe-1">{props.email}</h4>

        </div>
    </div>
  )
}
