import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNickNameToConversation, userSelectById } from "redux/slices/MessagesSlice";
import IConversation, { INickName } from "typescript-types/Messages/IConversation";

import './SetNickName.scss';

const SetNickName: React.FunctionComponent<{conversation: IConversation, userId: string, close: () => void}> = props => {
	const nickName = props.conversation.NickNames?.find(nickName => nickName.UserId === props.userId),
		user = useSelector(userSelectById(props.userId)),
		userFullName = `${user?.FirstName} ${user?.LastName}`,
		dispatch = useDispatch();

	const [newNickName, setNewNickName] = useState(nickName?.NickName || userFullName);

	function saveNewNickname() {
		const nickNameToSave: INickName = {
			UserId: props.userId,
			NickName: newNickName
		};

		dispatch(addNickNameToConversation({newNickName: nickNameToSave, conversation: props.conversation}));
		props.close();
	}

	return (
		<div className="set-nickname">
			<div className="instructions">Set Nickname for {userFullName}</div>
			<div className="input-wrapper">
				<input autoFocus type="text" value={newNickName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewNickName(event.target.value)}/>
			</div>
			<div className="actions">
				<div onClick={() => props.close()}>Cancel</div>
				<div onClick={saveNewNickname}>Set</div>
			</div>
		</div>
	);
}

export default SetNickName;