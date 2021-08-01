import IMessage from './IMessage';
import ITextMessage from './ITextMessage';

interface IReplyMessage extends ITextMessage {
	ReferenceMessageId: string
};

function isReplyMessage(message: IMessage): message is IReplyMessage {
	return message.MessageType === "reply";
}

export default IReplyMessage;
export {isReplyMessage};