import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { init, getProducts, filter } from '../sagas/testSaga/saga';
import * as actions from '../sagas/testSaga/actions';
import { bindActionCreators } from "redux";

import MainPage from './Main';
import Sidebar from './Sidebar';

const publicURL = process.env.PUBLIC_URL;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    maxWidth: '1250px',
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bannerImg: {
    background: "url(/images/banner-ppl.png) no-repeat center",
    height: 150,
    backgroundSize: 'cover',
  },
});


class HomePage extends React.Component {
	constructor(props) {
		super(props);

    this._onFilter = this._onFilter.bind(this);
	}

  componentWillMount() {
    this.props.getProductTests();
  }

  _onFilter() {
    console.log('filter change', this.props)
    this.props.filter();
  }

  render() {
  	const { classes, getProducts, testSaga } = this.props;
    console.log('Data: ', this.props);

    return (
    	<div className={classes.root}>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={12} className={classes.bannerImg}>
          </Grid>
          <Grid item xs={3}>
            <Sidebar onFilter={this._onFilter}></Sidebar>
          </Grid>
          <Grid item xs={9}>
            <MainPage data={testSaga.products}></MainPage>
	        </Grid>
    		</Grid>
    	</div>
    );
  }
}

const mapStatetoProps = state => {
  console.log('state: ', state)
  return {
    testSaga: state.testSaga
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductTests: () => dispatch({ type: actions.GET_PODUCTS }),
    filter: () => dispatch({ type: actions.FILTER }),
  }
}


// const mapDispatchToProps = dispatch => {
//   return Object.assign(
//     { dispatch: dispatch },
//     bindActionCreators({getProducts}, dispatch)
//   );
// }

export default connect(mapStatetoProps, mapDispatchToProps)(withStyles(styles)(HomePage));
