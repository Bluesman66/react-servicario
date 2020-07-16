import React, { useEffect, useRef } from 'react';
import { joinCollaboration, subToCollaboration } from 'actions';
import { useParams, withRouter } from 'react-router-dom';

import { JoinedPeople } from 'components';
import { connect } from 'react-redux';
import { withAuthorization } from 'components';

const CollaborationDetail = (props) => {
	const unsubscribeFromCollab = useRef(null);
	const { id } = useParams();
	const { user } = props.auth;

	useEffect(() => {
		joinCollaboration(id, user.uid);
		watchCollabChanges(id);
		return () => {
			unsubscribeFromCollab.current();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const watchCollabChanges = (id) => {
		unsubscribeFromCollab.current = props.subToCollaboration(id);
	};

	const { collaboration, joinedPeople } = props;
	return (
		<div className="content-wrapper">
			<div className="root">
				<h1 className="title">{collaboration.title}</h1>
				<div className="body">
					<div className="viewListUser">
						<JoinedPeople users={joinedPeople} />
					</div>
					<div className="viewBoard">
						<div className="viewChatBoard">
							<div className="headerChatBoard">
								<img
									className="viewAvatarItem"
									src="https://i.imgur.com/cVDadwb.png"
									alt="icon avatar"
								/>
								<span className="textHeaderChatBoard">Filip Jerga</span>
							</div>
							<div className="viewListContentChat">
								<div className="viewWrapItemLeft">
									<div className="viewWrapItemLeft3">
										<img
											src="https://i.imgur.com/cVDadwb.png"
											alt="avatar"
											className="peerAvatarLeft"
										/>
										<div className="viewItemLeft">
											<span className="textContentItem">hey</span>
										</div>
									</div>
									<span className="textTimeLeft">Oct 31, 2019</span>
								</div>
								<div className="viewItemRight">
									<span className="textContentItem">hey</span>
								</div>
								<div style={{ float: 'left', clear: 'both' }}></div>
							</div>
							<div className="viewBottom">
								<input
									onChange={() => {}}
									className="viewInput"
									placeholder="Type your message..."
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = () => ({
	subToCollaboration,
});

const mapStateToProps = (state) => {
	return {
		collaboration: state.collaboration.joined,
		joinedPeople: state.collaboration.joinedPeople,
	};
};

const Collaboration = withAuthorization(withRouter(CollaborationDetail));
export default connect(mapStateToProps, mapDispatchToProps())(Collaboration);
