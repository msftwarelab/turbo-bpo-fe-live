import React from 'react';
import { shape, func } from 'prop-types';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = props => {
  const { editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  onToggle: func,
  editorState: shape({}),
};

InlineStyleControls.defaultProps = {
  onToggle: e => e,
  editorState: {},
};

export default InlineStyleControls;
