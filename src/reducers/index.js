import auth from './auth';
import { combineReducers } from 'redux';
import offers from './offers';
import selectedService from './selectedService';
import services from './services';

const serviceApp = combineReducers({
	services,
	selectedService,
	auth,
	offers,
});

export const getMessages = (state) => state.auth.user.messages;
export default serviceApp;
