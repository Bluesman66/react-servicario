import * as api from 'api';

import { COLLABORATION_CREATED_FROM_OFFER } from 'types';

export const collaborate = ({ collaboration, message }) => (dispatch) =>
	api.createCollaboration(collaboration).then((collabId) => {
		message.cta = `/collaborations/${collabId}`;
		api.sendMessage(message);
		api.markOfferAsInCollaboration(collaboration.fromOffer);
		dispatch({
			type: COLLABORATION_CREATED_FROM_OFFER,
			offerId: collaboration.fromOffer,
			offersType: 'sent',
		});
		return collabId;
	});
