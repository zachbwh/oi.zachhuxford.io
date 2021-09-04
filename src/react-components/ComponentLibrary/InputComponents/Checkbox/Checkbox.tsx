import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './Checkbox.scss';

const Checkbox: React.FunctionComponent<{value: boolean, setValue: (value: boolean) => void}> = props => {
	return (
    <div className="checkbox" onClick={() => props.setValue(!props.value)}>
        <FontAwesomeIcon style={{opacity: props.value ? 1 : 0}} icon={faCheck}></FontAwesomeIcon>
    </div>
	);
}

export default Checkbox;
