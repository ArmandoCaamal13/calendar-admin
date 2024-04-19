import React, { useCallback, useEffect, useState, Fragment } from 'react'
import style from './style.module.scss'
import { Checkbox, Divider, DatePicker } from 'antd';
import EditableTagGroup from './tag/tagContainer'
import moment from 'moment';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Form = ({
    initialDates,
    tourData,
    handleWeekCheckboxChange,
    onWeekValuesChange,
    handleUpdatedDate,
    handleSelectedDateUpdate,
    handleUpdatedNextDate,
    dataFromComponentA,
    selectedSiteAndDomain,
}) => {

    const [selectedTour, setSelectedTour] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    const [selectedWeek, setSelectedWeek] = useState({});
    const [selectedDate, setSelectedDates] = useState(initialDates || []);
    const [selectedNextDates, setSelectedNextDates] = useState([]);
    const [seletctedWeekDate, setSelectedWeekDate] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newTour, setNewTour] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [updatedTour, setUpdatedTour] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

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
            } else {
                console.error(`No se encontró información para la ubicación ${value}`);
            }
        } else {
            console.error(`No se encontró información para el Tour ${selectedTour}`);
        }
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedWeek((prevWeek) => {
            const updatedWeek = { ...prevWeek };
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
            handleUpdatedNextDate(updatedNextDates);
            return [updatedNextDates];
        });
    };
    const renderTourOptions = () => {
        if (Array.isArray(tourData)) {
            const tourOptions = Array.from(new Set(tourData.map((item) => item.Tour)));
            return tourOptions.map((tour) => ({ value: tour }));
        } else {
            return [];
        }
    };

    const renderLocationOptions = () => {
        if (Array.isArray(tourData)) {
            const filteredLocations = tourData
                .filter((item) => item.Tour === selectedTour)
                .flatMap((item) => item.Location);
            const locationOptions = Array.from(new Set(filteredLocations)).map((location) => ({ value: location }));
            return locationOptions;
        } else {
            return [];
        }
    };

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
            };
            setSelectedNextDates((prevNextDates) => [...prevNextDates, updatedNextDate]);
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
                const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));
                const updatedSchedules = {
                    ByTour: uniqueLocations,
                    Dates: tourData,
                };
                const site = dataFromComponentA.site;
                const domain = dataFromComponentA.domain;
                fetch(`https://netcore.apicalendar.com/cdn/calendar?site=${site}&domain=${domain}`, {
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
                fetch(`https://netcore.apicalendar.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
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
                tourData[index].Tour = updatedTour;
                tourData[index].Location = updatedLocation;
                const updatedTourData = [...tourData];
                const uniqueLocations = Array.from(new Set(tourData.map((tour) => tour.Location)));
                const updatedSchedules = {
                    ByTour: uniqueLocations,
                    Dates: updatedTourData
                }
                fetch(`https://netcore.apicalendar.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
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
                    })
            }
        } else {
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
                    fetch(`https://netcore.apicalendar.com/cdn/calendar?site=${selectedSiteAndDomain?.site}&domain=${selectedSiteAndDomain?.domain}`, {
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
                show={show}
                onHide={handleClose}
            >
                <div className="isolate bg-white sm:py-8 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Añadir nuevo Tour & nueva Locacion
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                        <div>
                            <label htmlFor="site" className="block text-sm font-semibold leading-6 text-gray-900">
                                Sitio
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="site"
                                    id="site"
                                    value={selectedSiteAndDomain?.site}
                                    disabled
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="domain" className="block text-sm font-semibold leading-6 text-gray-900">
                                Dominio
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="domain"
                                    id="domain"
                                    value={selectedSiteAndDomain?.domain}
                                    disabled
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="newTour" className="block text-sm font-semibold leading-6 text-gray-900">
                                Nuevo Tour
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="newTour"
                                    id="newTour"
                                    value={newTour}
                                    onChange={(value) => setNewTour(value.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="newLocation" className="block text-sm font-semibold leading-6 text-gray-900">
                                Nueva Locacion
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="newLocation"
                                    id="newLocation"
                                    value={newLocation}
                                    onChange={(value) => setNewLocation(value.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={handleClose}
                                className="block w-full rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={handleAddNew}
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
            >
                <div className="isolate bg-white sm:py-8 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Modificar Tour & Locacion
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                        <div>
                            <label htmlFor="site" className="block text-sm font-semibold leading-6 text-gray-900">
                                Sitio
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="site"
                                    id="site"
                                    value={selectedSiteAndDomain?.site}
                                    disabled
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="domain" className="block text-sm font-semibold leading-6 text-gray-900">
                                Dominio
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="domain"
                                    id="domain"
                                    value={selectedSiteAndDomain?.domain}
                                    disabled
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="editTour" className="block text-sm font-semibold leading-6 text-gray-900">
                                Tour
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="editTour"
                                    id="editTour"
                                    value={updatedTour}
                                    placeholder={selectedTour}
                                    onChange={(value) => setUpdatedTour(value.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="editLocation" className="block text-sm font-semibold leading-6 text-gray-900">
                                Locacion
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="editLocation"
                                    id="editLocation"
                                    value={updatedLocation}
                                    placeholder={selectedLocation}
                                    onChange={(value) => setUpdatedLocation(value.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={handleCloseEdit}
                                className="block w-full rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={handleEdit}
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className={style.form}>
                <div className={style.dates}>
                    <div className={style.input_form}>
                        <Listbox value={selectedTour} onChange={handleTourSelect}>
                            {({ open }) => (
                                <>
                                    <div className='relative'>
                                        <Listbox.Button className="relative w-full cursor-default rounded-md border-4 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className='flex items-center'>
                                                <span className='ml-3 block truncate'>Tour: {selectedTour}</span>
                                            </span>
                                            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {renderTourOptions().map((tour) => (
                                                    <Listbox.Option
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={tour.value}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {tour.value}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className={style.input_form}>
                        <Listbox value={selectedLocation} onChange={handleLocationSelect}>
                            {({ open }) => (
                                <>
                                    <div className='relative'>
                                        <Listbox.Button className="relative w-full cursor-default rounded-md border-4 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className='flex items-center'>
                                                <span className='ml-3 block truncate'>Locacion: {selectedLocation}</span>
                                            </span>
                                            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {renderLocationOptions().map((location) => (
                                                    <Listbox.Option
                                                        key={location.value}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={location.value}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {location.value}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className={style.input_form}>
                        <input
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
                            className="block w-full rounded-md border-2 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <fieldset className={style.week}>
                    <legend className={style.week__leyend}>Dates</legend>
                    <div>
                        <EditableTagGroup
                            initialDates={selectedDate}
                            changesDate={handleSelectedDatesChange}
                        />
                        <Divider />
                        <div className={style.checkboxs}>
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
                    </div>
                </fieldset>
                <fieldset className={style.week} >
                    <legend className={style.week__leyend}>Week</legend>
                    <div>
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
            <div className={style.btn_wrap}>
                <button onClick={handleSave}><i className="icons fa-solid fa-floppy-disk"></i></button>
                <button onClick={handleShow}><i className="icons fa-solid fa-plus"></i></button>
                <button onClick={handleShowEdit}><i className="icons fa-solid fa-pen-to-square"></i></button>
                <button onClick={handleDelete}><i className="icons fa-solid fa-trash"></i></button>
            </div>
        </React.Fragment>
    )
}
export default Form