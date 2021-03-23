interface IDraftMessage {
	ConversationId: string
	MessageType: "text" | "reply" | "images",
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string
};

export default IDraftMessage;