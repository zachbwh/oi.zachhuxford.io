import React, { useState } from 'react';

import './Conversations.scss';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation/Conversation';
import ConversationsList from './ConversationsList/ConversationsList';
import ConversationSearch from './ConversationsList/ConversationSearch/ConversationSearch';
import SwipeNavBar from 'react-components/Swipe/SwipeNavBar/SwipeNavBar';

function Conversations() {
	let match = useRouteMatch();
	
	const [searchTerm, setSearchTerm] = useState('');

	return (
	<div className="conversations">
		<Switch>
			<Route path={`${match.path}/:conversationId`}>
				<Conversation />
			</Route>
			<Route path={match.path}>
				<SwipeNavBar />
				<ConversationSearch onSearchTermUpdated={setSearchTerm}></ConversationSearch>
				<ConversationsList searchTerm={searchTerm} />
			</Route>
      </Switch>
	</div>
	);
}

export default Conversations;
