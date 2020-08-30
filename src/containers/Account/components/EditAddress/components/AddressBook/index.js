import React from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'src/containers/Home/selectors';
import { connect } from 'react-redux';

const AddressBook = ({ setIsAddNewAddress, isAddNewAddress, currentUser }) => {
  const handleAddAddress = () => {
    setIsAddNewAddress(!isAddNewAddress);
  };

  console.log('currentUser', currentUser);
  return (
    <>
      <h1 className="ld-account-page--title">Address Book</h1>
      <div className="edit_address_wrap">
        <table className="table">
          <tbody>
            <tr>
              <th className="table-header first">
                <div>Tên</div>
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
                <div></div>
              </th>
            </tr>
          </tbody>
          <tbody>
            {currentUser &&
              currentUser.address.length > 0 &&
              currentUser.address.map(item => (
                <tr className="table-row">
                  <td className="table-cell">
                    <div>{item.fullname}</div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <span
                        className={`tag ${
                          item.label === 'home' ? 'tag-home' : 'tag-office'
                        }`}
                      >
                        {item.label === 'home' ? 'NHÀ RIÊNG' : 'VĂN PHÒNG'}
                      </span>
                      {item.address}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      {item.city} - {item.district} - {item.ward}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>{item.phone}</div>
                  </td>
                  <td className="table-cell cta">
                    <Link to="/">edit</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="btn-wrap">
          <button className="btnAddAddress" onClick={handleAddAddress}>
            + Add new Address
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser()
});

export default connect(mapStateToProps)(AddressBook);
