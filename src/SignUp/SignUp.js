import React, { useState, useRef, useEffect } from 'react';

// Axios
import axios from 'axios';

function SignUp() {
	// Toggle Password
	const togglePassword = useRef(null);
	const [showPass, setShowPass] = useState(false);

	// Sign Up Form useState
	const [signup, setSignUp] = useState({
		name: '',
		email: '',
		password: '',
		occupation: '',
		state: '',
	});

	// Fetch Information State
	const [fetchOccupation, setFetchOccupation] = useState([]);
	const [fetchState, setFetchState] = useState([]);

	// Axios Call to handle Register Form
	const handleSignUp = () => {
		axios
			.post('https://frontend-take-home.fetchrewards.com/form', signup)
			.then((res) => {
				console.log(res);
			});
	};

	// Fetch Call to handle occupation information
	function fetchRewards() {
		fetch('https://frontend-take-home.fetchrewards.com/form')
			.then((res) => res.json())
			.then((res) => {
				setFetchOccupation(res.occupations);
				setFetchState(res.states);
				console.log(res.states);
				// console.log(res.occupations);
			});
	}

	useEffect(() => {
		fetchRewards();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		handleSignUp();
	};

	const handleChange = (event) => {
		setSignUp({ ...signup, [event.target.id]: event.target.value });
	};

	const showPassword = () => {
		if (showPass) {
			togglePassword.current.attributes['1'].value = 'text';
		}
		if (!showPass) {
			togglePassword.current.attributes['1'].value = 'password';
		}
		setShowPass(!showPass);
	};

	return (
		<div className='signup__main-container'>
			<form id='fetchRewardsForm' onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='name'
					value={signup.name}
					placeholder='Name'
					onChange={handleChange}
					autoComplete='off'
					required
				/>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='email'
					value={signup.email}
					placeholder='Email'
					onChange={handleChange}
					autoComplete='off'
					required
				/>
				<label htmlFor='password'>Password</label>
				<input
					ref={togglePassword}
					id='password'
					type='password'
					value={signup.password}
					placeholder='Password'
					onChange={handleChange}
					autoComplete='off'
					required
				/>
				<button type='button' onClick={showPassword}>
					Show Password
				</button>
				<label htmlFor='occupation'>Occupation</label>
				<select
					id='occupation'
					name='occupation'
					form='fetchRewardsForm'
					value={signup.occupation}
					onChange={handleChange}
					required>
					{fetchOccupation.map((info) => (
						<option value={info} key={info}>
							{info}
						</option>
					))}
				</select>
				<label htmlFor='state'>State</label>
				<select
					id='state'
					name='state'
					form='fetchRewardsForm'
					value={signup.state}
					onChange={handleChange}
					autoComplete='off'
					required>
					{fetchState.map((states) => (
						<option value={states.name} key={states.name}>
							{states.name}
						</option>
					))}
				</select>
				<input type='submit' value='Submit' />
			</form>
		</div>
	);
}

export default SignUp;
