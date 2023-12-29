import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import style from './style.module.scss'

const FilterAccordion = ({ children,step,setStep }) => {
  
    const stepNext = () => {
        const _next = (step.count < step.limit )? step.count + 1 : step.count
        setStep({
            ...step,
            count: _next
        })
    }

    const stepLast = () => {
        const _last = (step.count > 0 )? step.count - 1 : step.count
        setStep({
            ...step,
            count: _last
        })
    }


    console.log(step?.limit)
    return(
        <React.Fragment>
            {children}
            <div className='u-flex'>
                <div className = {style.pager__element}>
                    <FontAwesomeIcon icon = {faAngleDoubleLeft}/>
                </div>
                <div className = {style.pager__element} onClick = {stepLast}>
                    <FontAwesomeIcon icon = {faAngleLeft}/>
                </div>
                {
                    [...Array(step?.limit).keys()].map(( value,index )=>[
                        <div key = {index} className = {style.pager__element}> {value + 1} </div>
                    ])
                }
                <div className = {style.pager__element} onClick = {stepNext}>
                    <FontAwesomeIcon icon = {faAngleRight}/>
                </div>
                <div className = {style.pager__element}>
                    <FontAwesomeIcon icon = {faAngleDoubleRight}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FilterAccordion