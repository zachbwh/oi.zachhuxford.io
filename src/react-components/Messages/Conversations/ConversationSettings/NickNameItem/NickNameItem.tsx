import React from "react";
import { useSelector } from "react-redux";
import { userSelectById } from "redux/slices/MessagesSlice";
import IConversation from "typescript-types/Messages/IConversation";

import './NickNameItem.scss';

interface NickNameItemProps {
	conversation: IConversation,
	userId: string,
	onClick: () => void
}

function NickNameItem({conversation, userId, onClick}: NickNameItemProps) {
	const nickName = conversation.NickNames?.find(nickName => nickName.UserId === userId),
		user = useSelector(userSelectById(userId)),
		userFullName = `${user?.FirstName} ${user?.LastName}`;

	return (
		<div className="nickname-item" onClick={onClick}>
			<img className="user-img" src={user?.ProfileImage} alt={user?.ProfileImageAltText}></img>
			<div className="user-nickname">
				<div className="nickname">{nickName?.NickName || "Set Nickname"}</div>
				<div className="actual-name">{userFullName}</div>
			</div>
		</div>
	);
}

export default NickNameItem;