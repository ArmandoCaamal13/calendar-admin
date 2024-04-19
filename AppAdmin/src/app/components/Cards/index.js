import * as JsonService from "../../api/service/JsonService";
import React, { useEffect, useState } from "react";
import {
    Card, Row, Col, Button, Input,
    Modal, Form, Typography, Divider,
    Collapse, Pagination, Tabs
} from 'antd';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const CardView = () => {
    const [jsonData, setJsonData] = useState(null);
    const [pages, setPages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSiteId, setSelecteSitedId] = useState(null);
    const pageSize = 4;

    const { TabPane } = Tabs
    const { Panel } = Collapse;
    const { TextArea } = Input;

    const openModal = (page) => {
        setSelected(page);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelected(null);
        setModalVisible(false);
    };

    const handleChangePage = (siteId, page) => {
        setSelecteSitedId(siteId);
        setCurrentPage(page);
    }

    // const handleContentChange = (e) => {
    //     setEditingCard(e.target.value);
    // }

    const handleEdit = async () => {
        try {

            if (!selected) return;

            const updatedJsonData = { ...jsonData };
            const updatedSite = updatedJsonData.Root.Site.find(site => site.Id === selectedSiteId);

            if (updatedSite) {
                const updatedPages = updatedSite.Page.map(page => {
                    if (page.Id_page === selected.Id_page) {
                        return { ...selected }
                    }
                    return page;
                })

                updatedSite.Page = updatedPages

                const response = await fetch(`http://netcore.apicalendar.com/cdn/guardarjson`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJsonData),
                });

                // const response = await JsonService.GuardarJson(updatedJsonData)

                if (response.ok) {
                    console.log('success', updatedJsonData);
                    setJsonData(updatedJsonData);
                } else {
                    console.error('Error al enviar los cambios');
                }
                closeModal()
            } else {
                console.error('No se encontró el sitio correspondiente en el JSON');
            }
        } catch (error) {
            console.error('Error al editar el json: ', error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await JsonService.GetSeoJson();
            if (jsonData && jsonData.Root && jsonData.Root.Site && jsonData.Root.Site.length > 0) {
                const firstSite = jsonData.Root.Site[0];
                setJsonData(jsonData);
                setPages(firstSite.Page);
                setSelecteSitedId(firstSite.Id);
            };
        }
        fetchData();
    }, []);

    //const startIndex = (currentPage - 1) * pageSize;
    //const endIndex = startIndex + pageSize;
    //const visiblePage = pages.slice(startIndex, endIndex);

    let tabPanes = null
    
    if (jsonData) {
        tabPanes = jsonData.Root.Site.map((site) => (
            <TabPane tab={`Site in ${site.Name}`} key={site.Id}>
                <Row gutter={[16, 16]}>
                    {site.Page.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((page) => (
                        <Col key={page.Id_page} span={12}>
                            <Card
                                style={{ minHeight: '100px' }}
                            >
                                {/* <Divider orientation="right"><button className="button__modal" onClick={() => openModal(page)}>Editar contenido</button></Divider> */}
                                <Divider orientation="right">
                                    <div className="accordion__icon">
                                        <FontAwesomeIcon icon={faEdit} className="accordion__icon__edit" onClick={() => openModal(page)} />
                                    </div>
                                </Divider>
                                <Divider orientation="left" >Garrafon</Divider>
                                <Collapse>
                                    <Panel header={page.Url} key="1">
                                        <div>
                                            <fieldset className="accordion__title">
                                                <legend className="accordion__legend">Title</legend>
                                                <p className="accordion__p">{page.Title}</p>
                                            </fieldset>
                                            <fieldset className="accordion__title">
                                                <legend className="accordion__legend">Description</legend>
                                                <p className="accordion__p">{page.Description}</p>
                                            </fieldset>
                                            <fieldset className="accordion__title">
                                                <legend className="accordion__legend">Keywords</legend>
                                                <p className="accordion__p">{page.Keywords}</p>
                                            </fieldset>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={site.Page.length}
                    onChange={(page) => handleChangePage(site.Id, page)}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                />
            </TabPane>
        ))
    }



    return (
        <div style={{ padding: '24px' }}>
            <Tabs defaultActiveKey={selectedSiteId} onChange={setSelecteSitedId}>
                {tabPanes}
            </Tabs>

            <Modal
                visible={modalVisible}
                onCancel={closeModal}
                centered
                footer={[
                    <Button key="cancel" onClick={closeModal}>
                        Cancelar
                    </Button>,
                    <Button key="save" type="primary" onClick={(e) => {
                        e.preventDefault();
                        handleEdit();
                    }} >
                        Guardar
                    </Button>
                ]}
            >
                <Form>
                    <Typography.Title level={5} className="mb-3 text-center">
                        Editar contenido
                    </Typography.Title>
                    <Row gutter={[48, 16]}>
                        <Col span={20} offset={2}>
                            <label>Url</label>
                            <Input
                                type="text"
                                name="url"
                                id="url"
                                value={selected?.Url || ''}
                                onChange={(e) =>
                                    setSelected((prevPages) => ({
                                        ...prevPages,
                                        Url: e.target.value,
                                    }))
                                }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[48, 16]}>
                        <Col span={20} offset={2}>
                            <label>Title</label>
                            <TextArea
                                type="text"
                                name="title"
                                id="title"
                                value={selected?.Title || ''}
                                onChange={(e) =>
                                    setSelected((prevPages) => ({
                                        ...prevPages,
                                        Title: e.target.value,
                                    }))
                                }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[48, 16]}>
                        <Col span={20} offset={2}>
                            <label>Description</label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                value={selected?.Description || ''}
                                onChange={(e) =>
                                    setSelected((prevPages) => ({
                                        ...prevPages,
                                        Description: e.target.value,
                                    }))
                                }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[48, 16]}>
                        <Col span={20} offset={2}>
                            <label>Keywords</label>
                            <Input
                                type="text"
                                name="keywords"
                                id="keywords"
                                value={selected?.Keywords || ''}
                                onChange={(e) =>
                                    setSelected((prevPages) => ({
                                        ...prevPages,
                                        Keywords: e.target.value,
                                    }))
                                }
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default CardView