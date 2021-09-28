import React from 'react';

import './Button.scss';

interface ButtonProps {
    onClick: () => void,
    disabled?: boolean,
    classNames?: string
}

function Button({onClick, disabled=false, classNames="dark", children}: React.PropsWithChildren<ButtonProps>) {
    function buttonClicked() {
        if (!disabled) onClick();
    }

	return (
    <button className={`button ${classNames} ${disabled ? "disabled" : ""}`} onClick={buttonClicked}>
        {children}
    </button>
	);
}

export default Button;
