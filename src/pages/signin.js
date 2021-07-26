import * as React from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  React.useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  // 뮤테이션 훅
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      //JWT를 local storage에 저장
      localStorage.setItem('token', data.signIn);
      // 로컬 캐시 업데이트
      client.writeData({ data: { isLoggedIn: true } });
      // pages index.js에서 redirection 시에 경로 저장했고 여기서 활용
      props.history.push(
        props.location.state ? props.location.state.from : '/'
      );
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {/* 데이터 로딩 중이면 로딩 메시지 표시 */}
      {loading && <p>Loading...</p>}
      {/* 에러가 있으면 에러 메시지 표시 */}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
