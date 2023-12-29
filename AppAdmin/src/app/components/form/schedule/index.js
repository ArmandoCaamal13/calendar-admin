import React, { Fragment, useEffect, useState } from 'react'
import CustomInput from 'components/input'
import CustomSelect from 'components/select'
import CustomAlert from 'components/alert'
// import CalendarEditConditional from './component/calendarEditConditional'
import CalendarEditGeneral from './component/calendarEditGeneral'
import useGetSite from './hooks/useGetSite'
import useGetSchedules from './hooks/useGetSchedules'
import { Col, Row,Select,Button } from 'antd'
import style from './form.module.scss'
import 'components/calendar/style.scss'
import useGetNameTour from './hooks/useGetNameTour'

const FormSchedule = ({ tabKey }) => {
    const [endpoint,setEndpoint] = useState(null)    
    const site_whit_schedule =  useGetSite()
    const getCurrentSchedules = useGetSchedules(endpoint)    
    const nameTour = useGetNameTour(getCurrentSchedules.selectTour?.Tour)
    const isDisabledTour = getCurrentSchedules.tour.length === 0
    const isDisabledLocation = getCurrentSchedules.location.length === 0
    const isActiveNameSelect = getCurrentSchedules.location.length > 0


    return(
        <Fragment>
            <Row gutter = {[20,20]}>
                <Col span = {13}>
                    <CustomSelect
                        options = {site_whit_schedule} 
                        placeholder = "select site" 
                        onChange = {(value)=>{
                            setEndpoint(value)
                        }}
                    />
                </Col>
                <Col span = {4}>
                    <CustomSelect  
                        disabled = {isDisabledLocation}
                        placeholder = "Location" 
                        onChange = {(location)=>{
                            getCurrentSchedules.filterSchedules(location)
                        }}
                    >
                        {
                            getCurrentSchedules.location?
                            getCurrentSchedules.location.map(((item,key) => [                                
                                    <Select.Option key={key} value = {item?.Location}> {item?.Location} </Select.Option>
                                ]))
                            : null
                        }
                    </CustomSelect>                    
                </Col>
                <Col span = {4}>
                    <CustomSelect  
                        disabled = {isDisabledTour}
                        placeholder = "tour" 
                        onChange = {(tour)=>{
                            getCurrentSchedules.filterSchedules(null,tour)
                        }}
                    >
                        {
                            getCurrentSchedules.tour?
                            getCurrentSchedules.tour.map(((item,key) => [                                
                                    <Select.Option key={key} value = {item?.Tour}> {item?.Tour} </Select.Option>
                                ]))
                            : null
                        }
                    </CustomSelect>
                </Col>
                <Col span = {3}>
                    <CustomInput 
                        placeholder = "To Date" 
                        onChange = {(value) => {
                            console.log(value)
                        }}
                    />   
                </Col>
                {
                    isActiveNameSelect? 
                        <Col span = {24}>
                            <div className = {style.cintillo}>
                                {nameTour}
                            </div>
                        </Col>
                    : null
                }               
                <Col span = {24}>
                    <CalendarEditGeneral  className = {tabKey === "1" ? "" : "hide"} data = {getCurrentSchedules.selectTour} />
                    {/* <CalendarEditConditional  className = {tabKey === "2" ? "" : "hide"}  /> */}
                </Col>
                <Col span = {24}>
                    <Button type="primary" onClick = {(e)=>{
                        console.log(getCurrentSchedules.all)
                    }}>
                        Primary
                    </Button>
                </Col>
            </Row>            
            {/* <CustomAlert 
                show = {isSuccessfull} 
                onClose = {()=> {
                    setSuccessfull(false)
                }}
            /> */}
        </Fragment>
    )
}

export default FormSchedule