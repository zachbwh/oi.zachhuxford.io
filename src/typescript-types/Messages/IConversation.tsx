import DraftMessage from './IDraftMessage'
interface IConversation {
	ConversationId: string,
	ConversationImage: string,
	ConversationImageAltText?: string,
	Participants: string[],
	NickNames?: INickName[]
	ConversationName?: string,
	LastActiveDate: Date,
	Messages: string[],
	DraftMessage?: DraftMessage
};

export interface INickName {
	UserId: string,
	NickName: string
};

export default IConversation;