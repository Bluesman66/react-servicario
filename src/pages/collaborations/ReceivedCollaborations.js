import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Timestamp } from 'db';
import { fetchCollaborations } from 'actions';
import moment from 'moment';
import { withAuthorization } from 'components';

const ReceivedCollaborations = (props) => {
	const [state, setState] = useState({
		collaborations: [],
	});

	useEffect(() => {
		const {
			auth: { user },
		} = props;
		fetchCollaborations(user.uid).then((collaborations) =>
			setState({ collaborations })
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getCollaborationStatus = (expiresAt) => {
		if (!expiresAt) {
			return { className: 'is-danger', status: 'Not Started' };
		}
		if (Timestamp.now().seconds < expiresAt.seconds) {
			return { className: 'is-warning', status: 'In Progress' };
		} else {
			return { className: 'is-success', status: 'Finished' };
		}
	};

	const { collaborations } = state;

	const renderCollaborations = (collaborations) => {
		return collaborations.map((c) => {
			const { className, status } = getCollaborationStatus(c.expiresAt);
			return (
				<article key={c.id} className="post">
					<h4>{c.title}</h4>
					<div className="media">
						<div className="media-left">
							<p className="image is-32x32">
								<img src={c.image} alt={c.title} />
							</p>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<span>{c.fromUser.name}</span> replied{' '}
									{moment(c.createdAt.toDate()).fromNow()} &nbsp;
									<span className={`tag ${className}`}>{status}</span>
								</p>
							</div>
						</div>
						<div className="media-right">
							<span className="has-text-grey-light">
								<Link to={`/collaborations/${c.id}`}>
									<button className="button">Enter</button>
								</Link>
							</span>
						</div>
					</div>
				</article>
			);
		});
	};

	return (
		<div className="content-wrapper">
			<div className="container">
				<h1 className="title">Collaborations</h1>
				<div className="box content">
					{renderCollaborations(collaborations)}
				</div>
			</div>
		</div>
	);
};

export default withAuthorization(ReceivedCollaborations);
