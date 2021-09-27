import React, { useState } from 'react';

import './PasswordInput.scss';
import PasswordStrength from './PasswordStrength/PasswordStrength';

interface PasswordInputProps {
    password: string,
    setPassword: (newPassword: string) => void,
    label: string,
    showStrength?: boolean,
    autoFocus?: boolean,
    classNames?: string
}

function PasswordInput({password, setPassword, label, showStrength=false, autoFocus=false, classNames=""}: PasswordInputProps) {
    function inputChanged(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setPassword(inputChangedEvent.target.value);
    }

    const [focused, setFocused] = useState(autoFocus);
    const active = focused || password;

    if (focused) {
        classNames += " focused";
    }
    if (active) {
        classNames += " active";
    }

	return (
    <div className={"password-input " + classNames}>
        <div className="label">{label}</div>
        <input value={password} onChange={inputChanged} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type="password" size={2} autoFocus={autoFocus}/>
        <div className="password-strength-container" style={{display: showStrength ? "block" : "none"}}>
            <PasswordStrength password={password}/>
        </div>
    </div>
	);
}

export default PasswordInput;
