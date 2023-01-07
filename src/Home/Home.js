import React from 'react';

// React Router Dom
import { Link } from 'react-router-dom';

// Assets
import FetchLogo from '../assets/fetch-logo-01.jpeg';

function Home() {
	return (
		<div className='home__main-container'>
			<Link to='/' className='home__links'>
				<img src={FetchLogo} alt='fetchlogo' className='home__header-logo' />
			</Link>
			<Link to='/signup' className='home__links'>
				Sign Up
			</Link>
		</div>
	);
}

export default Home;
