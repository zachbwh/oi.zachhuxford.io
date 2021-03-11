import React from 'react';

import './ConversationSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ConversationSearch: React.FunctionComponent<{ onSearchTermUpdated: (searchTerm: string) => void }> = props => {

    const onSearchInputUpdated = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearchTermUpdated(changeEvent.target.value);
    }

	return (
	<div className="conversation-search">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        <input type="text" placeholder="Search Messages" onChange={onSearchInputUpdated}></input>
	</div>
	);
}

export default ConversationSearch;
