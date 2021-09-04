import React from 'react';

import './CustomButton.scss';

const CustomButton: React.FunctionComponent<{onClick: () => void}> = props => {
	return (
    <div className="custom-button" onClick={() => props.onClick()}>
        {props.children}
    </div>
	);
}

export default CustomButton;
