import * as api from 'api';

import { FETCH_SERVICES_SUCCESS, FETCH_SERVICE_SUCCESS } from 'types';

export const fetchServices = () =>
	api.fetchServices().then((services) => ({
		type: FETCH_SERVICES_SUCCESS,
		services,
	}));

export const fetchServiceById = (serviceId) =>
	api.fetchServiceById(serviceId).then((service) => ({
		type: FETCH_SERVICE_SUCCESS,
		service,
	}));
