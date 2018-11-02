import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsByTags } from '../reducers/productReducer';
import {
  Toolbar,
  Input,
  Icon,
  IconButton,
  Paper,
  Typography,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      filteredTags: [],
      isOpen: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleOpen() {
    this.state.input ? this.setState({ isOpen: true }) : null;
  }

  handleChange(e) {
    const { tags } = this.props;
    const { input } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    const filtered = tags.reduce((acc, each) => {
      return each.includes(e.target.value) && !acc.includes(each)
        ? [...acc, each]
        : [...acc];
    }, []);
    this.setState({ filteredTags: filtered });
  }

  handleClick(e) {
    console.log(this.props);
    const { getProductsByTags } = this.props;
    const { filteredTags } = this.state;
    /*this.setState({loading:true});
  	setInterval(()=>{
  		this.setState({loading:false})*/
    getProductsByTags(filteredTags);
    /*}, 3000)*/
  }

  render() {
    const { input, filteredTags, isOpen } = this.state;
    const { handleChange, handleOpen, handleClick } = this;
    console.log(filteredTags, 'original tags: ', this.props.tags);
    return (
      <div>
        {/*{this.state.loading ?
        <BeatLoader /> :*/}
        <div>
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Input
              placeholder="Search a tag..."
              name="input"
              value={input}
              type="text"
              onChange={handleChange}
              onOpen={handleOpen}
            />
            <IconButton
              onClick={handleClick}
              component={Link}
              to="/home/search"
            >
              <Icon>search_icon</Icon>
            </IconButton>
          </Toolbar>
          <Typography align="center" variant="body1">
            Please be advised that tags have to begin with a {'#hash'}!
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  const tags = products.reduce((acc, curr) => {
    return curr.tags ? [...acc, ...curr.tags] : [...acc];
  }, []);
  return { tags };
};

const mapDispatchToProps = dispatch => ({
  getProductsByTags: tags => dispatch(getProductsByTags(tags)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
