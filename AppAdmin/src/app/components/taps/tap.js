import React, { useContext, useEffect, useState } from 'react'
import TapsContext from './contex'
import style from './style.module.scss'

const tap = ({ title = 'tap' }) => {
    const {step,setStep} = useContext(TapsContext)
    const [tap,setTap] = useState('')

    useEffect(() => {
        setTap(`tap_${step.count + 1}`)
        let _titles = step.title
        _titles.push({
            key: tap,
            name: title
        })

        setStep({
            ...step,
            title: _titles,
            count: step.count + 1
        })

    },[title])

    console.log(step.tap)
    return(
        <React.Fragment>
           
            <div className = {`${style.content} ${step.tap === tap? style.block : style.none}`}>
                    content
            </div>
        </React.Fragment>
    )
}

export default tap