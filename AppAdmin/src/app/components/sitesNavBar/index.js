import React from 'react'
import GarrafonICon from 'public/site/garrafon.png'
import { Image } from 'antd'
import style from './style.module.scss'

const SitesNavBar = () => {
    return (
        <React.Fragment>
            <div className = {style.BoxSite}>
                <img className = {style.BoxSite__image} src = {GarrafonICon} width = {50} />
                Garrafon
            </div>
            <div className = {style.BoxSite}>
                <img className = {style.BoxSite__image} src = {GarrafonICon} width = {50} />
                Garrafon
            </div>
            <div className = {style.BoxSite}>
                <img className = {style.BoxSite__image} src = {GarrafonICon} width = {50} />
                Garrafon
            </div>
            <div className = {style.BoxSite}>
                <img className = {style.BoxSite__image} src = {GarrafonICon} width = {50} />
                Garrafon
            </div>
            <div className = {style.BoxSite}>
                <img className = {style.BoxSite__image} src = {GarrafonICon} width = {50} />
                Garrafon
            </div>
        </React.Fragment>
    )
}


export default SitesNavBar