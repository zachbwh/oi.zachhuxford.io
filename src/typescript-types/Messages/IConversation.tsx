import DraftMessage from './IDraftMessage'
interface IConversation {
	ConversationId: string,
	ConversationImage: string,
	ConversationImageAltText?: string,
	Participants: string[],
	NickNames?: string[]
	ConversationName?: string,
	LastActiveDate: Date,
	Messages: string[],
	DraftMessage?: DraftMessage
};

export default IConversation;