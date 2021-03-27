import { faCopy, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import useFocusOut from 'react-hooks/FocusOut';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage, messageSelectById } from 'redux/slices/MessagesSlice';

import './MessageActions.scss';

interface IAction {
    actionName: string,
    icon: any,
    action: () => void
}

const MessageActions: React.FunctionComponent<{ messageId: string, close: () => void }> = props => {
    const message = useSelector(messageSelectById(props.messageId))
    if (!message) {
        props.close();
    }

    const actionsRef = useRef(null);

	useFocusOut(actionsRef, props.close);
    
	const dispatch = useDispatch();

    const actions: IAction[] = [
        {
            actionName: "Copy",
            icon: <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>,
            action: () => {
                if (message) {
                    // to do copy implementation
                }
            }
        },
        {
            actionName: "Delete",
            icon: <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>,
            action: () => {
                if (message) {
                    dispatch(deleteMessage(message))
                }
            }
        },
        {
            actionName: "Reply",
            icon: <FontAwesomeIcon icon={faReply}></FontAwesomeIcon>,
            action: () => {
                // todo: create reply input view
            }
        },
    ];

    const filteredActions = actions.filter((action, id) => {
        var shouldShowAction = true;

        if (!message) {
            return false;
        }

        switch (action.actionName) {
            case "Copy":
                if (message.MessageType === "deleted") {
                    shouldShowAction = false;
                }
                break;

            case "Delete":
                if (message.MessageType === "deleted") {
                    shouldShowAction = false;
                }
                break;

            case "Reply":
                if (message.MessageType === "deleted") {
                    shouldShowAction = false;
                }
                break;
            default:
                break;
        }

        return shouldShowAction;
    });

    const messageActions = filteredActions.map((action) => {
        return (
            <div className="action" onClick={action.action} key={action.actionName}>
                {action.icon}
                <div>{action.actionName}</div>
            </div>
        )
    })

    if (!filteredActions.length) {
        props.close();
    }

	return (
    <div className="message-actions" ref={actionsRef}  style={!filteredActions.length ? {bottom: "-100%"} : {}}>
        {messageActions}
    </div>
	);
}

export default MessageActions;