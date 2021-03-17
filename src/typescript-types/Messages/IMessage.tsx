interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: "text" | "reply" | "image" | "deleted",
	SenderId: string,
	DateTime: string,
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string
};

export default IMessage;