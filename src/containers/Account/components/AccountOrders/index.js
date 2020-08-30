import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectOrders } from 'src/containers/Home/selectors';
import { getOrders } from 'src/containers/Home/actions';
import { formatMoney } from 'src/utils/helper';
import moment from 'moment';
import { mapStateToLabel } from 'src/utils/helper';
import { get } from 'lodash';

const AccountOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(makeSelectOrders());
  const history = useHistory();
  console.log('orders', orders);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleViewDetailsOrder = order => {
    history.push(`/customer/order-details/${order._id}`);
  };

  return (
    <div className="accountComponent">
      <h1 className="ld-account-page--title">My Orders</h1>
      {orders && orders.length === 0 ? (
        <h3>You don't have any order</h3>
      ) : (
        <div className="account_order_wrap">
          <div className="edit_address_wrap">
            <table className="table">
              <tbody>
                <tr>
                  <th className="table-header first">
                    <div>Ngày mua</div>
                  </th>
                  <th className="table-header first">
                    <div>Họ tên</div>
                  </th>
                  <th className="table-header first">
                    <div>Địa chỉ</div>
                  </th>
                  <th className="table-header first">
                    <div>Mã vùng</div>
                  </th>
                  <th className="table-header first">
                    <div>Số điện thoại</div>
                  </th>
                  <th className="table-header first">
                    <div>Tổng tiền</div>
                  </th>
                  <th className="table-header first">
                    <div>Trạng thái</div>
                  </th>
                </tr>
              </tbody>
              <tbody>
                {orders.length !== 0 &&
                  orders.map(order => (
                    <tr
                      className="table-row"
                      onClick={() => handleViewDetailsOrder(order)}
                    >
                      <td className="table-cell">
                        <div>{moment(order.created_at).format('L')}</div>
                      </td>
                      <td className="table-cell">
                        <div>{get(order, 'shipping.fullname', '')}</div>
                      </td>
                      <td className="table-cell">
                        <div>{get(order, 'shipping.address', '')}</div>
                      </td>
                      <td className="table-cell">
                        <div>
                          {get(order, 'shipping.city', '')} -{' '}
                          {get(order, 'shipping.district', '')} -{' '}
                          {get(order, 'shipping.ward', '')}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div>{get(order, 'shipping.phone', '')}</div>
                      </td>
                      <td className="table-cell">
                        <div>{formatMoney(order.total.totalAmount)}</div>
                      </td>
                      <td className="table-cell">
                        <div>
                          <span className={`order-status ${order.state}`}>
                            {mapStateToLabel(order.state)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOrders;
