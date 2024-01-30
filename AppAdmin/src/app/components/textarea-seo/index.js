import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { GetSeoXMl, GetSeoXMlString, SaveSeoXMl } from "api/service/file"
// import { notification } from 'node_modules/antd/es/index';
import { notification } from '../../../../node_modules/antd/es/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faSave } from '@fortawesome/free-solid-svg-icons/index';


const { TextArea } = Input;

const TextAreaSeo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [xmlString, setXML] = useState([]);

  const handleChange = (e) => {
    setXML(e.target.value);
  }

  const handleSaveChange = async () => {
    try {
      // const jsonFromXml = xml2json(xmlString, {compact: true, spaces: 2 });
      await SaveSeoXMl(xmlString);
      console.log(xmlString)

      notification.success({
        message: `Updated data`,
        description: 'The data has been updated',
        placement: 'topRight',

      });
     
    } catch (error) {
      console.error('Error al guardar el XML', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await GetSeoXMl();
        setXML((response));
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error al obtener el XML', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [])

  if (isLoading) {
    return (<div><p>loading...</p></div>)
  }

  return (
    <>
    <Button
          type="Link"
          size="large"
          icon={
            <FontAwesomeIcon
              icon={faSave}
              className='u-margin-r-2'
            />
          }
          onClick={handleSaveChange}>
          Save
        </Button>
      <div className='xml-container'>
        <TextArea className="xml-container--textarea" allowClear rows="25" value={xmlString} onChange={handleChange} />
      </div>
    </>

  );
}

export default TextAreaSeo