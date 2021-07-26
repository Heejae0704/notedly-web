import * as React from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
  React.useEffect(() => {
    //문서 제목 업데이트
    document.title = 'My Notes - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;
  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    return <p> No notes yet</p>;
  }
};

export default MyNotes;