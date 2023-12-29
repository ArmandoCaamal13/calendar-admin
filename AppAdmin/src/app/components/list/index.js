import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import style from './style.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faFolder } from '@fortawesome/free-solid-svg-icons/index';
import Table from '../../containers/domain_file/table';


const List = () => {

  const [mostrarComponente, setMostrarComponente] = useState(true);

  return (
    <div className='height'>
      <button onClick={() => setMostrarComponente(!mostrarComponente)} >
        {mostrarComponente ? 
         <div className={style.list} >
          <span>Garrafon</span>
          <FontAwesomeIcon icon={faFolder} />
        </div>: <div className={style.list} >
          <span>Garrafon</span>
          <FontAwesomeIcon icon={faFolder} />
        </div>}
      </button>
      <div className={mostrarComponente ? style.show_element : null}>
        {mostrarComponente && <Table/>}
      </div>
    
    </div>
  );
}

export default List