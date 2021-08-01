import IMessage from './IMessage';

interface ITextMessage extends IMessage {
	MessageText: string
};

function isTextMessage(message: IMessage): message is ITextMessage {
	return message.MessageType === "text";
}

export default ITextMessage;
export {isTextMessage};