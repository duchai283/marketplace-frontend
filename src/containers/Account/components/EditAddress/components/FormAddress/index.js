import React, { useState, useEffect } from 'react';
import './styles.scss';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { massageErrorForm } from 'src/global-constant';
import { showError } from 'src/utils/notification';
import { mapAddressObject } from 'src/utils/map';
import { addUserAddress } from 'src/containers/Home/actions';

const {
  requiredMessage,
  invalidPhoneNumber,
  minLengthPhoneNumber
} = massageErrorForm;

const DEFAULT_MAX_LENGTH = 255;

const AddressSchema = Yup.object().shape({
  fullname: Yup.string().required(requiredMessage),
  phone: Yup.string()
    .matches(/^[0-9]*$/, invalidPhoneNumber)
    .min(10, minLengthPhoneNumber)
    .max(DEFAULT_MAX_LENGTH)
    .required(requiredMessage),
  address: Yup.string().required(requiredMessage),
  city: Yup.string().required(requiredMessage),
  district: Yup.string().required(requiredMessage),
  ward: Yup.string().required(requiredMessage)
});

const FormAddress = ({ setIsAddNewAddress, city, dispatch }) => {
  const [label, setLabel] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      setDistrict(null);
      setWard(null);
      const citySelect = JSON.parse(selectedCity);
      const fetchDistrict = async () => {
        const url = `http://localhost:443/api/v1/customers/district?idCity=${citySelect.id}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          setDistrict(data);
        } catch (error) {
          showError(error.errors.message);
        }
      };

      fetchDistrict();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtSelect = JSON.parse(selectedDistrict);
      const fetchWard = async () => {
        const url = `http://localhost:443/api/v1/customers/ward?idDistrict=${districtSelect.id}`;
        try {
          const res = await fetch(url, { method: 'GET' });
          const data = await res.json();
          setWard(data);
        } catch (error) {
          showError(error.errors.message);
        }
      };

      fetchWard();
    }
  }, [selectedDistrict]);

  const handleCancel = () => {
    setIsAddNewAddress(false);
  };
  return (
    <Formik
      initialValues={{
        fullname: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: ''
      }}
      validationSchema={AddressSchema}
      onSubmit={(values, { resetForm }) => {
        if (!label) {
          return showError('Vui lòng chọn nhãn cho địa chỉ này');
        }
        const addressPayload = mapAddressObject(values, label);
        dispatch(addUserAddress(addressPayload));
        resetForm();
        handleCancel();
      }}
    >
      {({ touched, errors, values, handleChange, handleSubmit }) => {
        setSelectedCity(values.city);
        setSelectedDistrict(values.district);
        return (
          <form>
            <h1 className="ld-account-page--title">Add New Address</h1>
            <div className="form-address-wrap">
              <div className="form-address-left">
                <div className="block-title">Thông Tin Liên Lạc</div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Tên</span>
                  </div>
                  <div className="form--input">
                    <input
                      type="text"
                      placeholder="Họ Tên"
                      onChange={handleChange('fullname')}
                      name="fullname"
                      value={values.fullname}
                    />
                    {errors.fullname && touched.fullname && (
                      <div className="error">Họ tên không được để trống</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Số điện thoại</span>
                  </div>
                  <div className="form--input">
                    <input
                      type="text"
                      placeholder="Xin vui lòng điền số điện thoại của bạn"
                      onChange={handleChange('phone')}
                      name="phone"
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && (
                      <div className="error">{errors.phone}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-address-right">
                <div className="block-title">Thông Tin Địa Chỉ</div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Địa chỉ nhận hàng</span>
                  </div>
                  <div className="form--input">
                    <input
                      type="text"
                      placeholder="Vui Lòng nhập địa chỉ của bạn"
                      onChange={handleChange('address')}
                      name="address"
                      value={values.address}
                    />
                    {errors.address && touched.address && (
                      <div className="error">Địa chỉ không được để trống</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Tỉnh/ Thành phố</span>
                  </div>
                  <div className="form--input">
                    <select
                      name="city"
                      value={values.city}
                      onChange={handleChange('city')}
                    >
                      <option value="" disabled selected hidden>
                        vui lòng chọn tỉnh/ thành phố
                      </option>
                      {city &&
                        city.map(item => (
                          <option
                            value={`{"id":"${item.ID}","title":"${item.Title}"}`}
                          >
                            {item.Title}
                          </option>
                        ))}
                    </select>
                    {errors.city && touched.city && (
                      <div className="error">Vui lòng chọn tỉnh/ thành phố</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Quận/ Huyện</span>
                  </div>
                  <div className="form--input">
                    <select
                      name="district"
                      className={district ? '' : 'disable'}
                      value={values.district}
                      onChange={handleChange('district')}
                      disabled={!!!district}
                    >
                      <option value="" disabled selected hidden>
                        Vui lòng chọn quận/ huyện
                      </option>
                      {district &&
                        district.map(item => (
                          <option
                            value={`{"id":"${item.ID}","title":"${item.Title}"}`}
                          >
                            {item.Title}
                          </option>
                        ))}
                    </select>
                    {errors.district && touched.district && (
                      <div className="error">Vui lòng chọn quận/ huyện</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label">
                    <span>Phường/ Xã</span>
                  </div>
                  <div className="form--input">
                    <select
                      name="ward"
                      className={ward ? '' : 'disable'}
                      value={values.ward}
                      onChange={handleChange('ward')}
                      disabled={!!!ward}
                    >
                      <option value="" disabled selected hidden>
                        Vui lòng chọn phường/ xã
                      </option>
                      {ward &&
                        ward.map(item => (
                          <option
                            value={`{"id":"${item.ID}","title":"${item.Title}"}`}
                          >
                            {item.Title}
                          </option>
                        ))}
                    </select>
                    {errors.ward && touched.ward && (
                      <div className="error">Vui lòng chọn phường/ xã</div>
                    )}
                  </div>

                  <div className="address-ta">
                    <p className="address-tag-title">
                      Lựa chọn tên cho địa chỉ thường dùng:
                    </p>
                    <div className="address-tag-content">
                      <div
                        className={`address-tag-item office ${
                          label === 'office' ? 'office-active' : ''
                        }`}
                        onClick={() => setLabel('office')}
                      >
                        <span>
                          <i
                            class={`fa fa-building icon icon-office ${
                              label === 'office' ? 'office-active' : ''
                            }`}
                          ></i>
                        </span>
                        Văn Phòng
                      </div>
                      <div
                        className={`address-tag-item home ${
                          label === 'home' ? 'home-active' : ''
                        }`}
                        onClick={() => setLabel('home')}
                      >
                        <span>
                          <i
                            class={`fa fa-home icon icon-home ${
                              label === 'home' ? 'home-active' : ''
                            }`}
                          ></i>
                        </span>
                        Nhà Riêng
                      </div>
                    </div>
                  </div>

                  <div className="form-cta">
                    <button
                      className="address-btn btn-primary"
                      onClick={handleCancel}
                    >
                      Huỷ
                    </button>
                    <button
                      className="address-btn btn-secondary"
                      onClick={handleSubmit}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
export default FormAddress;
