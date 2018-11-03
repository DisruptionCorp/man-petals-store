import axios from 'axios';

const SET_AUTH = 'SET_AUTH';

const _setAuth = auth => ({
  type: SET_AUTH,
  auth,
});

export const exchangeTokenForAuth = history => {
  return dispatch => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return;
    }

    return axios
      .get('/api/auth', {
        headers: {
          authorization: token,
        },
      })
      .then(response => response.data)
      .then(auth => {
        return dispatch(_setAuth(auth));
      })
      .then(() => {
        //Things you should do when user first logs
        //Auth object is now in the Redux Store and can be accessed on any connected component
        // I.E. dispatch a thunk to load user data
        if (history) {
          history.push('/');
        }
      })
      .catch(ex => {
        console.log(ex);
        window.localStorage.removeItem('token');
      });
  };
};

const logout = () => {
  window.localStorage.removeItem('token');
  return _setAuth({});
};

const login = (credentials, history) => {
  return dispatch => {
    return axios
      .post('/api/auth', credentials)
      .then(response => response.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth(history));
      });
  };
};

const authReducer = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    state = action.auth;
  }

  return state;
};

export { logout, login, authReducer };
