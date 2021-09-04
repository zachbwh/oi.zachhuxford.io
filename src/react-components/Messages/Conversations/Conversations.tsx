import React, { useState } from 'react';

import './Conversations.scss';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation/Conversation';
import ConversationsList from './ConversationsList/ConversationsList';
import ConversationSearch from './ConversationsList/ConversationSearch/ConversationSearch';
import ConversationSettings from './ConversationSettings/ConversationSettings';
import SwipeNavBar from 'react-components/Swipe/SwipeNavBar/SwipeNavBar';

function Conversations() {
	let match = useRouteMatch();
	
	const [searchTerm, setSearchTerm] = useState('');

	return (
	<div className="conversations">
		<Switch>
			<Route path={`${match.path}/settings/:conversationId`}>
				<div className="secondary-view hide-mobile" style={ window.innerWidth < 801 ? {display: "none"} : {}}>
					<SwipeNavBar></SwipeNavBar>
					<ConversationSearch onSearchTermUpdated={setSearchTerm} searchTerm={searchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
				<div className="primary-view">
					<ConversationSettings />
				</div>
			</Route>
			<Route path={`${match.path}/:conversationId`}>
				<div className="secondary-view hide-mobile" style={ window.innerWidth < 801 ? {display: "none"} : {}}>
					<SwipeNavBar></SwipeNavBar>
					<ConversationSearch onSearchTermUpdated={setSearchTerm} searchTerm={searchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
				<div className="primary-view">
					<Conversation />
				</div>
			</Route>
			<Route path={match.path}>
				<div className="secondary-view primary-mobile">
					<SwipeNavBar></SwipeNavBar>
					<ConversationSearch onSearchTermUpdated={setSearchTerm} searchTerm={searchTerm}></ConversationSearch>
					<ConversationsList searchTerm={searchTerm} />
				</div>
				<div className="primary-view hide-mobile">
					<div className="choose-conversation"><div>Choose a Conversation.</div></div>
				</div>
			</Route>
      </Switch>
	</div>
	);
}

export default Conversations;
