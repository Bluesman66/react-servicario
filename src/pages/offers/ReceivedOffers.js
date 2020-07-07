import React, { useEffect } from 'react';
import { ServiceItem, withAuthorization } from 'components';
import { changeOfferStatus, fetchReceivedOffers } from 'actions';

import { connect } from 'react-redux';

const ReceivedOffers = (props) => {
	useEffect(() => {
		const { auth } = props;
		props.fetchReceivedOffers(auth.user.uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const acceptOffer = (offerId) => {
		props.changeOfferStatus(offerId, 'accepted');
	};

	const declineOffer = (offerId) => {
		props.changeOfferStatus(offerId, 'declined');
	};

	const statusClass = (status) => {
		if (status === 'pending') return 'is-warning';
		if (status === 'accepted') return 'is-success';
		if (status === 'declined') return 'is-danger';
	};

	const { offers } = props;

	return (
		<div className="container">
			<div className="content-wrapper">
				<h1 className="title">Received Offers</h1>
				<div className="columns">
					{offers.map((offer) => (
						<div key={offer.id} className="column is-one-third">
							<ServiceItem
								noButton
								className="offer-card"
								service={offer.service}
							>
								<div className={`tag is-large ${statusClass(offer.status)}`}>
									{offer.status}
								</div>
								<hr />
								<div className="service-offer">
									<div>
										<span className="label">From User:</span>{' '}
										{offer.fromUser.fullName}
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
								{offer.status === 'pending' && (
									<div>
										<hr />
										<button
											onClick={() => acceptOffer(offer.id)}
											className="button is-success s-m-r"
										>
											Accept
										</button>
										<button
											onClick={() => declineOffer(offer.id)}
											className="button is-danger"
										>
											Decline
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

const mapStateToProps = ({ offers }) => ({ offers: offers.received });

export default withAuthorization(
	connect(mapStateToProps, {
		changeOfferStatus,
		fetchReceivedOffers,
	})(ReceivedOffers)
);
