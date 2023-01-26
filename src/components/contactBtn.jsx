import React, { Component } from "react";

class ContactBtn extends Component {
  render() {
    const {
      onMouseDown,
      onMouseEnter,
      extraClassName,
      onMouseLeave,
    } = this.props;
    return (
      <div
        className={`btn btn-contact ${extraClassName}`}
        onMouseDown={() => onMouseDown()}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => window.open('https://www.linkedin.com/in/lucas01-song/', '_blank')}
      > Contact! </div>
    );
  }
}

export default ContactBtn;
