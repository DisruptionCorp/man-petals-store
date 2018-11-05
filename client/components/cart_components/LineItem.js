import React from 'react';
import { Typography, Icon, Button } from '@material-ui/core'

const LineItem = ({ item, orderId, handleDelete, cost }) => {
  console.log('LineItem is: ', item.cost, cost);
  return (
  	<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="subheading" key={item.id}>
      {item.product.name} x {item.quantity}
    </Typography>
    <div style={{ display: 'flex'}}>
    <Typography variant="subheading">{Number.parseFloat(cost).toFixed(2)}{' '}</Typography>
    <Button onClick={handleDelete}><Icon>delete_icon</Icon></Button>
    </div>
    </div>
  );
};

export default LineItem;
