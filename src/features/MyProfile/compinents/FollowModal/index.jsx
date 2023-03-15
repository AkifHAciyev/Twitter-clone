import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from './index.module.css';
import user from '../../../../assets/images/user.jpg';
import addUser from '../../../../assets/icons/add-user.png';
import unFollow from '../../../../assets/icons/unFollow.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../redux/slices/users';
import { useEffect } from 'react';
import { fetchAuthMe, selectIsAuthMe } from '../../../../redux/slices/auth';
import axios from '../../../../axios';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 636,
	width: '100%',
	boxShadow: 24,
	p: 4,
	bgcolor: '#FFFFFF',
	borderRadius: '8px',
};

const FollowModal = ({ handleClose }) => {
	const { users } = useSelector((state) => state.users);
	const isUsersLoading = users.status == 'loading';
	const userData = useSelector(selectIsAuthMe);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		userData;
	}, []);

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	const handleFollow = async (e, userId) => {
		e.preventDefault();
		const userDataId = userData._id;
		const response = axios
			.put(`https://goldfish-app-dv7j2.ondigitalocean.app/users/following/${userId}`, { userDataId })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		dispatch(fetchAuthMe(response));
	};

	const handleUnFollow = async (e, userId) => {
		e.preventDefault();
		const userDataId = userData._id;
		const response = axios
			.put(`https://goldfish-app-dv7j2.ondigitalocean.app/users/unfollowing/${userId}`, { userDataId })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		dispatch(fetchAuthMe(response));
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					<p className={styled.title}>Users from</p>
				</Typography>
				<Box
					sx={{
						mt: 2,
						borderBottom: '1px solid #e0e0e0',
						maxHeight: '50vh',
						overflowY: 'auto',
						'&::-webkit-scrollbar': { width: '0' },
					}}
				>
					{(isUsersLoading ? [...Array(2)] : [...users.items].reverse()).map((obj, index) =>
						isUsersLoading ? (
							<div key={index} className={styled.userInfo}>
								<div className={styled.center}>
									<div className={styled.left}>
										<img className={styled.userInfoImg} src={user} alt="#" />
										<div>
											<p className={styled.name}>Daniel Jensen</p>
											<p className={styled.follor}>120k followers</p>
										</div>
									</div>
									<button className={styled.button}>
										<img className={styled.follorIcon} src={addUser} alt="#" />
										Follow
									</button>
								</div>
								<p className={styled.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, iusto.</p>
							</div>
						) : obj._id === userData._id ? null : (
							<div key={obj._id} className={styled.userInfo}>
								<div className={styled.center}>
									<div className={styled.left}>
										<img
											className={styled.userInfoImg}
											src={
												!obj.avatarUrl || obj.avatarUrl == 'https://goldfish-app-dv7j2.ondigitalocean.app'
													? user
													: `https://goldfish-app-dv7j2.ondigitalocean.app${obj.avatarUrl}`
											}
											alt="#"
										/>
										<div>
											<p className={styled.name}>{obj.fullName}</p>
											<p className={styled.follor}>Followers : {obj.Followers.length}</p>
										</div>
									</div>
									{userData?.Following?.includes(obj._id) ? (
										<button onClick={(e) => handleUnFollow(e, obj._id)} className={styled.button}>
											<img className={styled.follorIcon} src={unFollow} alt="#" />
											Un Follow
										</button>
									) : (
										<button onClick={(e) => handleFollow(e, obj._id)} className={styled.button}>
											<img className={styled.follorIcon} src={addUser} alt="#" />
											Follow
										</button>
									)}
								</div>
								<p className={styled.text}>{obj.bio ? obj.bio : null}</p>
							</div>
						)
					)}
				</Box>
			</Box>
		</Modal>
	);
};

export default FollowModal;
