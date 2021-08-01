import IMessage from './IMessage';
import ITextMessage from './ITextMessage';

interface IImagesMessage extends ITextMessage {
	ImageUrls: string[]
};

function isImagesMessage(message: IMessage): message is IImagesMessage {
	return message.MessageType === "images";
}

export default IImagesMessage;
export {isImagesMessage};