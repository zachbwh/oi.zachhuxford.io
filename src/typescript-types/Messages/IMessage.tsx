interface IMessage {
	MessageId: string,
	ConversationId: string
	MessageType: string
	SenderId: string,
	DateTime: string,
	MessageText?: string,
	ImageUrls?: string[],
	ReferenceMessageId?: string
};

export default IMessage;