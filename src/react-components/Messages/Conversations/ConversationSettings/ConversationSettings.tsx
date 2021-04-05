import React, { useState } from "react";
import Modal from "react-components/ComponentLibrary/Modal/Modal";
import { useSelector } from "react-redux";
import { conversationSelectById } from "redux/slices/MessagesSlice";

import './ConversationSettings.scss';
import SetNickName from "./SetNickName/SetNickName";
import NickNameItem from "./NickNameItem/NickNameItem";
import { useParams } from "react-router-dom";
import ConversationSettingsNavBar from "./ConversationSettingsNavBar/ConversationSettingsNavBar";
import Scrollbars from "react-custom-scrollbars";

function ConversationNavBar() {
	let { conversationId } = useParams<{conversationId: string}>();
	const conversation = useSelector(conversationSelectById(conversationId));

	const [showSetNickNameUserId, setShowSetNickNameUserId] = useState('');

	const nickNames = conversation?.Participants.map(userId => {
		return <NickNameItem userId={userId} conversation={conversation} onClick={() => setShowSetNickNameUserId(userId)} key={userId}></NickNameItem>
	});

	function closeSetNickNameModal() {
		setShowSetNickNameUserId('');
	}
	let setNickName
	if (showSetNickNameUserId && conversation) {
		setNickName = <SetNickName userId={showSetNickNameUserId} conversation={conversation} close={closeSetNickNameModal}></SetNickName>
	}
	return (
		<div className="conversation-settings">
			<ConversationSettingsNavBar conversationId={conversationId}></ConversationSettingsNavBar>
			<Scrollbars>
				<div className="settings-list-wrapper">
					<div className="settings-section">
						<div className="section-heading">Nicknames</div>
						{nickNames}
					</div>
				</div>
			</Scrollbars>
			<div id="conversation-settings-modal-root" className="modal-root hidden"></div>
			<Modal closeModal={closeSetNickNameModal} modalRootId="conversation-settings-modal-root">{setNickName}</Modal>
		</div>
	);
}

export default ConversationNavBar;