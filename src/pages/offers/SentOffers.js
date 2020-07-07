import React, { useEffect } from 'react';
import { ServiceItem, withAuthorization } from 'components';
import { collaborate, fetchSentOffers } from 'actions';
import { newCollaboration, newMessage } from 'helpers/offers';

import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';

const SentOffers = (props) => {
	useEffect(() => {
		const { auth } = props;
		props.dispatch(fetchSentOffers(auth.user.uid));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createCollaboration = (offer) => {
		const {
			auth: { user },
			toastManager,
		} = props;

		const collaboration = newCollaboration({ offer, fromUser: user });
		const message = newMessage({ offer, fromUser: user });

		props.collaborate({ collaboration, message }).then((_) =>
			toastManager.add('Collaboration was Created!', {
				appearance: 'success',
				autoDismiss: true,
			})
		);
	};

	const { offers } = props;
	return (
		<div className="container">
			<div className="content-wrapper">
				<h1 className="title">Sent Offers</h1>
				<div className="columns">
					{offers.map((offer) => (
						<div key={offer.id} className="column is-one-third">
							<ServiceItem
								noButton
								className="offer-card"
								service={offer.service}
							>
								<div className="tag is-large">{offer.status}</div>
								<hr />
								<div className="service-offer">
									<div>
										<span className="label">To User:</span>{' '}
										{offer.toUser.fullName}
									</div>
									<div>
										<span className="label">Note:</span> {offer.note}
									</div>
									<div>
										<span className="label">Price:</span> ${offer.price}
									</div>
									<div>
										<span className="label">Time:</span> {offer.time} hours
									</div>
								</div>
								{offer.status === 'accepted' && !offer.collaborationCreated && (
									<div>
										<hr />
										<button
											onClick={() => createCollaboration(offer)}
											className="button is-success"
										>
											Collaborate
										</button>
									</div>
								)}
							</ServiceItem>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ offers }) => ({ offers: offers.sent });
const SentOffersWithToast = withToastManager(SentOffers);

export default withAuthorization(
	connect(mapStateToProps, { collaborate })(SentOffersWithToast)
);
