import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { get } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { config } from 'src/global-config';
import { formatMoney } from 'src/utils/helper';
import './styles.scss';
import { showCancelOrderModal } from 'src/containers/Modal/actions';
import { mapStateToLabel } from 'src/utils/helper';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const items = get(order, 'total.items', []);
  const shipping = get(order, 'shipping', {});
  const history = useHistory();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/order-details?id=${id}`
        );
        const data = await res.json();
        setOrder(data.data);
        console.log('fetchOrderDetails', data);
      } catch (error) {}
    };
    fetchOrderDetails();
  }, [id]);

  const handleCancel = () => {
    dispatch(showCancelOrderModal({ id }));
  };

  const handleClickTrackOrder = () => {
    history.push(`/track-and-trace/track/${order._id}`);
  };
  return (
    <div className="accountComponent">
      {/* <h1 className="ld-account-page--title">Order Details</h1> */}
      {order && (
        <div className="account_order_wrap">
          <div className="order-dt__head">
            <div className="order-dt__number">Order # {order._id} </div>
            <div className="order-dt__status">
              {order.state === 'order_accepted' && (
                <div className="order-dt__cancel" onClick={handleCancel}>
                  Cancel
                </div>
              )}

              <div className={`order-status ${order.state}`}>
                {mapStateToLabel(order.state)}
              </div>
              <div className="order-dt__track" onClick={handleClickTrackOrder}>
                Track Order
              </div>
            </div>
          </div>
          <div className="order-dt__date">
            {moment(order.created_at).format('L')}
          </div>
          <div className="oder-dt__table">
            <div className="order-dt__text">Items Ordered</div>
            <div className="account_order_wrap">
              <div className="edit_address_wrap">
                <table className="table" style={{ minWidth: 800 }}>
                  <tbody>
                    <tr>
                      <th className="table-header first">
                        <div>Tên sản phẩm</div>
                      </th>
                      <th className="table-header first">
                        <div>Giá</div>
                      </th>
                      <th className="table-header first">
                        <div>Số lượng</div>
                      </th>
                      <th className="table-header first">
                        <div>Tổng tiền</div>
                      </th>
                    </tr>
                  </tbody>
                  <tbody>
                    {items.length !== 0 &&
                      items.map(item => (
                        <tr className="">
                          <td className="table-cell">
                            <div>{item.product.title}</div>
                          </td>
                          <td className="table-cell">
                            <div>
                              {formatMoney(
                                item.product.final_price
                                  ? item.product.final_price
                                  : item.product.price
                              )}
                            </div>
                          </td>
                          <td className="table-cell">
                            <div>{item.qty}</div>
                          </td>
                          <td className="table-cell">
                            <div style={{ fontWeight: 600, fontSize: 16 }}>
                              {formatMoney(item.totalAmount)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td className="table-cell" colSpan={3} align="right">
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                          Tổng Tiền
                        </div>
                      </td>
                      <td className="table-cell">
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                          {formatMoney(get(order, 'total.totalAmount'))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                borderBottom: '1px solid #ccc',
                padding: '15px 0',
                fontWeight: 'bold',
                fontSize: 22,
                marginTop: 30
              }}
            >
              Order Information
            </div>
            <div style={{ lineHeight: 2 }}>
              <div>{shipping.fullname}</div>
              <div>
                {order.shipping.city} - {order.shipping.district} -{' '}
                {order.shipping.ward}
              </div>
              <div>{shipping.phone}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
