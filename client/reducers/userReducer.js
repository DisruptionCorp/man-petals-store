import axios from 'axios';

// state
const initialState = {};

// constants
const CREATE_USER = 'CREATE_USER';

// action creators
const createUser = userInfo => ({
  type: CREATE_USER,
  userInfo
})

// thunk creators
export const _createUser = userInfo => dispatch => {
	return axios
			.post('/api/users', userInfo)
			.then(resp => dispatch(createUser(resp.data)))
			.catch();
}

// reducer
export const userReducer = (state=initialState, action) => {
	switch (action.type){
	  case CREATE_USER:
	    return state = action.userInfo
	  default:
	    return state;
	}
}