import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
// import { init, getProducts, filter } from '../sagas/testSaga/saga';
import * as actions from '../../sagas/testSaga/actions';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  productTitle: {
    paddingTop: 15
  },
  addToCartButton: {
    borderRadius: 25,
    border: '1px solid #3f51b5',
    justifyContent: 'center',
    padding: '10px 25px',
  },
};


class ProductItem extends React.Component {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
  }

  addItem(data) {
    this.props.addItem(data);
    this.props.history.push('/cart');
  }

  render() {
    const { classes, data, addItem } = this.props;

    return (
      <Card className={classes.card}>
        <div>
          <Typography 
            gutterBottom={true} 
            variant="h5" 
            component="h2"
            className={classes.productTitle}
          >
            { data.name }
          </Typography>
          <CardMedia
            className={classes.media}
            image={ "/images/" + data.img }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { "$" + data.price }
            </Typography>
              <Button 
                size="small" 
                color="primary" 
                className={classes.addToCartButton}
                onClick={() => this.addItem(data) }
              >
                Add Item
              </Button>
          </CardContent>
        </div>
      </Card>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStatetoProps = state => {
  return {
    testSaga: state.testSaga
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (product) => dispatch({ type: actions.ADD_ITEM, product: product }),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(withStyles(styles)(ProductItem)));