import React, { useState, useEffect } from 'react'
import Form from './form';
import style from './style.module.scss'
import useSchedules from './hooks/useSchedules'
import Search from 'components/search';
import Calendar from 'components/calendar'
import 'components/calendar/style.scss'
import useGetSite from 'components/search/hooks/useGetSites';
import * as http from '../../api/service/httpService'
import Swal from 'sweetalert2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore } from '@mui/icons-material';

const Layout = () => {
    const [schedules, setSchedules, addSchedule] = useSchedules([]);
    const [activeKey, setActiveKey] = useState('1')
    const [calendar, setCalendar] = useState()
    const [panes, setPanes] = useState([{ title: 'Default' }])
    const [dataFromComponentA, setDataFromComponentA] = useState(null);
    const [tourData, setTourData] = useState([]);
    const [weekValues, setWeekValues] = useState([]);
    const [selectedWeek, setSelectedWeeks] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedUpdated, setSelectedUpdated] = useState([]);
    const [selectedNextDates, setSelectedNextDates] = useState([]);
    const [nextDates, setNextDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSiteAndDomain, setSelectedSiteAndDomain] = useState(null);

    useEffect(() => {
        const fetchData = async (site, domain) => {
            try {
                const response = await http.fetchCalendar(site, domain);
                if (response.Dates) {
                    setTourData(response.Dates);
                    console.log(response.Dates)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "No hay datos que mostrar",
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

    const handleWeekValuesSelect = (weekValues) => {
        setWeekValues(weekValues);
        setSelectedWeeks(weekValues)
    };

    const handleWeekCheckboxChange = (index, updatedWeek) => {
        setSelectedWeeks((prevSelectedWeeks) => {
            const updatedSelectedWeeks = [...prevSelectedWeeks];
            updatedSelectedWeeks[index] = updatedWeek;
            return updatedSelectedWeeks;
        });
        if (index, updatedWeek) {
            calendar.RESET_CALENDAR(
                tourData[index]?.Tour === '' ? null : null,
                tourData[index]?.Location || '',
                updatedWeek
            );
        } else {
            console.log("Selecciona un tour")
        }
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

    const handleModalClose = () => {
        // Cierra el Modal cuando sea necesario
        if (calendar) console.log();
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

    return (
        <>
            <Search
                options={useGetSite()}
                onDataSelect={setDataFromComponentA}
                onWeekValuesSelect={handleWeekValuesSelect}
                response={(data) => {
                    console.log(data)
                }}
            />
            <div className={style.container_layout}>
                {panes.map((values, index) => (
                    <div key={index}>
                        {index !== 0 && (
                            <span
                                style={{ marginRight: 8 }}
                                onClick={() => remove(`${index + 1}`)}
                            >
                                Cerrar pestaña
                            </span>
                        )}
                        <div className={style.container_form}>
                            <Form
                                addSchedule={addSchedule}
                                tourData={tourData}
                                dataFromComponentA={dataFromComponentA}
                                schedules={schedules}
                                scheduleskey={index}
                                handleWeekCheckboxChange={(updatedWeek) =>
                                    handleWeekCheckboxChange(index, updatedWeek)
                                }
                                onWeekValuesChange={(selectedWeek) => setWeekValues(selectedWeek)}
                                handleUpdatedDate={handleUpdatedDate}
                                handleSelectedDateUpdate={handleSelectedDateUpdate}
                                handleUpdatedNextDate={handleUpdatedNextDate}
                                handleNextDate={handleNextDate}
                                setTourData={setTourData}
                                handleUpdatedTourData={handleUpdatedTourData}
                                onModalClose={handleModalClose}
                                selectedSiteAndDomain={dataFromComponentA}
                            />
                        </div>
                    </div>
                ))}

                <div className={style.calendar}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2 className='rounded overflow-hidden'>Calendar</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div id="calendario"></div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
export default Layout