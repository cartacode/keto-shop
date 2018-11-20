import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { init, getProducts, filter } from '../../sagas/testSaga/saga';
import * as actions from '../../sagas/testSaga/actions';
import { bindActionCreators } from "redux";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProductTests();
  }

  render () {
    const { classes, products } = this.props;
    console.log('this.props: ', this.props);

    let showTbody = [];
    if (products) {
      showTbody = products.map((row,idx) => {
        return (
          <TableRow className={classes.row} key={idx}>
            <CustomTableCell>{row.name}</CustomTableCell>
            <CustomTableCell>{row.price}</CustomTableCell>
            <CustomTableCell>{row.category}</CustomTableCell>
            <CustomTableCell>{row.img}</CustomTableCell>
            <CustomTableCell>
              <button onClick={() => {}}>Delete</button>
            </CustomTableCell>
          </TableRow>
        );
      })
    }
    
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.row}>
              <CustomTableCell>Title</CustomTableCell>
              <CustomTableCell>Price</CustomTableCell>
              <CustomTableCell>Category</CustomTableCell>
              <CustomTableCell>img</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          {
            products 
              ? (
                  <TableBody>
                    { showTbody }
                  </TableBody>
                )
              : (<TableBody><TableRow></TableRow></TableBody>)
          }
        </Table>
      </Paper>
    );
  } 
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = state => {
  return {
    products: state.testSaga.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductTests: () => dispatch({ type: actions.PRODUCTS }),
    filter: (filterPrice) => dispatch({ type: actions.FILTER, price: filterPrice }),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withStyles(styles)(Admin));