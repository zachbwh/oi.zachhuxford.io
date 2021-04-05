import React from "react";
import { useSelector } from "react-redux";
import { userSelectById } from "redux/slices/MessagesSlice";
import IConversation from "typescript-types/Messages/IConversation";

import './NickNameItem.scss';

const NickNameItem: React.FunctionComponent<{conversation: IConversation, userId: string, onClick: () => void}> = props => {
	const nickName = props.conversation.NickNames?.find(nickName => nickName.UserId === props.userId),
		user = useSelector(userSelectById(props.userId)),
		userFullName = `${user?.FirstName} ${user?.LastName}`;

	return (
		<div className="nickname-item" onClick={props.onClick}>
			<img className="user-img" src={user?.ProfileImage} alt={user?.ProfileImageAltText}></img>
			<div className="user-nickname">
				<div className="nickname">{nickName?.NickName || "Set Nickname"}</div>
				<div className="actual-name">{userFullName}</div>
			</div>
		</div>
	);
}

export default NickNameItem;