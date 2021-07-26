import * as React from 'react';
import { useQuery, gql } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import { GET_NOTES } from '../gql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {`${error}`}</p>;
  if (data.noteFeed.notes.length === 0) return <p>There is no notes yet.</p>;
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        // onClick은 현재 커서를 변수로 전달하며 쿼리를 수행
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // 새 결과를 기존 결과와 통합
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    _typename: 'noteFeed'
                  }
                };
              }
            });
          }}
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
