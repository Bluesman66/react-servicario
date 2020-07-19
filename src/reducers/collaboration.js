import {
	REMOVE_COLLABORATION_MESSAGE,
	RESET_COLLABORATION_MESSAGES,
	SET_COLLABORATION,
	SET_COLLABORATION_JOINED_PEOPLE,
	SET_COLLABORATION_MESSAGES,
	UPDATE_COLLABORATION_USER,
} from 'types';

import { combineReducers } from 'redux';

const initCollab = () => {
	const collaboration = (state = {}, action) => {
		switch (action.type) {
			case SET_COLLABORATION:
				return action.collaboration;
			default:
				return state;
		}
	};

	const joinedPeople = (state = [], action) => {
		switch (action.type) {
			case SET_COLLABORATION_JOINED_PEOPLE:
				return action.joinedPeople;
			case UPDATE_COLLABORATION_USER:
				const newJoinedPeople = [...state];
				const { user } = action;
				const index = newJoinedPeople.findIndex((jp) => jp.uid === user.uid);

				if (index < 0) {
					return state;
				}
				if (newJoinedPeople[index].state === user.state) {
					return state;
				}

				newJoinedPeople[index].state = user.state;
				return newJoinedPeople;
			default:
				return state;
		}
	};

	const messages = (state = [], action) => {
		switch (action.type) {
			case SET_COLLABORATION_MESSAGES:
				const newMessages = [...state];
				action.messages.forEach((change) => {
					if (change.type === 'added') {
						newMessages.push({ id: change.doc.id, ...change.doc.data() });
					}
				});
				return newMessages;
			case REMOVE_COLLABORATION_MESSAGE:
				return state.filter((m) => m.id !== action.messageId);
			case RESET_COLLABORATION_MESSAGES:
				return [];
			default:
				return state;
		}
	};

	return combineReducers({
		joined: collaboration,
		joinedPeople,
		messages,
	});
};

const collaboration = initCollab();
export default collaboration;
