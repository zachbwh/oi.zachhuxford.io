interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: "text" | "reply" | "images" | "deleted",
	SenderId: string,
	DateTime: string,
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string
};

export default IMessage;