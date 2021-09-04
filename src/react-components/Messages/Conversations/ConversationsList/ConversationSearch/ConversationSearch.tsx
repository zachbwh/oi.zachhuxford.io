import React from 'react';

import './ConversationSearch.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TextInput from 'react-components/ComponentLibrary/InputComponents/TextInput/TextInput';

const ConversationSearch: React.FunctionComponent<{ onSearchTermUpdated: (searchTerm: string) => void, searchTerm: string }> = props => {

	return (
	<div className="conversation-search">
        <TextInput icon={faSearch} autoFocus={true} setValue={props.onSearchTermUpdated} value={props.searchTerm} inputType="text" classNames="light"></TextInput>
	</div>
	);
}

export default ConversationSearch;
