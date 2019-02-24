import React, { Component } from "react";
import classNames from "classnames";
import { uniqueId } from "lodash";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
import _ from "lodash";
import Router, { withRouter } from "next/router";

type State = {};

type Props = {
  items: MenuItem[];
  currentLevel: number;
  currentItem: MenuItem;
  previousItem: MenuItem;
  onMenuItemClick: (event: Event, menuItem: MenuItem) => void;
  onBackButtonClick: (event: Event) => void;
};

class AppMenu extends Component<Props, State> {
  // recursivelly sets active menu based on current url
  setActiveMenu(urlPath: string, items: MenuItem[]) {
    // for (var i = 0; i < items.length; i++) {
    //   if (items[i].url === urlPath) {
    //     items[i].active = true;
    //   } else if (items[i].url != "/" && urlPath.startsWith(items[i].url)) {
    //     items[i].active = true;
    //   }
    //   if (_.isArray(items[i].children)) {
    //     this.setActiveMenu(urlPath, items[i].children);
    //   }
    // }
  }

  componentDidMount() {
    this.setActiveMenu(Router.pathname, this.props.items);
  }

  ///
  ///
  ///

  renderBackButton = () => {
    return (
      <li className="block">
        <a
          className="no-underline block relative h-full w-full px-4 py-4 text-center text-dark-blue"
          onClick={() => this.props.onBackButtonClick(event)}
          href={this.props.previousItem.url}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="13"
            fill="none"
          >
            <path stroke="#275463" d="M36 6.5H1m0 0L5.59 1M1 6.5L5.59 12" />
          </svg>
          <span className="flex-1" id="back-text">
            back
          </span>
        </a>
      </li>
    );
  };

  renderMenuItemIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="none"
      >
        <path
          stroke="#275463"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M29.666 3H6.334A3.333 3.333 0 0 0 3 6.333v23.333A3.333 3.333 0 0 0 6.333 33h23.333A3.333 3.333 0 0 0 33 29.666V6.334A3.333 3.333 0 0 0 29.666 3zM27 23h6M15 23h6M3 23h6"
        />
      </svg>
    );
  };

  renderSubMenu = children => {
    if (children && children.length > 0) {
      const classnames = classNames(
        `menu-level-${
          children[0].level
        } menu-level flex flex-col list-reset absolute w-full pin-t`
      );
      return (
        <ul className={classnames}>
          {this.props.currentLevel > 0 && this.renderBackButton()}
          {this.renderMenuItems(children)}
        </ul>
      );
    }
  };

  renderMenuItems = (items: MenuItem[]) =>
    items.map((item, i) => {
      const { url, label, children } = item;
      const classnames = classNames("block", {
        "current active-item": item.active
      });
      return (
        <li className={classnames} key={uniqueId(`item-${i}-`)}>
          {/* <Link href={url} key={uniqueId(`link-${i}-`)}> */}
          <a
            className="menu__link no-underline block relative h-full w-full px-4 py-4 text-center text-dark-blue"
            onClick={() => this.props.onMenuItemClick(event, item)}
            href={item.url}
          >
            {this.renderMenuItemIcon()}
            <span className="flex-1 menu-item-title">
              {label}
              {item.active && <span>*</span>}
            </span>
          </a>
          {/* </Link> */}
          {this.renderSubMenu(children)}
        </li>
      );
    });

  render() {
    const { items } = this.props;
    console.log("AppMenu render");
    const style = {
      left: `${-100 * this.props.currentLevel}%`
    };
    return (
      <div className="sidebar-wrapper">
        <div className="logo flex items-center text-center">
          <a className="w-full no-underline p-2" href="/">
            LOGO
          </a>
        </div>
        <div id="menu" style={style}>
          <ul className="menu-level flex flex-col list-reset absolute w-full pin-t">
            {this.props.currentLevel > 0 && this.renderBackButton()}
            {this.renderMenuItems(this.props.items)}
          </ul>
        </div>
      </div>
    );
  }
}

export default AppMenu;
