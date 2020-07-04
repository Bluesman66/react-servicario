import auth from './auth';
import { combineReducers } from 'redux';
import selectedService from './selectedService';
import services from './services';
import user from './user';

const serviceApp = combineReducers({
	services,
	selectedService,
	auth,
	user,
});

export default serviceApp;
