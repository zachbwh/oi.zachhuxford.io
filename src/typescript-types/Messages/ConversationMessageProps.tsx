import Message from './IMessage';

interface ConversationMessageProps {
    message: Message,
    onClick?: () => void,
    onClickOutside?: () => void,
    onLongPress?: () => void,
};

export default ConversationMessageProps;