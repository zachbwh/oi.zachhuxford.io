import React, { useState } from "react";
import TextInput from "react-components/ComponentLibrary/InputComponents/TextInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { addNickNameToConversation, userSelectById } from "redux/slices/MessagesSlice";
import IConversation, { INickName } from "typescript-types/Messages/IConversation";

import './SetNickName.scss';

interface SetNickNameProps {
	conversation: IConversation,
	userId: string,
	close: () => void
}

function SetNickName({conversation, userId, close}: SetNickNameProps) {
	const nickName = conversation.NickNames?.find(nickName => nickName.UserId === userId),
		user = useSelector(userSelectById(userId)),
		userFullName = `${user?.FirstName} ${user?.LastName}`,
		dispatch = useDispatch();

	const [newNickName, setNewNickName] = useState(nickName?.NickName || userFullName);

	function saveNewNickname() {
		const nickNameToSave: INickName = {
			UserId: userId,
			NickName: newNickName
		};

		dispatch(addNickNameToConversation({newNickName: nickNameToSave, conversation: conversation}));
		close();
	}

	return (
		<div className="set-nickname">
			<div className="instructions">Set Nickname for {userFullName}</div>
			<TextInput value={newNickName} setValue={setNewNickName} autoFocus={true} classNames="light" />
			<div className="actions">
				<div onClick={() => close()}>Cancel</div>
				<div onClick={saveNewNickname}>Set</div>
			</div>
		</div>
	);
}

export default SetNickName;