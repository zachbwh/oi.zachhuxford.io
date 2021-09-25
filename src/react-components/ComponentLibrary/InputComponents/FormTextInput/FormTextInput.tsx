import React, { useState } from 'react';

import './FormTextInput.scss';

interface FormTextInputProps {
    value: string,
    setValue: (textValue: string) => void,
    label: string,
    inputType?: string,
    autoFocus?: boolean,
    spellCheck?: boolean,
    classNames?: string
}

function FormTextInput({value, setValue, label, inputType="text", autoFocus=false, spellCheck=false, classNames=""}: FormTextInputProps) {
    function inputChanged(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setValue(inputChangedEvent.target.value);
    }

    const [focused, setFocused] = useState(autoFocus);
    const active = focused || value;

    if (focused) {
        classNames += " focused";
    }
    if (active) {
        classNames += " active";
    }

	return (
    <div className={"form-text-input " + classNames}>
        <div className="label">{label}</div>
        <input value={value} onChange={inputChanged} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type={inputType} size={2} spellCheck={spellCheck} autoFocus={autoFocus}/>
    </div>
	);
}

export default FormTextInput;
