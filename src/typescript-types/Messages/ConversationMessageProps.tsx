import Message from './IMessage';

interface ConversationMessageProps<MessageType extends Message> {
    message: MessageType,
    onClick?: () => void,
    onClickOutside?: () => void,
    onLongPress?: () => void,
};

export default ConversationMessageProps;