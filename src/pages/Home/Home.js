/* eslint jsx-a11y/anchor-is-valid: 0 */

import { Hero, ServiceItem } from 'components';
import React, { useEffect, useState } from 'react';

import { getServices } from 'store';

const Home = () => {
	const [state, setState] = useState({
		services: [],
	});

	useEffect(() => {
		const services = getServices();
		setState({ services });
	}, []);

	const renderServices = (services) =>
		services.map((service) => (
			<ServiceItem key={service.id} service={service} />
		));

	const { services } = state;

	return (
		<div>
			<Hero />
			<section className="section section-feature-grey is-medium">
				<div className="container">
					<div className="title-wrapper has-text-centered">
						<h2 className="title is-2">Great Power Comes </h2>
						<h3 className="subtitle is-5 is-muted">
							With great Responsability
						</h3>
						<div className="divider is-centered"></div>
					</div>

					<div className="content-wrapper">
						<div className="columns">{renderServices(services)}</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
