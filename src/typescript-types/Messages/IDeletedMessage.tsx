import IMessage from './IMessage';

interface IDeletedMessage extends IMessage {
	IsDeleted: true
};

function isDeletedMessage(message: IMessage): message is IDeletedMessage {
	return message.MessageType === "deleted";
}

export default IDeletedMessage;
export {isDeletedMessage};