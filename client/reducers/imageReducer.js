import axios from 'axios';

//action name
const LOAD_IMAGES = 'LOAD_IMAGES';

//action creator
const _loadImages = images => ({
  type: LOAD_IMAGES,
  images,
});

const loadImages = () => {
  return dispatch => {
    return axios
      .get('/api/images')
      .then(response => response.data)
      .then(images => dispatch(_loadImages(images)));
  };
};

//thunk
export const createImage = data => {
  return dispatch => {
    return axios
      .post('/api/images', { data })
      .then(() => dispatch(loadImages()));
  };
};

export const imageReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      state = action.images;
      break;
  }
  return state;
};
