import React from 'react';

const LineItem = ({ item, orderId, handleDelete }) => {
  console.log('LineItem is: ', item);
  return (
    <li key={item.id}>
      {item.product.name} x {item.quantity} @ {item.cost}{' '}
      <button onClick={handleDelete}> x </button>
    </li>
  );
};

export default LineItem;
