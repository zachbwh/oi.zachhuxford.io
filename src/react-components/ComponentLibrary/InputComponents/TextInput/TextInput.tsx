import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './TextInput.scss';

interface TextInputProps {
    value: string,
    setValue: (textValue: string) => void,
    placeholder?: string,
    inputType?: string,
    autoFocus?: boolean,
    spellCheck?: boolean,
    icon?: IconDefinition,
    classNames?: string
}

function TextInput({value, setValue, placeholder, inputType="text", autoFocus=false, spellCheck=false, icon, classNames} : TextInputProps) {
    const inputChanged = function(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setValue(inputChangedEvent.target.value);
    }

    let iconCpt;
    if (icon) {
        iconCpt = <FontAwesomeIcon className="icon" icon={icon}></FontAwesomeIcon>
    }

	return (
    <div className={"text-input " + classNames}>
        {iconCpt}
        <input value={value} onChange={inputChanged} placeholder={placeholder} autoFocus={autoFocus} type={inputType} size={2} spellCheck={spellCheck}></input>
    </div>
	);
}

export default TextInput;
