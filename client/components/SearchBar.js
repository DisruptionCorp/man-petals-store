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
  Chip,
  CircularProgress,
} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      filteredTags: [],
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { tags } = this.props;
    const { input } = this.state;
    // NOT DOING ANYTHING WITH INPUT HERE, CHANGE THIS LOGIC TEMPORARILY TO OPERATE WITH INPUT TEXT
    this.setState({ [e.target.name]: e.target.value });
    const filtered = tags.reduce((acc, each) => {
      return each.includes(e.target.value) && !acc.includes(each)
        ? [...acc, each]
        : [...acc];
    }, []);
    this.setState({ filteredTags: filtered });
  }

  handleClick(e) {
    const { getProductsByTags, history } = this.props;
    const { filteredTags } = this.state;
    const { name } = e.target;
    console.log(filteredTags)
    getProductsByTags(filteredTags).then(() => {
      history.push('/search/page/1');
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    const { input, filteredTags, loading } = this.state;
    const { handleChange, handleClick } = this;
    const { tags, random } = this.props;

    return loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <div>
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
            />
            <IconButton onClick={handleClick}>
              <Icon>search_icon</Icon>
            </IconButton>
          </Toolbar>
        </div>
        <div
          style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
        >
          {random.map((each, idx) => {
            return (
              <Chip
                name={each}
                key={idx}
                label={each}
                clickable={false}
                color={'default'}
                style={{ margin: '5px' }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }, { history }) => {
  const { allProducts } = products;
  const tags = allProducts.reduce((acc, curr) => {
    return curr.tags ? [...acc, ...curr.tags] : [...acc];
  }, []);

  const random = Array(5)
    .fill('')
    .map(curr => {
      return tags[Math.floor(Math.random() * tags.length)];
    });
  return { tags, random, allProducts, history };
};

const mapDispatchToProps = dispatch => ({
  getProductsByTags: tags => dispatch(getProductsByTags(tags)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
