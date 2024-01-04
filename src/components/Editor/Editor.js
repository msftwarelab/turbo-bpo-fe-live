import React from 'react';
import { func, string } from 'prop-types';
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  ContentState,
  Entity,
  convertFromHTML,
} from 'draft-js';
import isEmpty from 'lodash/isEmpty';
import { stateToHTML } from 'draft-js-export-html';
import BlockStyleControls from './components/BlockStyleControls';
import InlineStyleControls from './components/InlineStyleControls';
import Link from './components/Link';
import 'draft-js/dist/Draft.css';
import { StyledEditor } from './styles';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
  }, callback);
};

class Editor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (
      !isEmpty(nextProps.value) &&
      !prevState.isLoadOnce &&
      nextProps.isEdit
    ) {
      const decorator = new CompositeDecorator([
        {
          strategy: findLinkEntities,
          component: Link,
        },
      ]);
      const blocksFromHTML = convertFromHTML(nextProps.value);
      if (blocksFromHTML.contentBlocks) {
        const state = ContentState.createFromBlockArray(blocksFromHTML);
        return {
          editorState: EditorState.createWithContent(state, decorator),
          isLoadOnce: true,
        };
      }
      return { editorState: EditorState.createEmpty(), isLoadOnce: true };
    }
    return {};
  };

  handleChange = editorState => {
    const { onChange } = this.props;
    this.setState({ editorState });
    const content = editorState.getCurrentContent();
    onChange(stateToHTML(content));
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = e => {
    const { editorState } = this.state;
    const maxDepth = 4;
    this.handleChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  getBlockStyle = block => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  };

  render() {
    const { editorState } = this.state;
    const { placeholder } = this.props;

    return (
      <StyledEditor>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <DraftEditor
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.onTab}
            placeholder={placeholder}
            spellCheck
          />
        </div>
      </StyledEditor>
    );
  }
}

Editor.propTypes = {
  onChange: func,
  placeholder: string,
};

Editor.defaultProps = {
  onChange: e => e,
  placeholder: 'Tell a story...',
};

export default Editor;
