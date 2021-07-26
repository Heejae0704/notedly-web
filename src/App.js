// index.js
// This is the main entry point of our application

import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// API URI 및 캐시 설정
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// 글로벌 스타일 임포트
import GlobalStyle from './components/GlobalStyle';
import Pages from '/pages';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// 아폴로 클라이언트 설정
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const App = () => {
  // 로컬 토큰 확인
  const data = {
    isLoggedIn: !!localStorage.getItem('token')
  };

  // 초기 로드에 캐시 데이터 쓰기
  cache.writeData({ data });

  // 캐시 초기화 후 캐시 데이터 쓰기
  client.onResetStore(() => cache.writeData({ data }));

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
