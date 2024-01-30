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
                <div className={style.dates}>
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
                </div>
                <fieldset className={style.week}>
                    <legend className={style.week__leyend}>Dates</legend>
                    {/* <div className={style.span}>
                            <i class="fas fa-info"></i>
                            <span className={style.note}>
                                Las fechas agregadas no estaran disponibles
                            </span>
                            <span className={style.note_date}>
                                año - mes - dia
                            </span>
                        </div> */}
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

                <fieldset className={style.week} >

                    <legend className={style.week__leyend}>Week</legend>
                    <div>
                        {/* <div className={style.span}>
                            <i class="fas fa-info"></i>
                            <span className={style.note}>
                                Selecciona el rango de fechas para modificar
                            </span>
                        </div> */}
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
                <div className={style.btn_wrap}>
                    <span className={style.span}></span>
                    <div className={style.container_btn}>
                        <button onClick={handleSave}><i className="icons fa-solid fa-floppy-disk"></i></button>
                        <button onClick={showModal}><i className="icons fa-solid fa-plus"></i></button>
                        <button onClick={EditModal}><i className="icons fa-solid fa-pen-to-square"></i></button>
                        <button onClick={handleDelete}><i className="icons fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Form