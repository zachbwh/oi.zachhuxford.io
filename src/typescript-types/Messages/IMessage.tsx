interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: "text" | "reply" | "images" | "deleted",
	SenderId: string,
	DateTime: string,
	Reactions?: IReaction[],
	// The following properties do not belong on this interface
	// the only reason they exist is to allow for the redux deleteMessage action
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string
};

export interface IReaction {
	ReactionType: "love" | "laugh" | "angry" | "wow" | "thumbs-up" | "thumbs-down",
	UserId?: string,
	MessageId?: string
};


export default IMessage;