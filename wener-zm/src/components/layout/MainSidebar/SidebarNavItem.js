import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

const SidebarNavItem = ({ item }) => {
  // let history = useLocation()
  // useEffect(() => {
  //   console.log(history.pathname);

  // }, [history]);


  return (
    <NavItem>
      <NavLink tag={RouteNavLink} to={item.to} >
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
    </NavItem>
  )
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
