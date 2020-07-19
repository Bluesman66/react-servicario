import auth from './auth';
import collaboration from './collaboration';
import { combineReducers } from 'redux';
import offers from './offers';
import selectedService from './selectedService';
import services from './services';

const serviceApp = combineReducers({
	services,
	selectedService,
	auth,
	offers,
	collaboration,
});

export const getMessages = (state) => state.auth.messages;
export default serviceApp;
