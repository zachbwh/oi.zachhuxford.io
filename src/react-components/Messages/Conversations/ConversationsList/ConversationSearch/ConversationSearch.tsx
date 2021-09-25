import React from 'react';

import './ConversationSearch.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TextInput from 'react-components/ComponentLibrary/InputComponents/TextInput/TextInput';

interface ConversationSearchProps {
	onSearchTermUpdated: (searchTerm: string) => void,
	searchTerm: string
}

function ConversationSearch({searchTerm, onSearchTermUpdated}: ConversationSearchProps) {

	return (
	<div className="conversation-search">
        <TextInput value={searchTerm} setValue={onSearchTermUpdated} placeholder="Search Messages" icon={faSearch} autoFocus={true} classNames="light" />
	</div>
	);
}

export default ConversationSearch;
