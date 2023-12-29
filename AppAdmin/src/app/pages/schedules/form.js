import React, { useCallback, useEffect, useState } from 'react'
//import Input from 'components/input'
import style from './style.module.scss'
import { Checkbox, Divider, Tag, Input, Select, Entry, Tooltip, Button, Row, Col, DatePicker, Card, AutoComplete, Modal } from 'antd';
import { PlusOutlined, DeleteFilled, UserOutlined } from '@ant-design/icons';
import EditableTagGroup from './tag/tagContainer'
import moment from 'moment';
import Swal from 'sweetalert2';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultCheckedList = [];

const Form = ({
    initialDates,
    tourData,
    handleWeekCheckboxChange,
    onWeekValuesChange,
    handleUpdatedDate,
    handleSelectedDateUpdate,
    handleUpdatedNextDate,
    handleNextDate,
    dataFromComponentA,
    handleUpdatedTourData,
    modalVisible,
    onModalClose,
    selectedSiteAndDomain,
}) => {

    const [selectedTour, setSelectedTour] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    const [selectedWeek, setSelectedWeek] = useState({});
    const [selectedDate, setSelectedDates] = useState(initialDates || []);
    const [selectedNextDates, setSelectedNextDates] = useState([]);
    const [showComponents, setShowComponents] = useState(true);
    const [seletctedWeekDate, setSelectedWeekDate] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newTour, setNewTour] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [updatedTour, setUpdatedTour] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const showModal = () => {
        setIsModalOpen(true);
    }

    const EditModal = () => {
        setEditModal(true)
    }

    const handleok = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const editCancel = () => {
        setEditModal(false)
    }

    const handleTourSelect = (value) => {
        //console.log('Tour selected:', value);
        setSelectedTour(value);
        setSelectedLocation([]);
        setSelectedToDate('');
        setSelectedWeek({});
        setSelectedDates([]);
        setSelectedNextDates([]);
    };

    const handleLocationSelect = (value) => {
        const selectedTourData = tourData.find((item) => item.Tour == selectedTour);

        if (selectedTourData) {
            const selectedLocationData = tourData.find((item) => item.Tour === selectedTour && item.Location === value);

            if (selectedLocationData) {
                const updatedWeek = selectedLocationData.Week || {};
                const updatedDates = selectedLocationData.Date || [];
                const dates = selectedLocationData.NextDates || [];
                setSelectedLocation(value)
                setSelectedToDate(selectedLocationData.ToDate || '');
                setSelectedWeek(updatedWeek);
                setSelectedDates(updatedDates);
                setSelectedNextDates(dates);
                handleWeekCheckboxChange(updatedWeek);
                handleUpdatedDate(updatedDates)
                //handleNextDate(dates)

                //console.log('Date values:', updatedDates);
                //console.log('ToDate values:', selectedLocationData.ToDate || '')
                //console.log('Week values:', updatedWeek);
                //console.log('NextDates values:', dates.startDate);
                //console.log('NextDates values:', dates.endDate);
                //console.log('NextDates values:', dates.week);
            } else {
                console.error(`No se encontró información para la ubicación ${value}`);
            }
        } else {
            console.error(`No se encontró información para el Tour ${selectedTour}`);
            // Puedes realizar alguna acción adicional si no se encuentra información
        }

        //const selectedLocationData = tourData.map((item) => item.Location === value);        
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedWeek((prevWeek) => {
            const updatedWeek = { ...prevWeek };
            //console.log('Enviando cambios de checkbox a Layout: ', updatedWeek);
            handleWeekCheckboxChange(updatedWeek);
            return updatedWeek;
        });

        setSelectedNextDates((prevNextDates) => {
            const [currentNextDate] = prevNextDates.length > 0 ? prevNextDates : [{}];

            const updatedNextDates = {
                startDate: currentNextDate.startDate || '',
                endDate: currentNextDate.endDate || '',
                week: {
                    ...currentNextDate.week,
                },
            };

            plainOptions.forEach((day) => {
                updatedNextDates.week[day] = checkedValues.includes(day);
            });

            //console.log('Nuevos valores de NextDates:', updatedNextDates);
            handleUpdatedNextDate(updatedNextDates);
            return [updatedNextDates];
        });

    };
    const renderTourOptions = () => {
        if (Array.isArray(tourData)) {
            // Extraer los valores de Tour de tourData y eliminar duplicados
            const tourOptions = Array.from(new Set(tourData.map((item) => item.Tour)));

            return tourOptions.map((tour) => ({ value: tour }));
        } else {
            return [];
        }
    };

    const renderLocationOptions = () => {
        if (Array.isArray(tourData)) {
            // Filtrar las ubicaciones según el Tour seleccionado
            const filteredLocations = tourData
                .filter((item) => item.Tour === selectedTour)
                .flatMap((item) => item.Location);
            // Eliminar duplicados y formatear para el AutoComplete
            const locationOptions = Array.from(new Set(filteredLocations)).map((location) => ({ value: location }));

            return locationOptions;
        } else {
            return [];
        }
    };

    const handleDeleteSelected = (newDates) => {
        setSelectedNextDates(newDates);
        setSelectedWeekDate({});
    };

    // const handleSelectedDatesChange = newDates => {
    //     setSelectedDates(prevSelectedDates => {
    //         const uniqueNewDates = newDates.filter(date => !prevSelectedDates.includes(date));
    //         const updatedSelectedDates = [...prevSelectedDates, ...uniqueNewDates];
    //         console.log(updatedSelectedDates)
    //         handleSelectedDateUpdate(updatedSelectedDates);
    //         return updatedSelectedDates;
    //     });
    // };

    const handleSelectedDatesChange = useCallback(updatedDates => {
        setSelectedDates(updatedDates);
        handleSelectedDateUpdate(updatedDates);
    }, [handleSelectedDateUpdate]);

    const handleDateRange = (newDates) => {
        if (newDates.length > 0) {
            const { startDate, endDate } = newDates[0];
            const formattedStartDate = moment(startDate).format("YYYY/MM/DD");
            const formattedEndDate = moment(endDate).format("YYYY/MM/DD");

            const updatedNextDate = {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                //week: { ...seletctedWeekDate },
            };

            setSelectedNextDates((prevNextDates) => [...prevNextDates, updatedNextDate]);
            //console.log('Start Date:', formattedStartDate);
            //console.log('End Date:', formattedEndDate);
            //console.log('End Date:', seletctedWeekDate);

        } else {
            console.log('No dates selected');
        }
    };

    useEffect(() => {
        onWeekValuesChange(selectedWeek);
    }, [selectedWeek]);

    const handleSave = () => {
        if (selectedTour && selectedLocation) {
            const tourIndex = tourData.findIndex(
                (tour) => tour.Tour === selectedTour && tour.Location === selectedLocation
            );

            if (tourIndex !== -1) {
                tourData[tourIndex].ToDate = selectedToDate;
                tourData[tourIndex].Week = selectedWeek;
                tourData[tourIndex].Date = selectedDate;
                tourData[tourIndex].NextDates = selectedNextDates;

                // Obtén las ubicaciones únicas de tourData
                const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));

                const updatedSchedules = {
                    ByTour: uniqueLocations,
                    Dates: tourData,
                };

                const site = dataFromComponentA.site;
                const domain = dataFromComponentA.domain;

                fetch(`http://mvc.ebcal.dtraveller.com/cdn/calendar?site=${site}&domain=${domain}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSchedules),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Guardado exitosamente',
                                text: 'Los cambios se han guardado correctamente.',
                            });
                            setSelectedTour('');
                            setSelectedLocation('');
                            setSelectedToDate('');
                            setSelectedWeek({});
                            setSelectedDates([]);
                            setSelectedNextDates([]);
                            setSelectedWeekDate({});
                            //console.log("JSON guardado exitosamente:", data);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al guardar',
                                text: 'Ocurrió un error al guardar los cambios.',
                            });
                            console.error("Error al guardar el JSON:", data);
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al guardar',
                            text: 'Ocurrió un error al guardar los cambios.',
                        });
                        console.error("Error al guardar el JSON:", error);
                    });
            } else {
                console.error(`No se encontró la entrada con el Tour ${selectedTour} y la ubicación ${selectedLocation}`);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Aun no se ha seleccionado datos para guardar',
                text: 'Datos no reconocidos para guardar'
            })
        }
    };

    const handleAddNew = () => {
        if (selectedSiteAndDomain) {
            const newTourLocation = {
                Tour: newTour,
                Location: newLocation,
                Date: [],
                ToDate: '',
                Week: {
                    "Sunday": false,
                    "Monday": false,
                    "Tuesday": false,
                    "Wednesday": false,
                    "Thursday": false,
                    "Friday": false,
                    "Saturday": false
                },
                NextDates: [
                    {
                        startDate: '',
                        endDate: '',
                        week: {
                            "Sunday": false,
                            "Monday": false,
                            "Tuesday": false,
                            "Wednesday": false,
                            "Thursday": false,
                            "Friday": false,
                            "Saturday": false
                        }
                    }
                ]
            };
            if (newTourLocation.Tour && newTourLocation.Location) {
                const updatedTourData = [...tourData, newTourLocation];
                const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));
                const updatedSchedules = {
                    ByTour: uniqueLocations,
                    Dates: updatedTourData
                }
                // Utiliza la información de site y domain según sea necesario
                //console.log(`Site: ${site}, Domain: ${domain}`);

                fetch(`http://mvc.ebcal.dtraveller.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedSchedules)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data) {
                            Swal.fire({
                                icon: 'success',
                                title: `Se ha agregado nuevos valores correctamente!`,
                                text: 'Los cambios se han guardado correctamente'
                            });
                            setNewTour('');
                            setNewLocation('');
                            setIsModalOpen(false);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo salió mal!'
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error interno del servidor',
                            text: 'Por favor intentalo más tarde'
                        });
                        console.error("Error al guardar", error);
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Agrege una clave para Tour y una clave para Locacion',
                    text: "Ingrese los nuevos valores"
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione un sitio',
                text: "Debe seleccionar el sitio"
            })
        }
    }

    const handleEdit = () => {
        if (updatedTour && updatedLocation) {
            const valueTour = selectedTour;
            const valueLocation = selectedLocation;
            const index = tourData.findIndex(item => item.Tour == valueTour && item.Location == selectedLocation);
            console.log(index)
            if (index !== -1) {
                // Modificar el valor de Tour en el objeto encontrado
                tourData[index].Tour = updatedTour;
                tourData[index].Location = updatedLocation;

                const updatedTourData = [...tourData];
                const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));
                const updatedSchedules = {
                    ByTour: uniqueLocations,
                    Dates: updatedTourData
                }
                //console.log(updatedSchedules)
                fetch(`http://mvc.ebcal.dtraveller.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedSchedules)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data) {
                            Swal.fire({
                                icon: 'success',
                                title: `Se han modificado los valores correctamente!`,
                                text: 'Los cambios se han guardado correctamente'
                            });
                            setSelectedLocation('');
                            setSelectedToDate('');
                            setSelectedWeek({});
                            setSelectedDates([]);
                            setSelectedNextDates([]);
                            setSelectedWeekDate({});
                            setEditModal(false);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo salió mal!'
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error interno del servidor',
                            text: 'Por favor intentalo más tarde'
                        });
                        //console.error("Error al guardar", error);
                    })
            }
        } else {
            //console.log("No se han agregado los valores que se reemplazaran");
            Swal.fire({
                icon: 'error',
                title: 'No se han agregado los nuevos valores',
                text: "Debe seleccionar el sitio"
            })
        }
    }

    const handleDelete = () => {
        const index = tourData.findIndex(item => item.Tour == selectedTour);
        if (index !== -1) {
            Swal.fire({
                title: '¿Está seguro de eliminar este registro?',
                text: "Una vez borrado, no podrá recuperarse",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Eliminando',
                        text: 'El registro ha sido eliminado correctamente!',
                        icon: 'success',
                    });
                    console.log(index);
                    tourData.splice(index, 1);
                    const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));
                    const updatedSchedules = {
                        ByTour: uniqueLocations,
                        Dates: tourData
                    }
                    fetch(`http://mvc.ebcal.dtraveller.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedSchedules)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data && data) {

                                setSelectedTour('');
                                setSelectedLocation('');
                                setSelectedToDate('');
                                setSelectedWeek({});
                                setSelectedDates([]);
                                setSelectedNextDates([]);
                                setSelectedWeekDate({});

                                console.log(updatedSchedules)
                                console.log(tourData)
                            }
                        })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error interno del servidor',
                        text: 'Por favor intentalo más tarde'
                    });
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione los datos que se van a eliminar',
                text: "Debe seleccionar el sitio"
            })
        }
    }

    return (
        <React.Fragment>
            <Modal
                title="Agregar Nuevo Tour y Locación"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleAddNew}
            >
                <div className={style.modal__content}>

                    <Input size="middle" value={selectedSiteAndDomain?.site} disabled />
                    <Input size="middle" value={selectedSiteAndDomain?.domain} disabled />
                    {/* <AutoComplete
                        size="large"
                        value={newTour}
                        onChange={(value) => setNewTour(value)}
                    > */}

                    <AutoComplete
                        value={newTour}
                        onChange={(value) => setNewTour(value)}
                        style={{ width: '100%' }}
                    >
                        <Input size="middle" placeholder="Nueva clave Tour" />
                    </AutoComplete>
                    <AutoComplete
                        value={newLocation}
                        onChange={(value) => setNewLocation(value)}
                        style={{ width: '100%' }}
                    >
                        <Input size="middle" placeholder="Nueva clave locacion" />
                    </AutoComplete>
                </div>
            </Modal>
            <Modal
                title="Editar Tour y Locación"
                open={editModal}
                onCancel={editCancel}
                onOk={handleEdit}
            >
                <div className={style.modal__content}>
                    <h3></h3>
                    <Input size="middle" value={selectedSiteAndDomain?.site} disabled />
                    <Input size="middle" value={selectedSiteAndDomain?.domain} disabled />
                    <AutoComplete
                        value={updatedTour}
                        onChange={(value) => setUpdatedTour(value)}
                        style={{ width: '100%' }}
                    >
                        <Input size="middle" placeholder={selectedTour} />
                    </AutoComplete>
                    <br />
                    <AutoComplete
                        value={updatedLocation}
                        onChange={(value) => setUpdatedLocation(value)}
                        style={{ width: '100%' }}
                    >
                        <Input size="middle" placeholder={selectedLocation} />
                    </AutoComplete>
                </div>
            </Modal>

            <div className={style.form}>
                <Row justify="space-between">
                    <Col span={7}>
                        <AutoComplete
                            value={selectedTour}
                            options={renderTourOptions()}
                            onSelect={handleTourSelect}
                        >
                            <Input size="large" placeholder="Tour" />
                        </AutoComplete>
                    </Col>
                    <Col span={7} offset={1}>
                        <AutoComplete
                            value={selectedLocation}
                            options={renderLocationOptions()}
                            onSelect={handleLocationSelect}

                        >
                            <Input size="large" placeholder="Location" />
                        </AutoComplete>
                    </Col>
                    <Col span={7} offset={1}>
                        <Input
                            size="large"
                            type="number"
                            placeholder="To Date"
                            value={selectedToDate}
                            onChange={(e) => {
                                const regex = /^[0-9]+$/
                                const _ToDate = e.target.value
                                if (_ToDate.match(regex) || typeof parseInt(_ToDate) === 'number') {
                                    setSelectedToDate(_ToDate);
                                }
                            }}
                        />
                    </Col>
                    <br />
                    <fieldset className={style.week}>
                        <legend className={style.week__leyend}>Dates</legend>
                        <div className={style.span}>
                            <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                color='red'
                            >
                                <path d="M8 0a1 1 0 011 1v5.268l4.562-2.634a1 1 0 111 1.732L10 8l4.562 2.634a1 1 0 11-1 1.732L9 9.732V15a1 1 0 11-2 0V9.732l-4.562 2.634a1 1 0 11-1-1.732L6 8 1.438 5.366a1 1 0 011-1.732L7 6.268V1a1 1 0 011-1z" />
                            </svg>
                            <span className={style.note}>
                                Las fechas agregadas no estaran disponibles
                            </span>
                            <span className={style.note_date}>
                                AÑO - MES - DIA
                            </span>
                        </div>

                        <div>
                            <EditableTagGroup
                                initialDates={selectedDate}
                                changesDate={handleSelectedDatesChange}
                            />
                            <Divider />
                            <CheckboxGroup
                                options={plainOptions}
                                value={Object.keys(selectedWeek).filter((day) => selectedWeek[day])}
                                onChange={(checkedValues) => {
                                    setSelectedWeek((prevWeek) => {
                                        const updatedWeekCopy = { ...prevWeek };

                                        plainOptions.forEach((day) => {
                                            updatedWeekCopy[day] = checkedValues.includes(day);
                                        });

                                        return updatedWeekCopy;

                                    });

                                    handleCheckboxChange(checkedValues);
                                }}
                            />
                        </div>
                    </fieldset>
                </Row>
                <fieldset className={style.week} >

                    <legend className={style.week__leyend}>Week</legend>
                    <div>
                        <div className={style.span}>
                            <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                            >
                                <path d="M8 0a1 1 0 011 1v5.268l4.562-2.634a1 1 0 111 1.732L10 8l4.562 2.634a1 1 0 11-1 1.732L9 9.732V15a1 1 0 11-2 0V9.732l-4.562 2.634a1 1 0 11-1-1.732L6 8 1.438 5.366a1 1 0 011-1.732L7 6.268V1a1 1 0 011-1z" />
                            </svg>
                            <span className={style.note}>
                                Selecciona el rango de fechas para modificar
                            </span>
                        </div>

                        <DatePicker.RangePicker
                            onChange={(dates, ranger) => {
                                const newDates = selectedNextDates.length > 0 ? [...selectedNextDates] : [{}];
                                if (newDates.length === 0) {
                                    newDates.push({
                                        startDate: ranger[0].format("YYYY-MM-DD"),
                                        endDate: ranger[1].format("YYYY-MM-DD"),
                                    });
                                } else {
                                    newDates[0].startDate = ranger[0];
                                    newDates[0].endDate = ranger[1];
                                }
                                setSelectedNextDates(newDates);
                                handleDateRange(newDates);
                            }}
                            format="YYYY-MM-DD"
                        />
                        <Divider />
                        <CheckboxGroup
                            options={plainOptions}
                            //value={Object.keys(selectedWeek).filter((day) => selectedWeek[day])}
                            onChange={(checkedValues) => {
                                setSelectedWeekDate((prevWeek) => {
                                    const updatedWeekCopy = { ...prevWeek };

                                    plainOptions.forEach((day) => {
                                        updatedWeekCopy[day] = checkedValues.includes(day);
                                    });

                                    return updatedWeekCopy;
                                });
                                handleCheckboxChange(checkedValues);
                            }}
                        />
                    </div>
                </fieldset>
            </div>
            <div className={style.button__form}>
                <button className={style.button__save} onClick={handleSave}>
                    <span className={style.button__text}>Save Dates</span>
                    <span className={style.button__icon}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                            color="white"
                            className={style.svg}
                        >
                            <path d="M5 21h14a2 2 0 002-2V8a1 1 0 00-.29-.71l-4-4A1 1 0 0016 3H5a2 2 0 00-2 2v14a2 2 0 002 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5H5z" />
                        </svg>
                    </span>
                </button>

                <button className={style.button__create} onClick={showModal}>
                    <span className={style.button__text}>Add Dates</span>
                    <span className={style.button__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className={style.svg}><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5" onChange={handleok}></line></svg>
                    </span>
                </button>
                <button className={style.button__edit} onClick={EditModal}>
                    <span className={style.button__text}>Edit Dates</span>
                    <span className={style.button__icon}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                            color="white"
                            className={style.svg}
                        >
                            <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                        </svg>
                    </span>
                </button>
                <button className={style.button__delete} onClick={handleDelete}>
                    <span className={style.button__text}>Delete Dates</span>
                    <span className={style.button__icon}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                            color="white"
                            className={style.svg}
                        >
                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                        </svg>
                    </span>
                </button>
            </div>
        </React.Fragment>
    )
}

export default Form