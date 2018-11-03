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
  CircularProgress
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
    this.setState({ [e.target.name]: e.target.value });
    const filtered = tags.reduce((acc, each) => {
      return each.includes(e.target.value) && !acc.includes(each)
        ? [...acc, each]
        : [...acc];
    }, []);
    this.setState({ filteredTags: filtered });
  }

  handleClick(e) {
    const { getProductsByTags } = this.props;
    const { filteredTags } = this.state;
    console.log(e.target);
	getProductsByTags(e.target.label || filteredTags)
  }

  componentDidMount(){
  	setInterval(()=>{
  		this.setState({ loading: false })
  	}, 7000)
  }

  render() {
    const { input, filteredTags } = this.state;
    const { handleChange, handleClick } = this;
    const { tags, random } = this.props;
    console.log('Tags: ', tags, 'Filtered: ', filteredTags)

    return this.state.loading ? 
      (<div style={{ display: 'flex', 
      				justifyContent: 'center', 
      				padding: '30px'}}>
        <CircularProgress /> 
      </div>) :
      (<div>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
          {random.map((each, idx)=>{
          	return(
          	  <Chip
              key={idx}
              label={each}
              clickable={true}
              onClick={handleClick}
              color={idx%2=== 0 ? "secondary" : "primary"}
              style={{ margin: '5px'}}
            />
          	)
          })}
          </div>
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
            <IconButton
              onClick={handleClick}
              component={Link}
              to="/home/search"
            >
              <Icon>search_icon</Icon>
            </IconButton>
          </Toolbar>
          {/*<Typography align="center" variant="body1">
            Please be advised that tags have to begin with a {'#hash'}!
          </Typography>*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  const tags = products.reduce((acc, curr) => {
    return curr.tags ? [...acc, ...curr.tags] : [...acc];
  }, []);
  const random = Array(5).fill('').map(curr=>{
	return tags[Math.floor(Math.random()*tags.length)]
  });
  return { tags, random };
};

const mapDispatchToProps = dispatch => ({
  getProductsByTags: tags => dispatch(getProductsByTags(tags)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
