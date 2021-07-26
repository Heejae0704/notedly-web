import * as React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

// 컴포넌트 스타일
const Wrapper = styled.div`
  /* 스타일드 컴포넌트 내에 media 쿼리 스타일 적용 가능 */
  /* 700px 이상 스크린 레이아웃에만 적용 */
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
