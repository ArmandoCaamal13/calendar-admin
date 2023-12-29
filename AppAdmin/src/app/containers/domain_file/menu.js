import React from 'react'
import Button from 'components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faFile } from '@fortawesome/free-solid-svg-icons/index'

const Menu = () => {
    return(
        <>
         <div>
            <Button name = 'Add Meta' theme = 'box'>
                <FontAwesomeIcon icon = {faFile} className = 'u-box__icon' />
            </Button>
        </div>
        </>
    )
}

export default Menu