/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql, FetchResult } from '@apollo/client';

export const SignUpMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: CreateUserInput!) {
      signUp(data: $data) {
        token
      }
    }
  `);
  return (data: {
    firstname: string;
    lastname: string;
    login: string;
    password: string;
  }): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> => eventName({ variables: { data } });
};

export const SignInMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: SignInInput!) {
      signIn(data: $data) {
        token
      }
    }
  `);
  return (data: {
    login: string;
    password: string;
  }): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> => eventName({ variables: { data } });
};
