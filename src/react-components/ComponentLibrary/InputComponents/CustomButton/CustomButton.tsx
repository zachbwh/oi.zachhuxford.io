import React from 'react';

import './CustomButton.scss';

interface CustomButtonProps {
    onClick: () => void
}

function CustomButton({onClick, children}: React.PropsWithChildren<CustomButtonProps>) {
	return (
    <div className="custom-button" onClick={() => onClick()}>
        {children}
    </div>
	);
}

export default CustomButton;
