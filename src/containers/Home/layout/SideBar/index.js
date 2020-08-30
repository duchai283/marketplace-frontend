import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategory } from '../../selectors';
import { loadCategory } from '../../actions';
import { config } from 'src/global-config';

const SideBar = ({ dispatch, category }) => {
  const [showSub, setShowSub] = useState(false);
  const [cat, setCat] = useState(null);
  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    dispatch(loadCategory());
  }, [dispatch]);

  useEffect(() => {
    if (cat) {
      const fetchSubMenu = async () => {
        try {
          const res = await fetch(
            `${config.apiUrl}/products/sub-by-category?id=${cat._id}`
          );
          const data = await res.json();
          setSubMenu(data.data);
        } catch (err) {}
      };
      fetchSubMenu();
    }
  }, [cat]);

  const handleShowSubMenu = menu => {
    setCat(menu);
    setShowSub(true);
  };
  const handleHideSubMenu = () => {
    setCat(null);
    setShowSub(false);
  };
  return (
    <div className="side_wrap">
      <div className="side__menu">
        {category.map(menu => (
          <Link
            className="menu"
            key={menu._id}
            to={`/products/${menu._id}`}
            onMouseEnter={() => handleShowSubMenu(menu)}
          >
            {menu.category_name}
          </Link>
        ))}
        {showSub && (
          <div className="sub_menu" onMouseLeave={() => handleHideSubMenu()}>
            <h3>{cat.category_name}</h3>
            {subMenu.length !== 0 &&
              subMenu.map(sub => (
                <Link
                  className="submenu"
                  key={sub._id}
                  to={`/products-sub/${sub._id}`}
                >
                  {sub.subcategory_name}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
