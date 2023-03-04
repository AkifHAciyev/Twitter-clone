import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './index.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authReducer } from '../../redux/slices/auth';

const Login = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: 'test@test.ru',
			password: '12345',
		},
		mode: 'onChange',
	});

	const onSubmit = (values) => {
		dispatch(authReducer);
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Log In
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', { required: 'Add Email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Add password' })}
					fullWidth
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Log In
				</Button>
			</form>
		</Paper>
	);
};

export default Login;
