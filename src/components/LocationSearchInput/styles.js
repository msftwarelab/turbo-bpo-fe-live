import styled from 'styled-components';

export const StyledContainer = styled.div`
    position:relative;
    .autocomplete-dropdown-container {
      border: ${props => props.suggestions.length > 0 ? ' 1px solid #799bd1' : ''};
      color: #495057;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
      position: absolute;
      z-index: 100;
      left: 0;
      right: 0;
      overflow-y: auto;
      max-height: 210px;
      padding-left: 0;
      background: #fff;
      span {
        box-sizing: border-box;
        padding:0 0 0 8px;
        display: inline-block;
        width: 100%;
        margin:0;
      }
    }
`;

export const StyledLoading = styled.div`
 padding:0 0 0 8px;
 z-index: 100;
`