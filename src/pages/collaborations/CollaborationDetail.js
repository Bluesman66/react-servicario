import { ChatMessages, JoinedPeople, withAuthorization } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import {
	joinCollaboration,
	leaveCollaboration,
	sendChatMessage,
	subToCollaboration,
	subToMessages,
	subToProfile,
} from 'actions';
import { useParams, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import moment from 'moment';

const CollaborationDetail = (props) => {
	const [state, setState] = useState({
		inputValue: '',
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
		}).then((_) => setState({ inputValue: '' }));
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
								<img
									className="viewAvatarItem"
									src="https://i.imgur.com/cVDadwb.png"
									alt="icon avatar"
								/>
								<span className="textHeaderChatBoard">{user.fullName}</span>
							</div>
							<div className="viewListContentChat">
								<ChatMessages authUser={user} messages={messages} />
								<div style={{ float: 'left', clear: 'both' }}></div>
							</div>
							<div className="viewBottom">
								<input
									onChange={(e) => setState({ inputValue: e.target.value })}
									onKeyPress={onKeyboardPress}
									value={inputValue}
									className="viewInput"
									placeholder="Type your message..."
								/>
								<button
									onClick={() => onSendMessage(inputValue)}
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
