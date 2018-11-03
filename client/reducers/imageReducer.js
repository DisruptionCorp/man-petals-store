import axios from 'axios';

//action name
// const LOAD_IMAGES = 'LOAD_IMAGES';
const CREATE_IMAGE = 'CREATE_IMAGE';

//action creator
// const _loadImages = images => ({
//   type: LOAD_IMAGES,
//   images,
// });

// const loadImages = () => {
//   return dispatch => {
//     return axios
//       .get('/api/images')
//       .then(response => response.data)
//       .then(images => dispatch(_loadImages(images)));
//   };
// };

const _createImage = image => ({
  type: CREATE_IMAGE,
  image,
});

export const createImage2 = data => {
  return dispatch => {
    return axios
      .post('/api/images', { data })
      .then(resp => dispatch(_createImage(resp.data)));
  };
};

export const createImage = data => {
  return dispatch => {
    return axios.post('/api/images', { data });
  };
};

export const imageReducer = (state = [], action) => {
  switch (action.type) {
    case createImage:
      state = action.image;
      break;
  }
  return state;
};
