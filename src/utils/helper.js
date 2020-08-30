export const formatMoney = money => {
  if (!money) {
    return '0 đ';
  }
  return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

// export const mapStateToLabel = state => {
//   console.log('state');
//   if (state === 'order_accepted') {
//     return 'Accepted';
//   }
//   if (state === 'order_cancelled') {
//     return 'Canceled';
//   }
//   if (state === 'order_completed') {
//     return 'Completed';
//   }
//   if (state === 'order_progressing') {
//     return 'Progressing';
//   }
// };

export const mapStateToLabel = state => {
  if (state === 'order_accepted') {
    return 'Accepted';
  }
  if (state === 'order_cancelled') {
    return 'Canceled';
  }
  if (state === 'order_completed') {
    return 'Completed';
  }
  if (state === 'order_fulfilled') {
    return 'Being Fulfilled';
  }
  if (state === 'order_delivery') {
    return 'Delivery';
  }
};

export const mapStateToLabelHistory = state => {
  if (state === 'order_accepted') {
    return 'Order Accepted';
  }
  if (state === 'order_fulfilled') {
    return 'Order being fulfilled';
  }
  if (state === 'order_delivery') {
    return 'Order is delivering now';
  }
  if (state === 'order_cancelled') {
    return 'Order cancelled';
  }
  if (state === 'order_completed') {
    return 'Order completed';
  }
};
