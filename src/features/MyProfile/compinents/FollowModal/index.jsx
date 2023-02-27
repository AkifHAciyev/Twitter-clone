import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from './index.module.css';
import user from '../../../../assets/images/user.jpg';
import addUser from '../../../../assets/icons/add-user.png';

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
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
	borderRadius: '8px',
};

const FollowModal = ({ handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					<p className={styled.title}>Text in a modal</p>
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					<div className={styled.userInfo}>
						<div className={styled.center}>
							<div className={styled.left}>
								<img className={styled.userInfoImg} src={user} alt="#" />
								<div>
									{' '}
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
					<div className={styled.userInfo}>
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
				</Typography>
			</Box>
		</Modal>
	);
};

export default FollowModal;
