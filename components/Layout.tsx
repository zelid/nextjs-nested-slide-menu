import React, { Component } from "react";
import classNames from "classnames";
import "~/assets/css/app.css";
import AppMenu from "./AppMenu";
import { MenuItem } from "./MenuItem";
import Router from "next/router";

type Props = {};

type State = {
  currentLevel: number;
  currentItem: MenuItem;
  previousItem: MenuItem;
  items: MenuItem[];
};

const getInitialState = (props: Props): State => {
  console.log("Layout getInitialState");
  return {
    currentLevel: 0,
    currentItem: { label: "Dashboard", url: "/", level: 0 },
    previousItem: { label: "Dashboard", url: "/", level: 0 },
    items: [
      { label: "Dashboard", url: "/", level: 0 },
      {
        label: "Level 0 a",
        url: "/level-0-a",
        level: 0,
        children: [
          {
            label: "Level 1 a.a",
            url: "/level-1-a.a",
            level: 1,
            children: [
              { label: "Level 2 a.a.a", url: "/level-2-a.a.a", level: 2 },
              { label: "Level 2 a.a.b", url: "/level-2-a.a.b", level: 2 },
              { label: "Level 2 a.a.c", url: "/level-2-a.a.c", level: 2 }
            ]
          }
        ]
      }
    ]
  };
};

class Layout extends Component<Props, State> {
  state = getInitialState(this.props);

  onBackButtonClick = (event: Event) => {
    console.log("onBackButtonClick");
    console.log("currentLevel before:");
    console.log(this.state.currentLevel);

    if (this.state.currentLevel > 0)
      this.setState({
        currentLevel: this.state.currentLevel - 1,
        currentItem: this.state.previousItem
      });

    console.log("currentLevel after:");
    console.log(this.state.currentLevel);

    // Router.back()
    // if (this.state.previousItem) Router.push(this.state.previousItem.url);
    event.preventDefault();
  };

onMenuItemClick = (event: Event, item: MenuItem) => {
  console.log("onMenuItemClick");
  console.log("currentLevel before:");
  console.log(this.state.currentLevel);

  if (item.children) {
    this.setState({
      currentLevel: item.level + 1,
      previousItem: this.state.currentItem,
      currentItem: item
    });
  }

  console.log("currentLevel after:");
  console.log(this.state.currentLevel);

  // if (item.url) Router.push(item.url);
  event.preventDefault();
};

  render() {
    return (
      <div id="wrapper" className="h-screen text-sm">
        <div
          id="sidebar"
          className="shadow-komibi sidebar sidebar-opened overflow-hidden"
        >
          <AppMenu
            onMenuItemClick={this.onMenuItemClick}
            onBackButtonClick={this.onBackButtonClick}
            currentLevel={this.state.currentLevel}
            currentItem={this.state.currentItem}
            previousItem={this.state.previousItem}
            items={this.state.items}
          />
        </div>
        <div id="content" className="content flex flex-col h-full">
          <header className="flex flex-0 items-center py-2 pr-2 justify-between">
            <ul className="text-sm list-reset flex">
              <li className="sidebar-toogler text-sm mt-1 ml-4 cursor-pointer">
                currentLevel: {this.state.currentLevel}
              </li>
              <li className="sidebar-toogler text-sm mt-1 ml-4 cursor-pointer">
                previousItem: {this.state.previousItem.label}
              </li>
              <li className="sidebar-toogler text-sm mt-1 ml-4 cursor-pointer">
                currentItem: {this.state.currentItem.label}
              </li>
            </ul>
            <ul className="text-sm text-white list-reset flex justify-end flex-grow">
              <li className="pl-2 border-l">
                <a className="inline-block py-2 px-3 no-underline" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </header>
          <div className="overflow-y-auto">
            <div className="relative">{this.props.children}</div>
          </div>
          <footer className="flex-0 bg-blue py-4 px-4 dev-hidden">
            Footer
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
