import {
	ChatMessages,
	JoinedPeople,
	Spinner,
	Timer,
	withAuthorization,
} from 'components';
import React, { useEffect, useRef, useState } from 'react';
import {
	joinCollaboration,
	leaveCollaboration,
	sendChatMessage,
	startCollaboration,
	subToCollaboration,
	subToMessages,
	subToProfile,
} from 'actions';
import { useParams, withRouter } from 'react-router-dom';

import { Timestamp } from 'db';
import { connect } from 'react-redux';
import moment from 'moment';

const CollaborationDetail = (props) => {
	const [state, setState] = useState({
		inputValue: '',
		reload: false,
	});

	const unsubscribeFromCollab = useRef(null);
	const unsubscribeFromMessages = useRef(null);
	const peopleWatchers = useRef(null);

	const { id } = useParams();
	const { user } = props.auth;
	const { collaboration, joinedPeople, messages } = props;
	const { inputValue } = state;

	useEffect(() => {
		joinCollaboration(id, user.uid);
		watchCollabChanges(id);
		watchMessagesChanges(id);
		return () => {
			if (unsubscribeFromCollab.current) {
				unsubscribeFromCollab.current();
			}
			if (unsubscribeFromMessages.current) {
				unsubscribeFromMessages.current();
			}
			Object.keys(peopleWatchers.current).forEach((uid) =>
				peopleWatchers.current[uid]()
			);
			leaveCollaboration(id, user.uid);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onKeyboardPress = (e) => {
		if (e.key === 'Enter') {
			onSendMessage(inputValue);
		}
	};

	const onSendMessage = (inputValue) => {
		if (inputValue.trim() === '') {
			return;
		}

		const timestamp = moment().valueOf().toString();

		const message = {
			user: {
				uid: user.uid,
				avatar: user.avatar,
				name: user.fullName,
			},
			timestamp: parseInt(timestamp, 10),
			content: inputValue.trim(),
		};

		sendChatMessage({
			message,
			collabId: collaboration.id,
			timestamp,
		}).then((_) => setState({ ...state, inputValue: '' }));
	};

	const watchCollabChanges = (id) => {
		unsubscribeFromCollab.current = props.subToCollaboration(
			id,
			({ joinedPeople }) => {
				watchJoinedPeopleChanges(joinedPeople.map((jp) => jp.id));
			}
		);
	};

	const watchMessagesChanges = (collabId) => {
		unsubscribeFromMessages.current = props.subToMessages(collabId);
	};

	const watchJoinedPeopleChanges = (ids) => {
		peopleWatchers.current = {};
		ids.forEach((id) => {
			peopleWatchers.current[id] = props.subToProfile(id);
		});
	};

	const onStartCollaboration = (collaboration) => {
		const { id, time } = collaboration;
		const nowSeconds = Timestamp.now().seconds;
		const expiresAt = new Timestamp(nowSeconds + time, 0);
		startCollaboration(id, expiresAt);
	};

	const getCollaborationStatus = (collaboration) => {
		if (Object.keys(collaboration).length === 0) {
			return 'loading';
		}

		if (!collaboration.expiresAt) {
			return 'notStarted';
		}
		if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
			return 'active';
		} else {
			return 'finished';
		}
	};

	const status = getCollaborationStatus(collaboration);
	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<div className="content-wrapper">
			<div className="root">
				<div className="body">
					<div className="viewListUser">
						<JoinedPeople users={joinedPeople} />
					</div>
					<div className="viewBoard">
						<div className="viewChatBoard">
							<div className="headerChatBoard">
								<div className="headerChatUser">
									<img
										className="viewAvatarItem"
										src="https://i.imgur.com/cVDadwb.png"
										alt="icon avatar"
									/>
									<span className="textHeaderChatBoard">{user.fullName}</span>
								</div>
								{status === 'notStarted' && (
									<div className="headerChatButton">
										<button
											onClick={() => onStartCollaboration(collaboration)}
											className="button is-success"
										>
											Start Collaboration
										</button>
									</div>
								)}
								{status === 'active' && (
									<Timer
										seconds={
											collaboration.expiresAt.seconds - Timestamp.now().seconds
										}
										timeOutCallback={() => setState({ ...state, reload: true })}
									/>
								)}
								{status === 'finished' && (
									<span className="tag is-warning is-large">
										Collaboration has been finished
									</span>
								)}
							</div>
							<div className="viewListContentChat">
								<ChatMessages authUser={user} messages={messages} />
								<div style={{ float: 'left', clear: 'both' }}></div>
							</div>
							<div className="viewBottom">
								<input
									onChange={(e) =>
										setState({ ...state, inputValue: e.target.value })
									}
									onKeyPress={onKeyboardPress}
									disabled={status === 'finished' || status === 'notStarted'}
									value={inputValue}
									className="viewInput"
									placeholder="Type your message..."
								/>
								<button
									onClick={() => onSendMessage(inputValue)}
									disabled={status === 'finished' || status === 'notStarted'}
									className="button is-primary is-large"
								>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ collaboration }) => {
	return {
		collaboration: collaboration.joined,
		joinedPeople: collaboration.joinedPeople,
		messages: collaboration.messages,
	};
};

const mapDispatchToProps = () => ({
	subToCollaboration,
	subToProfile,
	subToMessages,
});

const Collaboration = withAuthorization(withRouter(CollaborationDetail));
export default connect(mapStateToProps, mapDispatchToProps())(Collaboration);
