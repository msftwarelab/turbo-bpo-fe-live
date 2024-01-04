import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';

export const StyledSidebar = styled(Menu)`
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      padding: 15px 0 15px  15px;
      border-bottom: 1px solid #7f7f7f6e;

      &:hover {
        background:#7f7f7f6e;
      }
      &:last-child {
        border: 0;
      }
      a {
        color: #fff;
        font-size: 1rem;
        display:block;
        text-decoration: none;
        .title {
          padding-left: 0.3125rem;
          display: inline-block;
        }
      }
    }
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }
  .bm-menu {
    background: #373a47;
    font-size: 1.15em;
  }
  .bm-item-list {
    color: #b8b7ad;
  }
  .bm-item {
    outline: none;
    display: inline-block;
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;
