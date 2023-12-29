import React from 'react'
import Fieldset from 'components/accordion/fieldset'
import IconDetail from './icon'
import { Collapse } from 'antd'
import { ISeo } from '../../interface/seo'
import Input from './input'

const Details = ({ data, site, fetch, setFetch, onFieldChange }) => {
    const { Panel } = Collapse

   

    return (
        <React.Fragment>
            <Collapse accordion >
                {
                    data ?
                        data.map((value, index) => [
                            <Panel
                                header={
                                    <Input
                                        name={value[ISeo.Url]}
                                        value={value[ISeo.Url]}
                                        type={ISeo.Url}
                                        site={site}
                                    />
                                }
                                key={index}
                                extra={<IconDetail target={{
                                    url: value[ISeo.Url],
                                    site: site,
                                    fetch: fetch,
                                    setFetch: setFetch
                                }} />}
                            >
                                <Fieldset
                                    className='u-margin-b-2'
                                    leyend='Title'
                                    value={value[ISeo.Title]}
                                    name={value[ISeo.Url]}
                                    type={ISeo.Title}
                                    site={site}
                                    onChange={(newValue) => 
                                        onFieldChange(value[ISeo.Url], ISeo.Title, newValue)
                                    }
                                />
                                <Fieldset
                                    className='u-margin-b-2'
                                    leyend='Keyword'
                                    value={value[ISeo.Keyword]}
                                    name={value[ISeo.Url]}
                                    type={ISeo.Keyword}
                                    site={site}
                                    onChange={(newValue) => 
                                        onFieldChange(value[ISeo.Url], ISeo.Keyword, newValue)
                                    }
                                />
                                <Fieldset
                                    leyend='Description'
                                    value={value[ISeo.Description]}
                                    name={value[ISeo.Url]}
                                    type={ISeo.Description}
                                    site={site}
                                    onChange={(newValue) => 
                                        onFieldChange(value[ISeo.Url], ISeo.Description, newValue)
                                    }
                                />
                            </Panel>
                        ])
                        : ''
                }
            </Collapse>
        </React.Fragment>
    )
}

export default Details