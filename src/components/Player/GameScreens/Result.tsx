import React from 'react'
import { ResultStatus } from '@/state/player/resultSlice'

const Result = (params:{
    result: ResultStatus,
    points?: number
}) => {
  return (
    <>
        {
        (params.result === ResultStatus.timeout)?
        <>
            <div className="p-4 rounded-md font-bold text-3xl text-slate-200">Time Out</div>
            <svg className="h-32 w-32 text-slate-200 my-8 bg-red-400 rounded-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                <circle cx="12" cy="12" r="10" />  
                <line x1="15" y1="9" x2="9" y2="15" />  
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-white bg-black opacity-60 px-4 py-2 flex items-center rounded">No worries. We believe in you!</p>
        </>:
        (params.result === ResultStatus.correct)?
        <>
            <div className="p-4 rounded-md font-bold text-3xl text-slate-200">Correct</div>
            <svg className="h-32 w-32 text-slate-200 my-8 bg-green-400 rounded-full"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-white bg-black opacity-60 px-4 py-2 flex items-center rounded">{(params.points)?`+ ${params.points}`:'Well Done!'}</p>
        </>:
        <>
            <div className="p-4 rounded-md font-bold text-3xl text-slate-200">Incorrect</div>
            <svg className="h-32 w-32 text-slate-200 my-8 bg-red-400 rounded-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                <circle cx="12" cy="12" r="10" />  
                <line x1="15" y1="9" x2="9" y2="15" />  
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-white bg-black opacity-60 px-4 py-2 flex items-center rounded">Tough Luck!</p>
        </>
        }
    </>
  )
}

export default Result