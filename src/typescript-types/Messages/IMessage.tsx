interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: string,
	SenderId: string,
	DateTime: string,
	Reactions?: IReaction[],
	IsDeleted: Boolean,
	MessageText?: string

};

export interface IReaction {
	ReactionType: "love" | "laugh" | "angry" | "wow" | "thumbs-up" | "thumbs-down",
	UserId?: string,
	MessageId?: string
};


export default IMessage;