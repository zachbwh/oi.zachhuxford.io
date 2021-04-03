interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: "text" | "reply" | "images" | "deleted",
	SenderId: string,
	DateTime: string,
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string,
	Reactions?: IReaction[]
};

export interface IReaction {
	ReactionType: "love" | "laugh" | "angry" | "wow" | "thumbs-up" | "thumbs-down",
	UserId?: string,
	MessageId?: string
};


export default IMessage;