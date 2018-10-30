import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer'
import { Grid, 
         Paper, 
         Typography, 
         Button, 
         ButtonBase, 
         Icon } from '@material-ui/core'


class Product extends Component {
    render() {
        const { product, order, itemQuantity, handleInc, handleDec } = this.props
        const disable = product.quantity < 1;
        return (

                /*<h4>{product.name}</h4>
                Price: {product.price? `$${product.price}` : 'tbd'}<br/>
                {itemQuantity} units in cart<br/>
                <div className="product-buttons">
                    <button onClick={()=>handleInc(product,order)}> + </button>
                    <button onClick={()=>handleDec(product,order)} disabled={!itemQuantity}> - </button>
                </div>*/


        <Grid item xs={4} style={{ padding: '25px'}} >
          <Paper className="productContainer">
            <Typography variant='display1' >{product.name}</Typography>
            <Typography variant='body1'>Price: {product.price? `$${product.price}` : 'tbd'}</Typography>
            <Typography variant='body1'>{itemQuantity} units in cart</Typography>
            <div className="buttonContainer">
            <Button variant='fab' 
                    color='primary' 
                    style={{ margin: '2px'}}
                    onClick={()=>handleInc(product,order)}>
              <Icon>add</Icon>
            </Button>
            <Button disabled={disable}
                    variant='fab' 
                    color='secondary' 
                    style={{ margin: '2px'}}
                    onClick={()=>handleDec(product,order)}>
              <Icon>remove</Icon>
            </Button>
            </div>
        </Paper>
      </Grid>

        )
    }
}

const mapStateToProps = (state, { order, product }) => {
    let item = (order) ? order.Item.find(item => item.productId === product.id) : null
    return {
        order,
        product,
        itemQuantity: item ? item.quantity : 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInc: (product, order) => {
            dispatch(incrementLineItem(product, order))
        },
        handleDec: (product, order) => {
            dispatch(decrementLineItem(product, order))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
