import React from 'react';
import { bool, string, func } from 'prop-types';

class StyleButton extends React.Component {
  onToggle = e => {
    const { style, onToggle } = this.props;
    e.preventDefault();
    onToggle(style);
  };

  render() {
    const { active, label } = this.props;
    let className = 'RichEditor-styleButton';
    if (active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        role="button"
        tabIndex={0}
      >
        {label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  active: bool,
  label: string,
  style: string,
  onToggle: func,
};

StyleButton.defaultProps = {
  active: false,
  label: null,
  style: null,
  onToggle: e => e,
};

export default StyleButton;
