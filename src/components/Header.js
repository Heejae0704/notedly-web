import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import ButtonAsLink from './ButtonAsLink';

// 로컬 쿼리
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = props => {
  // 로그인 상태인 사용자에 대해 훅 쿼리
  const { data, client } = useQuery(IS_LOGGED_IN);
  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      {/* 로그인 중이며 로그아웃 링크, 로그아웃 상태면 로그인 링크로 */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              // 토큰 제거
              localStorage.removeItem('token');
              // 애플리케이션 캐시 삭제
              client.resetStore();
              // 로컬 상태 업데이트
              client.writeData({ data: { isLoggedIn: false } });
              // 사용자 홈페이지로 리디렉션
              props.history.push('/');
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
