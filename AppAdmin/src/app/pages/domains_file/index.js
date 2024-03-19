import React, { useEffect, useState } from "react";
import style from './style.module.scss';
import * as JsonService from "../../api/service/JsonService";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from "components/pagination/index";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DomainsFile = () => {
    const [jsonData, setJsonData] = useState(null);
    const [selectedSiteId, setSelectedSiteId] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await JsonService.GetSeoJson();
            if (jsonData && jsonData.Root && jsonData.Root.Site && jsonData.Root.Site.length > 0) {
                const firstSite = jsonData.Root.Site[0];
                setJsonData(jsonData);
                setSelectedSiteId(firstSite.Id);
                calculateTotalItems(firstSite);
            };
        }
        fetchData();
    }, []);

    const calculateTotalItems = (site) => {
        let totalItems = 0;
        if (site && site.Page) {
            totalItems = site.Page.length;
        }
        setTotalItems(totalItems);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={style.container_tabs}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            {jsonData && jsonData.Root.Site.map((site, index) => (
                                <Tab label={site.Name} {...a11yProps(index)} key={site.Id} />
                            ))}
                        </Tabs>
                    </Box>

                    {jsonData && jsonData.Root.Site.map((site, index) => (
                        <CustomTabPanel value={value} index={index} key={site.Id}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between">
                                {site.Page && site.Page.slice((currentPage - 1) * 6, currentPage * 6).map(page => (
                                    <div className="max-w-sm rounded overflow-hidden shadow-lg" key={page.Id_page}>
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{page.Title}</div>
                                            <p className="text-gray-700 text-base">
                                                {page.Keywords}
                                            </p>
                                        </div>
                                        <div className="px-4 pt-2 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </CustomTabPanel>
                    ))}
                </Box>
            </div>
        </>
    )
}

export default DomainsFile
