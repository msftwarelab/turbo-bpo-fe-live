import React from 'react';
import { Entity } from 'draft-js';
import { shape } from 'prop-types';

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

const Link = ({ entityKey, children }) => {
  const { url } = Entity.get(entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {children}
    </a>
  );
};

Link.propTypes = {
  entityKey: shape({}),
  children: shape({}),
};

Link.defaultProps = {
  entityKey: {},
  children: {},
};

export default Link;
