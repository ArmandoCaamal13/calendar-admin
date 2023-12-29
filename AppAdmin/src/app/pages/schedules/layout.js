import React, { useState, useEffect } from 'react'
import { Tabs, Row, Col, Card, Button } from 'antd';
import Form from './form';
import style from './style.module.scss'
import useSchedules from './hooks/useSchedules'
import Search from 'components/search';
import Calendar from 'components/calendar'
import 'components/calendar/style.scss'
import { API_SERVICE } from '../../api/schedules';
import { useSelector } from 'react-redux/es/exports';
import EventEmitter from 'events';
import useGetSite from 'components/search/hooks/useGetSites';
import * as http from '../../api/service/httpService'
import Swal from 'sweetalert2';

const Layout = () => {
    const Login = useSelector(state => state.login_data)
    const [schedules, setSchedules, addSchedule, addListSchedule] = useSchedules([]);
    const [activeKey, setActiveKey] = useState('1')
    const [coutPanes, setCountPanes] = useState(1)
    const [calendar, setCalendar] = useState()
    const [panes, setPanes] = useState([{ title: 'Default' }])
    const handleEdit = (target, action) => eval(`${action}(${typeof target === 'object' ? '' : target})`)
    const [tap, setTap] = useState(0)
    const [dataFromComponentA, setDataFromComponentA] = useState(null);
    const [tourData, setTourData] = useState([]);
    const [weekValues, setWeekValues] = useState([]);
    const [selectedWeek, setSelectedWeeks] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedUpdated, setSelectedUpdated] = useState([]);
    const [selectedNextDates, setSelectedNextDates] = useState([]);
    const [nextDates, setNextDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSiteAndDomain, setSelectedSiteAndDomain] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleWeekValuesChange = (weekValues) => {
        setSelectedWeeks(weekValues);
    }

    useEffect(() => {
        const fetchData = async (site, domain) => {
            try {
                const response = await http.fetchCalendar(site, domain);
                if (response.Dates) {
                    setTourData(response.Dates);
                    console.log(response.Dates)
                }else{
                    
                    Swal.fire({
                        icon: "error",
                        title:"No hay datos que mostrar",
                        text: "No hay datos que mostrar",                        
                    })
                }
                
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (dataFromComponentA) {
            const { site, domain } = dataFromComponentA;
            fetchData(site, domain);
        }
    }, [dataFromComponentA]);

    const handleChanges = (key) => {
        const _key = parseInt(key)
        setTap(_key - 1)
        calendar.RESET_CALENDAR(null, schedules[_key - 1].Location)
        console.log(schedules)
        console.log(schedules[_key - 1].Tour, schedules[_key - 1].Location)
        setActiveKey(key)
    }
    const add = () => {
        addListSchedule()
        const newPanes = [...panes]
        setCountPanes(coutPanes + 1)
        newPanes.push({
            title: `New Tap ${coutPanes}`,
        })
        setPanes(newPanes)
    }

    const remove = (target) => {
        console.log(target)
        let newPanes = [...panes]
        newPanes = newPanes.filter((values, index) => {
            return (index + 1) !== target
        })
        let _schedules = [...schedules]
        _schedules = _schedules.filter((value, index) => index != (target - 1))
        setSchedules(_schedules)
        setPanes(newPanes)
    }
    const [search, setSearch] = useState({
        type: 'GET',
        value: ''
    })

    const handleDayOfWeekChange = (day, value) => {
        setSelectedWeeks((prevValues) => ({
            ...prevValues,
            [day]: value,
        }));
    };

    const handleWeekValuesSelect = (weekValues) => {
        setWeekValues(weekValues);
        setSelectedWeeks(weekValues)
    };

    const handleWeekCheckboxChange = (index, updatedWeek) => {
        setSelectedWeeks((prevSelectedWeeks) => {
            const updatedSelectedWeeks = [...prevSelectedWeeks];
            updatedSelectedWeeks[index] = updatedWeek;

            //console.log(`Recibiendo cambios de checkbox en Layout:`, updatedSelectedWeeks);

            return updatedSelectedWeeks;
        });
        calendar.RESET_CALENDAR(
            tourData[index]?.Tour === '' ? null : tourData[index].Tour || '',
            tourData[index]?.Location || '',
            updatedWeek
        );
    };

    const handleUpdateTourData = (newTourData) => {
        setTourData(newTourData);
        //console.log(newTourData)
    };

    const handleUpdatedDate = (date) => {
        setSelectedDate(date);
        //console.log("Date value: ", date)
    }

    const handleSelectedDateUpdate = (updatedSelectedDate) => {
        setSelectedUpdated(updatedSelectedDate);
        //console.log("Date value updated: ", updatedSelectedDate)
    }

    const handleUpdatedNextDate = (updatedNextDates) => {
        setSelectedNextDates(updatedNextDates);
        //console.log("Next Update: ", updatedNextDates)
    }

    const handleNextDate = (dates) => {
        setNextDates(dates)
        //console.log("Next date: ", dates)
    }

    const handleUpdatedTourData = (updatedSchedules) => {
        setTourData(updatedSchedules)
        console.log(updatedSchedules)
    }

    const handleModalOpen = (selectedOption) => {
        // Abre el Modal cuando se selecciona una opción
        setModalVisible(true);
        setSelectedSiteAndDomain(selectedOption);
    };

    const handleModalClose = () => {
        // Cierra el Modal cuando sea necesario
        setModalVisible(false);
        setSelectedSiteAndDomain(null);
    };

    useEffect(() => {
        const date = new Date()
        if (document.querySelector("#calendario")) {
            const calendar = new Calendar({
                selector: "#calendario",
                formatMonth: 'long',
                formatWeekDay: 'short',
                lang: "es",
                initialDate: '',
                defaultLocation: tourData.Location,
                closeDate: schedules,
                onSelect: (date) => {
                    // setSelectedDates(date);
                    // const selectedDays = getSelectedDaysOfWeek(date);
                    // setSelectedDaysOfWeek(selectedDays);
                },
                selectedWeek: selectedWeek,
                selectedDate: selectedDate,
                selectedUpdated: selectedUpdated,
                selectedNextDates: selectedNextDates,
            });
            setCalendar(calendar)
            const _key = parseInt(activeKey)
            if (schedules[_key - 1]) {
                calendar.RESET_CALENDAR(
                    tourData?.Tour === '' ? null : tourData.Tour || '',
                    tourData?.Location || '',
                    selectedWeek
                );
            }

        }
    }, [schedules, activeKey, selectedWeek, selectedUpdated, selectedDate, tourData, selectedNextDates]);

    const handleDataSelect = (selectedOption) => {
        setSelectedOption(selectedOption)
        setDataFromComponentA()
    }
    return (
        <Row>
            <Col span={14}>
                <Card>
                    <Search
                        options={useGetSite()}
                        onDataSelect={setDataFromComponentA}
                        onWeekValuesSelect={handleWeekValuesSelect}
                        response={(data) => {
                            console.log(data)
                        }}
                        //handleModalOpen={handleModalOpen}
                    />
                    <Tabs
                        type="editable-card"
                        activeKey={activeKey}
                        onChange={handleChanges}
                        onEdit={(target, action) => action === 'remove' && remove(target)}
                    >
                        {
                            panes.map((values, index) => [
                                <Tabs.TabPane
                                    tab={values.title}
                                    key={`${index + 1}`}
                                    closable={index !== 0}
                                >
                                    <Form
                                        addSchedule={addSchedule}
                                        tourData={tourData}
                                        dataFromComponentA={dataFromComponentA}
                                        schedules={schedules}
                                        scheduleKey={index}
                                        handleWeekCheckboxChange={(updatedWeek) => handleWeekCheckboxChange(index, updatedWeek)}
                                        onWeekValuesChange={(selectedWeek) => setWeekValues(selectedWeek)}
                                        handleUpdatedDate={handleUpdatedDate}
                                        handleSelectedDateUpdate={handleSelectedDateUpdate}
                                        handleUpdatedNextDate={handleUpdatedNextDate}
                                        handleNextDate={handleNextDate}
                                        setTourData={setTourData}
                                        handleUpdatedTourData={handleUpdatedTourData}
                                        //modalVisible={modalVisible}
                                        onModalClose={handleModalClose}
                                        selectedSiteAndDomain={dataFromComponentA}
                                    />
                                </Tabs.TabPane>
                            ])
                        }
                    </Tabs>
                </Card>
            </Col>
            <div className={style.calendar}>
                <Card title="Calendar">
                    <div id="calendario"></div>
                </Card>
            </div>
        </Row>


    )
}

export default Layout