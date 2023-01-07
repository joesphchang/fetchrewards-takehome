import React, { useState, useRef, useEffect } from 'react';

// Axios
import axios from 'axios';

// React Icons
import { AiFillEye } from 'react-icons/ai';

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

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Axios Call to handle Form Registration
	const handleSignUp = () => {
		axios
			.post('https://frontend-take-home.fetchrewards.com/form', signup)
			.then((res) => {
				// console.log(res);
			});
	};

	// Fetch Call to handle occupation information
	function fetchRewards() {
		fetch('https://frontend-take-home.fetchrewards.com/form')
			.then((res) => res.json())
			.then((res) => {
				setFetchOccupation(res.occupations);
				setFetchState(res.states);
				// console.log(res.states);
				// console.log(res.occupations);
			});
	}

	useEffect(() => {
		fetchRewards();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (handleSignUp()) {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
		}
	};

	const handleChange = (event) => {
		setSignUp({ ...signup, [event.target.id]: event.target.value });
		setSubmitted(false);
	};

	// Toggle Password to Show or Hide
	const showPassword = () => {
		if (showPass) {
			togglePassword.current.attributes['1'].value = 'text';
		}
		if (!showPass) {
			togglePassword.current.attributes['1'].value = 'password';
		}
		setShowPass(!showPass);
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className='success'
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {signup.name} successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className='error'
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className='signup__main-container'>
			<div className='signup__main-messages'>
				{errorMessage()}
				{successMessage()}
			</div>
			<form
				id='fetchRewardsForm'
				onSubmit={handleSubmit}
				className='signup__main-form'>
				<label htmlFor='name' className='signup__main-label'>
					Name
				</label>
				<input
					id='name'
					type='name'
					value={signup.name}
					placeholder='Name'
					onChange={handleChange}
					autoComplete='off'
					required
					className='signup__main-input name__input'
				/>
				<label htmlFor='email' className='signup__main-label'>
					Email
				</label>
				<input
					id='email'
					type='email'
					value={signup.email}
					placeholder='Email'
					onChange={handleChange}
					autoComplete='off'
					className='signup__main-input email__input'
					required
				/>
				<label htmlFor='password' className='signup__main-label'>
					Password
				</label>
				<div className='signup__main-password-container'>
					<input
						ref={togglePassword}
						id='password'
						type='password'
						value={signup.password}
						placeholder='Password'
						onChange={handleChange}
						autoComplete='off'
						className='signup__main-input password__input'
						required
					/>
					<button
						type='button'
						onClick={showPassword}
						className='button__password'>
						<AiFillEye />
					</button>
				</div>
				<label htmlFor='occupation' className='signup__main-label'>
					Occupation
				</label>
				<select
					id='occupation'
					name='occupation'
					form='fetchRewardsForm'
					value={signup.occupation}
					className='signup__main-input occupation__input'
					onChange={handleChange}
					required>
					{fetchOccupation.map((info) => (
						<option value={info} key={info}>
							{info}
						</option>
					))}
				</select>
				<label htmlFor='state' className='signup__main-label'>
					State
				</label>
				<select
					id='state'
					name='state'
					form='fetchRewardsForm'
					value={signup.state}
					onChange={handleChange}
					className='signup__main-input state__input'
					autoComplete='off'
					required>
					{fetchState.map((states) => (
						<option value={states.name} key={states.name}>
							{states.name}
						</option>
					))}
				</select>
				<input type='submit' value='Sign Up' className='signup__main-button' />
			</form>
		</div>
	);
}

export default SignUp;
