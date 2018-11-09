import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import * as actions from '../../sagas/testSaga/actions';
import { bindActionCreators } from "redux";
import Header from '../../components/Header';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cart: {
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: '50px',
      background: 'white',
      borderRadius: '3px',
      marginTop: '10px',
      paddingBottom: '80px',
    }
  },
  subcart: {
    
  },
  cartitems: {
    padding: '30px',
    borderBottom: '1px solid #ccc',
    width: '500px',
  },
  carttext: {
    width: '250px',
    float: 'left',
  },
  cartimg: {
    width: '100px',
    border: '1px solid #ccc',
    float: 'right',
  },
  total: {
    margin: '20px 0',
  }
});


class CartPage extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      cartTotal: 1,
      success: false,
    }
	}

  render() {
  	const { classes, cartItems } = this.props;
    const { cartTotal, success } = this.state;
    let showCartItems = [];

    if (cartItems) {
      showCartItems = cartItems.map((item) => {
        return (
          <div className={classes.cartitems}>
            <div className={classes.carttext}>
              <h4>{ item.name }</h4>
              <p>${item.price} x 2</p>
              <p>Total for this item: <strong>${item.price} x 2</strong></p>
            </div>
            <img className={classes.cartimg} src={"/images/" + item.img} alt="Image" />
          </div>
        );
      });
    }

    return (
      <div>
        <Header />
      	<div className={"capsule " + classes.cart}>
          { 
            cartTotal > 0 ?
              (
                <div className={classes.subcart}>
                  <h1>Cart</h1>
                  { showCartItems }
                  <div className={classes.total}>
                    <h3>Total: {showCartItems.length}</h3>
                  </div>
                </div>
              )
            : cartTotal === 0 && success === false 
                ? (
                    <div className={classes.empty}>
                      <h1>Cart</h1>
                      <h3>Your cart is empty.</h3>
                      <a href="#"><button>Fill er up!</button></a>
                    </div>
                  )

                : (
                    <div>
                      <h2>Success!</h2>
                      <p>Your order has been processed, it will be delivered shortly.</p>
                    </div>
                  )            
          }
        </div>
      </div>
    )
  }
}

CartPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = state => {
  return {
    cartItems: state.testSaga.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withStyles(styles)(CartPage));
