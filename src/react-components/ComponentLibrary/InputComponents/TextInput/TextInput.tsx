import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './TextInput.scss';

interface TextInputProps {
    value: string,
    setValue: (textValue: string) => void,
    placeholder?: string,
    inputType: string,
    autoFocus?: boolean,
    spellCheck?: boolean,
    icon?: IconDefinition,
    classNames: string
}

const TextInput: React.FunctionComponent<TextInputProps> = props => {
    const inputChanged = function(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        props.setValue(inputChangedEvent.target.value);
    }

    let icon;
    if (props.icon) {
        icon = <FontAwesomeIcon className="icon" icon={props.icon}></FontAwesomeIcon>
    }

    const classNames = [props.classNames];
    const hasLabel = typeof props.placeholder === "string";
    const showLabel = hasLabel && props.value;

    if (hasLabel) {
        classNames.push("has-label");
    }
    if (showLabel) {
        classNames.push("show-label");
    }

	return (
    <div className={"text-input " + classNames.join(" ")}>
        <div className="label">{props.placeholder}</div>
        <div className="container">
            {icon}
            <input autoFocus={props.autoFocus} type={props.inputType} placeholder={props.placeholder} onChange={inputChanged} value={props.value} size={2} spellCheck={props.spellCheck}></input>
        </div>
    </div>
	);
}

export default TextInput;
