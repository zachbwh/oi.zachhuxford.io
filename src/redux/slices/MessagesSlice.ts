import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

import { RootState } from 'redux/StateTypes';
import Conversation from 'typescript-types/Messages/IConversation';
import IDraftMessage from 'typescript-types/Messages/IDraftMessage';
import IMessage from 'typescript-types/Messages/IMessage';
import Message from 'typescript-types/Messages/IMessage';
import User from 'typescript-types/Messages/IUser';

export interface MessagesState {
	conversations: ConversationsState,
	users: UsersState,
	messages: MessageEntitiesState,
}

interface ConversationsState {
	entities: {[id: string]: Conversation},
	ids: string[]
}

interface UsersState {
	entities: {[id: string]: User},
	ids: string[]
}

interface MessageEntitiesState {
	entities: {[id: string]: Message},
	ids: string[]
}

const dateComparer = (a:Date, b:Date) => {
	if (a < b) {
		return -1;
	} else if (b < a) {
		return 1;
	}
	return 0;
}

const conversationsAdapter = createEntityAdapter<Conversation>({
	selectId: conversation => conversation.ConversationId,
	sortComparer: (a, b) => dateComparer(new Date(a.LastActiveDate), new Date(b.LastActiveDate))
});

const usersAdapter = createEntityAdapter<User>({});

const messagesAdapter = createEntityAdapter<Message>({
	selectId: message => message.MessageId,
	sortComparer: (a, b) => dateComparer(new Date(a.DateTime), new Date(b.DateTime))
});

export const messagesSlice = createSlice({
	name: 'messages',
	initialState: { 
		conversations: conversationsAdapter.getInitialState(),
		users: usersAdapter.getInitialState(),
		messages: messagesAdapter.getInitialState()
	} as MessagesState,
	reducers: {
		setConversations: function(state, action) {
			state.conversations = action.payload.conversations;
			state.users = action.payload.users;
			state.messages = action.payload.messages;
		},
		addMessage: {
			reducer: (state, action: PayloadAction<IMessage>) => {
				messagesAdapter.addOne(state.messages, action.payload)
			},
			prepare: (payload) => {
				var newPayload = {
					payload: { 
						...payload,
						MessageId: nanoid(),
						DateTime: new Date().toISOString()
					}
				};

				return newPayload;
			}
		},
		setConversationDraftMessage: (state, action: PayloadAction<IDraftMessage>) => {
			state.conversations.entities[action.payload.ConversationId].DraftMessage = action.payload;
			return state;
		},
		removeConversationDraftMessage: (state, action: PayloadAction<string | number>) => {
			delete state.conversations.entities[action.payload].DraftMessage;
			return state;
		},
	}
});

const conversationsSelectors = conversationsAdapter.getSelectors<ConversationsState>(
	(state) => state
);

export const conversationSelectIds = () => (state: RootState) => conversationsSelectors.selectIds(state.messages.conversations)
export const conversationSelectEntities = () => (state: RootState) => conversationsSelectors.selectEntities(state.messages.conversations)
export const conversationSelectAll = () => (state: RootState) => conversationsSelectors.selectAll(state.messages.conversations)
export const conversationSelectTotal = () => (state: RootState) => conversationsSelectors.selectTotal(state.messages.conversations)
export const conversationSelectById = (id: string | number) => (state: RootState) => conversationsSelectors.selectById(state.messages.conversations, id)

export const selectLastMessageFromConversation = (id: string | number) => function(state: RootState) {
	const orderedMessages = Object.values(state.messages.messages.entities)
	.filter(message => message.ConversationId === id)
	.sort((a, b) => {
		if (a.DateTime === b.DateTime) {
			return 0;
		} else if (new Date(a.DateTime) > new Date(b.DateTime)) {
			return 1;
		} else {
			return -1;
		}
	});

	return orderedMessages[orderedMessages.length - 1];
};

const usersSelectors = usersAdapter.getSelectors<UsersState>(
	(state) => state
);

export const userSelectIds = () => (state: RootState) => usersSelectors.selectIds(state.messages.users)
export const userSelectEntities = () => (state: RootState) => usersSelectors.selectEntities(state.messages.users)
export const userSelectAll = () => (state: RootState) => usersSelectors.selectAll(state.messages.users)
export const userSelectTotal = () => (state: RootState) => usersSelectors.selectTotal(state.messages.users)
export const userSelectById = (id: string | number) => (state: RootState) => usersSelectors.selectById(state.messages.users, id)

const messagesSelectors = messagesAdapter.getSelectors<MessageEntitiesState>(
	(state) => state
);

export const messageSelectIds = () => (state: RootState) => messagesSelectors.selectIds(state.messages.messages)
export const messageSelectEntities = () => (state: RootState) => messagesSelectors.selectEntities(state.messages.messages)
export const messageSelectAll = () => (state: RootState) => messagesSelectors.selectAll(state.messages.messages)
export const messageSelectTotal = () => (state: RootState) => messagesSelectors.selectTotal(state.messages.messages)
export const messageSelectById = (id: string | number) => (state: RootState) => messagesSelectors.selectById(state.messages.messages, id)


export const { setConversations, addMessage, setConversationDraftMessage, removeConversationDraftMessage } = messagesSlice.actions;


export default messagesSlice.reducer;