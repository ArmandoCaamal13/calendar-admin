import React, { useEffect, useState } from "react";
import style from './style.module.scss'
import * as JsonService from "../../api/service/JsonService";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => setOpen(open == value ? 0 : value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <div className={style.container_cards}>
                    <div className={style.lenguaje}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    {jsonData && jsonData.Root.Site.map((site) => (
                                        <Tab label={`Site in ${site.Name}`} key={site.Id} {...a11yProps(0)} />
                                    ))}
                                </Tabs>
                            </Box>
                            {jsonData && jsonData.Root.Site.map((site, index) => (
                                <CustomTabPanel value={value} index={index} key={site.Id}>
                                    <div className="container">
                                        <div className="row">
                                            {site.Page && site.Page.slice((currentPage - 1) * 4, currentPage * 4).map(page => (
                                                <div className="col-md-6">
                                                    <div className="card mb-3">
                                                        <h5 className="card-header">{page.Url}</h5>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{page.Title}</h5>
                                                            <div className={style.card_content}>
                                                                <Accordion>
                                                                    <AccordionSummary
                                                                        expandIcon={<ArrowDownwardIcon />}
                                                                        aria-controls="panel1-content"
                                                                        id="panel1-header"
                                                                    >
                                                                        <Typography>Accordion 1</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                            <fieldset className="border p-2">
                                                                                <legend className="float-none w-auto">Keywords</legend>
                                                                                <Typography>
                                                                                    {page.Keywords}
                                                                                </Typography>
                                                                            </fieldset>
                                                                        <Typography>
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                                        </Typography>
                                                                        <Typography>
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                                        </Typography>
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </div>
                                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CustomTabPanel>
                            ))}
                        </Box>
                    </div>
                </div>
                <div className={style.container_pagination}>
                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            {/* <CardView/> */}
        </>
    )
}

export default DomainsFile
