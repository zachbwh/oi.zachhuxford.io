import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './Checkbox.scss';

interface CheckboxProps {
    value: boolean,
    setValue: (value: boolean) => void
}

function Checkbox({value, setValue}: CheckboxProps) {
	return (
    <div className="checkbox" onClick={() => setValue(!value)}>
        <FontAwesomeIcon style={{opacity: value ? 1 : 0}} icon={faCheck}></FontAwesomeIcon>
    </div>
	);
}

export default Checkbox;
