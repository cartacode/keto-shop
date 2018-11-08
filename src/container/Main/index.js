import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductItem from '../../components/ProductItem';


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


class MainPage extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const { classes, data } = this.props;

  	const showProducts = data.map((item, key) => {
  	  return (
  	    <Grid item xs={4} key={key}>
  	      <ProductItem className={classes.paper} data={item}></ProductItem>
  	    </Grid>
  	  )
  	})

    return (
    	<Grid container spacing={16}>
        { showProducts }
      </Grid>
    )
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};


export default withStyles(styles)(MainPage);
