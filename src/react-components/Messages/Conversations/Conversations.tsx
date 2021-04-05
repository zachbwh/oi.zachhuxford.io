import React, { useState } from 'react';

import './Conversations.scss';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation/Conversation';
import ConversationsList from './ConversationsList/ConversationsList';
import ConversationSearch from './ConversationsList/ConversationSearch/ConversationSearch';
import SwipeNavBar from 'react-components/Swipe/SwipeNavBar/SwipeNavBar';
import ConversationSettings from './ConversationSettings/ConversationSettings';

function Conversations() {
	let match = useRouteMatch();
	
	const [searchTerm, setSearchTerm] = useState('');

	return (
	<div className="conversations">
		<Switch>
		<	Route path={`${match.path}/settings/:conversationId`}>
				<div className="secondary-view" style={ window.innerWidth < 801 ? {display: "none"} : {}}>
					<ConversationSearch onSearchTermUpdated={setSearchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
				<div className="primary-view">
					<ConversationSettings />
				</div>
			</Route>
			<Route path={`${match.path}/:conversationId`}>
				<div className="secondary-view" style={ window.innerWidth < 801 ? {display: "none"} : {}}>
					<ConversationSearch onSearchTermUpdated={setSearchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
				<div className="primary-view">
					<Conversation />
				</div>
			</Route>
			<Route path={match.path}>
				<div className="primary-view">
					<SwipeNavBar />
					<ConversationSearch onSearchTermUpdated={setSearchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
			</Route>
      </Switch>
	</div>
	);
}

export default Conversations;
