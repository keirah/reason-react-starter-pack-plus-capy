/* This is the basic component. */
let component = ReasonReact.statelessComponent("App");

[%bs.raw "require('./app.scss')"];

/* Your familiar handleClick from ReactJS. This mandatorily takes the payload,
   then the `self` record, which contains state (none here), `handle`, `reduce`
   and other utilities */
let handleClick = (_event, _self) => Js.log("hey buddy!");

[@bs.module] external capy : string = "./joejoe-capybara.jpg";

/* `make` is the function that mandatorily takes `children` (if you want to use
   `JSX). `message` is a named argument, which simulates ReactJS props. Usage:

   `<Page message="hello" />`

   Which desugars to

   `ReasonReact.element(Page.make(~message="hello", [||]))` */
let make = (~message, _children) => {
  ...component,
  render: self =>
    <div className="app">
      <div className="appContainer">
        <h1 className="appHeader">
          (ReasonReact.stringToElement("Hey Buddy"))
        </h1>
        <div className="buddyBox">
          <img src=capy className="App-capy" alt="capybara" />
          <div className="appButton" onClick=(self.handle(handleClick))>
            (ReasonReact.stringToElement(message))
          </div>
        </div>
      </div>
    </div>
};
