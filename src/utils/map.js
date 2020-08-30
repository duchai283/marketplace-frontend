export const mapAddressObject = (values, label) => ({
  address: values.address,
  fullname: values.fullname,
  phone: values.phone,
  label: label,
  city: JSON.parse(values.city).title,
  ward: JSON.parse(values.ward).title,
  district: JSON.parse(values.district).title
});
