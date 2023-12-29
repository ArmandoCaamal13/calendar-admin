import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Card, Button, Modal, message, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'components/accordion';
import Input from 'components/input';
import { Validate } from 'helpers';
import { GetSeoXMl, SaveSeoXMl } from '../../api/service/file';
import { ISeo } from '../../interface/seo';

const Table = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [site, setSite] = useState('');
  const [key, setKey] = useState(0);
  const [fetch, setFetch] = useState(false);
  const [newData, setNewData] = useState({
    url: '',
    title: '',
    description: '',
    keyword: ''
  });

  const success = () => {
    message.success('This is a success message');
  };

  const handleAddNewElement = () => {
    const newDataCopy = [...data]; 

    const siteData = newDataCopy.find(item => item[ISeo.IDsite] === site); 

    siteData.Page.push({
        [ISeo.Url]: newData.url,
        [ISeo.Title]: newData.title,
        [ISeo.Description]: newData.description,
        [ISeo.Keyword]: newData.keyword
    });

    setData(newDataCopy);

    console.log('New element: ', {
        url: newData.url,
        title: newData.title,
        description: newData.description,
        keyword: newData.keyword
    });
  };

  const handleAccordionChange = (index, newData) => {
    const updatedData = [...data];
    updatedData[index].Page = newData; 
    setData(updatedData)
    console.log(updatedData)
  };

  const handleChange = async () => {
    try {
      await SaveSeoXMl(newData);
      console.log('Resultado del guardado', newData);
      success();
    } catch (error) {
      console.error('Error al guardar los datos', error);
      alert('Ha ocurrido un error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await GetSeoXMl();
        setData(response);
        
        if (response) {
          setSite(response[key][ISeo.IDsite]);
        }
        console.log(response);
      } catch (error) {
        console.error('Error en la petición', error);
      }
    };
    fetchData();
  }, [key, fetch]);

  if (!Array.isArray(data)) {
    return <div>No data available</div>;
  }

  return (
    <React.Fragment>
      <Card
        title='Garrafon'
        className='card--border-shadow'
        bordered={false}
        extra={
          <React.Fragment>
            <Button
              type='primary'
              size='large'
              className='u-margin-r-2'
              onClick={() => {
                setVisible(true);
              }}
              icon={
                <FontAwesomeIcon icon={faPlus} className='u-margin-r-2' />
              }
            >
              Add
            </Button>
            <Button
              type='Link'
              size='large'
              onClick={handleChange}
              icon={<FontAwesomeIcon icon={faSave} className='u-margin-r-2' />}
            >
              Save
            </Button>
          </React.Fragment>
        }
      >
        <Tabs
          defaultActiveKey='1'
          tabBarExtraContent={<div></div>}
          onTabClick={(key, event) => {
            setKey(parseInt(key) + 1);
          }}
        >
          {data?.map((seo, index) => (
            <Tabs.TabPane tab={seo[ISeo.Site]} key={index + 1}>
              <Accordion
                data={seo.Page}
                site={seo[ISeo.IDsite]}
                fetch={fetch}
                setFetch={setFetch}
                onAccordionChange={(newData) =>
                  handleAccordionChange(index, newData)
                }
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
      <Modal
        title='New Meta Tag'
        centered
        visible={visible}
        okText='SAVE'
        onOk={() => {
            console.log(newData)
          if (
            Validate(newData.title) &&
            Validate(newData.url) &&
            Validate(newData.description) &&
            Validate(newData.keyword)
          ) {
            let _data = data;
            _data.forEach((value) => {
              if (value[ISeo.IDsite] === site) {
                value.Page.push({
                  [ISeo.Url]: newData.url,
                  [ISeo.Title]: newData.title,
                  [ISeo.Keyword]: newData.keyword,
                  [ISeo.Description]: newData.description
                });
              }
            });
            setData(_data);
            setNewData({
              url: '',
              title: '',
              description: '',
              keyword: ''
            });
            setVisible(false);
            success();
            setFetch(!fetch);
            handleAddNewElement()
          } else {
            alert('Faltan parámetros');
          }
        }}
        onCancel={() => {
          setVisible(false);
          setNewData({
            url: '',
            title: '',
            description: '',
            keyword: ''
          });
        }}
        width={500}
      >
        <Row gutter={[48, 16]}>
          <Col span={20} offset={2}>
            <Input
              value={newData.url}
              placeholder='Url'
              onChange={(e) => {
                const updatedData = {
                    ...newData,
                    url: e.target.value
                  };
                  console.log(updatedData)
                  setNewData(updatedData)
              }}
            />
          </Col>
          <Col span={20} offset={2}>
            <Input
              value={newData.title}
              placeholder='Meta title'
              onChange={(e) => {
                setNewData({
                  ...newData,
                  title: e.target.value
                });
              }}
            />
          </Col>
          <Col span={20} offset={2}>
            <Input
              value={newData.description}
              placeholder='Meta Description'
              onChange={(e) => {
                setNewData({
                  ...newData,
                  description: e.target.value
                });
              }}
            />
          </Col>
          <Col span={20} offset={2}>
            <Input
              value={newData.keyword}
              placeholder='Meta Keyword'
              onChange={(e) => {
                setNewData({
                  ...newData,
                  keyword: e.target.value
                });
              }}
            />
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default Table
