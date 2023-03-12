import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts');
	return data;
});

export const savePost = createAsyncThunk('post/savePost', async ({ postId, userId }) => {
	const response = await axios.post(`/users/${userId}/save-post/${postId}`);
	return response.data;
});

export const saveLike = createAsyncThunk('post/likePost', async ({ postId, userId }) => {
	const response = await axios.post(`/users/${userId}/like-post/${postId}`);
	return response.data;
});

export const removeSavedPost = (postId) => (dispatch) => {
	dispatch(authActions.removeSavedPost(postId));
};

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducer: {
		updateSavedState: (state, action) => {
			const { postId, saved } = action.payload;
			const post = state.posts.find((post) => post.id === postId);
			if (post) {
				post.isSaved = saved;
			}
		},
	},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = 'error';
		},
	},
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state) => state.auth.status;

export const { updateSavedState } = postsSlice.actions;
