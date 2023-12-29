import React,{ useState } from 'react'
import style from './style.module.scss'
import TapsContext from './contex'

export const Taps = ({ children, defaultTap = 'tap_1' }) => {
    
    const [step,setStep] = useState({
        tap: defaultTap,
        title: [],
        count: 1,
    })
    const selectTap = (tap) => {
        setStep({
            ...step,
            tap: tap
        })
    }
   
    return (
        <TapsContext.Provider value = {{ step,setStep}}>
             <div className = {style.taps}>
                <div>
                    {
                        step?.title.map(( value ,index)=>[
                            <button  key = {index}>
                                {value.name}
                            </button>
                        ])
                    }
                </div>
                {children}
            </div>
        </TapsContext.Provider>
    )
}
