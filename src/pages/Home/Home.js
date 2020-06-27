/* eslint jsx-a11y/anchor-is-valid: 0 */

import { Hero, ServiceItem } from 'components';
import React, { useEffect } from 'react';

import { connect } from 'react-redux'; // HOC
import { fetchServices } from 'actions';

const Home = (props) => {
	useEffect(() => {
		props.dispatch(fetchServices());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderServices = (services) =>
		services.map((service) => (
			<ServiceItem key={service.id} service={service} />
		));

	const { services } = props;

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

const mapStateToProps = (state) => ({ services: state.services.items });

export default connect(mapStateToProps)(Home);
