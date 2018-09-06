import React from 'react';
import { ControlLabel } from 'react-bootstrap';

const FieldFileInput = (props) => {
    /* eslint-disable react/prop-types */
    const { label, input: { onChange } } = props;
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>
            <div className="file">
                <input
                    type="file"
                    id="file-input"
                    accept=".jpg, .png, .jpeg, .pdf, .txt"
                    onChange={e => onChange(e.target.files[0])} />
                <ControlLabel htmlFor="file-input">Upload</ControlLabel>
            </div>
        </div>
    );
};

export default FieldFileInput;
