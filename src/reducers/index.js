import auth from './auth';
import { combineReducers } from 'redux';
import selectedService from './selectedService';
import services from './services';

const serviceApp = combineReducers({
	services,
	selectedService,
	auth,
});

export default serviceApp;
