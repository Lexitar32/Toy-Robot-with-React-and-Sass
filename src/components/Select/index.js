import React from 'react';
import "./index.scss";

const Select = ({
    name,
    value,
    options,
    onBlur
}) => {
    return (
        <React.Fragment>
            <select name={name} id={name} value={value} onBlur={(e) => { onBlur(e) }}>
                {
                    options.length > 0 &&
                    options.map((option, index) => <option key={index} value={option.value}>{option.title}</option>)
                }
            </select>
        </React.Fragment>
    );
};

export default Select;