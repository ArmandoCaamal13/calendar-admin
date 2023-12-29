
import React, { useEffect,useState } from 'react'
import Details from './details'
import { Paginator } from 'helpers'
import { Pagination } from 'antd';
import { ISeo } from '../../interface/seo';

const Accordion = ({ data, site, fetch,setFetch }) => {
    const [step,setStep] = useState(0)    
    const [page,setPage] = useState(5)
    const [row,setRow] = useState()
    const [seo,setSeo] = useState()

    useEffect(()=>{
        const _filterSeo = Paginator({data: data, step: step, page: page })
        setSeo(_filterSeo)
        setRow(data? data.length : 0)
        
    },[step,page,fetch])

    
    const ChangesPagination = (current,pageSize) => {
        // console.log(current, pageSize)
       setPage(pageSize)
    }
    const pagination = (current,pageSize) => {
        //console.log(current, pageSize)
        setStep(current - 1)
    }

    const handleFielChange = (name, type, newValue) => {
        const updatedSeo = seo.map((item) => {
            if(item[ISeo.Url] === name){
                return{
                    ...item,
                    [type]:newValue
                };
            }
            return item;
        });

    setSeo(updatedSeo)
    }

    return (
        <div>
            <div>
                <Details data = {seo} site = {site} setFetch = {setFetch} fetch = {fetch} onFieldChange={handleFielChange}/>  
                <Pagination
                    className = 'u-margin-t-2'
                    // showSizeChanger
                    onShowSizeChange={ChangesPagination}
                    onChange = {pagination}
                    defaultCurrent={1}
                    total={row}
                    pageSize = {page}
                    // pageSizeOptions = {[page]}
                />
            </div>
        </div>
    )
}

export default Accordion