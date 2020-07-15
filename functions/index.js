// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	// Push the new message into Cloud Firestore using the Firebase Admin SDK.
	const writeResult = await admin
		.firestore()
		.collection('messages')
		.add({ original: original });
	// Send back a message that we've succesfully written the message
	res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
	.document('/messages/{documentId}')
	.onCreate((snap, context) => {
		// Grab the current value of what was written to Cloud Firestore.
		const original = snap.data().original;

		// Access the parameter `{documentId}` with `context.params`
		functions.logger.log('Uppercasing', context.params.documentId, original);

		const uppercase = original.toUpperCase();

		// You must return a Promise when performing asynchronous tasks inside a Functions such as
		// writing to Cloud Firestore.
		// Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
		return snap.ref.set({ uppercase }, { merge: true });
	});

exports.onUserStatusChanged = functions.database
	.ref('/status/{uid}')
	.onUpdate(async (change, context) => {
		const eventStatus = change.after.val();

		const userFirestoreRef = firestore.doc(`/profiles/${context.params.uid}`);

		const statusSnapshot = await change.after.ref.once('value');
		const status = statusSnapshot.val();

		if (status.last_changed > eventStatus.last_changed) {
			return null;
		}

		eventStatus.last_changed = new Date(eventStatus.last_changed);
		return userFirestoreRef.update(eventStatus);
	});
