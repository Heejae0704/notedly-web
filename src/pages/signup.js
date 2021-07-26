import * as React from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  React.useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  const client = useApolloClient();
  // 뮤테이션 훅
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      //JWT를 local storage에 저장
      localStorage.setItem('token', data.signUp);
      // 로컬 캐시 업데이트
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* 데이터 로딩 중이면 로딩 메시지 표시 */}
      {loading && <p>Loading...</p>}
      {/* 에러가 있으면 에러 메시지 표시 */}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
