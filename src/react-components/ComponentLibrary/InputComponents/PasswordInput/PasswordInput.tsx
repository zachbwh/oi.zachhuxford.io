import React, { useState } from 'react';

import './PasswordInput.scss';
import PasswordStrength from './PasswordStrength/PasswordStrength';
import useToggle from 'react-hooks/Toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

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
    const [showPassword, toggleShowPassword] = useToggle(false);
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
        <div className="input-row">
            <input value={password} onChange={inputChanged} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type={showPassword ? "text" : "password"} size={2} autoFocus={autoFocus}/>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggleShowPassword} className="toggle-password-hidden" />
        </div>
        <div className="password-strength-container" style={{display: showStrength ? "block" : "none"}}>
            <PasswordStrength password={password}/>
        </div>
    </div>
	);
}

export default PasswordInput;
