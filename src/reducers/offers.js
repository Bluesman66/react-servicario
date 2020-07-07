import { CHANGE_OFFER_STATUS, FETCH_OFFERS_SUCCESS } from 'types';

import { combineReducers } from 'redux';

const createOfferList = (offersType) => {
	return (state = [], action) => {
		if (action.offersType !== offersType) {
			return state;
		}

		switch (action.type) {
			case FETCH_OFFERS_SUCCESS:
				return action.offers;
			case CHANGE_OFFER_STATUS:
				const nextState = [...state];
				const offerIndex = nextState.findIndex((o) => o.id === action.offerId);
				nextState[offerIndex].status = action.status;
				return nextState;
			default:
				return state;
		}
	};
};

const offers = combineReducers({
	received: createOfferList('received'),
	sent: createOfferList('sent'),
});

export default offers;
