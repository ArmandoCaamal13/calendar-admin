import React, { useContext, useEffect, useState } from "react";
import { Input, AutoComplete, Button } from 'antd';
import style from './style.module.scss';

const Search = ({ options, onDataSelect, handleModalOpen }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        // const selectedValue = e.target.value;
        const selectedOption = options.find((option) => option.value === value);
        setSelectedOption(selectedOption);
        onDataSelect(selectedOption);
    };

    const handleSearch = (value) => {
        const selectedOption = options.find((option) => option.value === value);
        setSelectedOption(selectedOption);
        onDataSelect(selectedOption);
        //handleModalOpen(selectedOption);
    }

    return (
        <div className={style.search}>
            <AutoComplete
                style={{ width: '50%' }}
                dropdownClassName="certain-category-search-dropdown"
                notFoundContent="Not Found"
                options={options.map((option) => ({
                    value: option.value,
                }))}
                onSelect={handleOptionChange}
                onChange={handleSearch}
                filterOption={(inputValue, option) =>
                    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            >
                <Input.Search size="large" placeholder="Looking for dtraveller sites" />
            </AutoComplete>
        </div>
    );
}

export default Search;
