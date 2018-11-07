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
  }

  render() {
    const { classes, data } = this.props;

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
              image={"/images/" + data.img}
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

export default withStyles(styles)(ProductItem);