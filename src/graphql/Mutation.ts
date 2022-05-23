/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql, FetchResult } from '@apollo/client';

export const CreateProductMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [productId] = useMutation(gql`
    mutation ($data: ShipGoodsToStockArgs!) {
      shipGoodsToStock(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    productId({ variables: { data } });
};

export const CreateShipmentMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [productId] = useMutation(gql`
    mutation ($data: ShipmentCreateInput!) {
      createOneShipment(data: $data) {
        id
      }
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    productId({ variables: { data } });
};

export const ApproveShipmentMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [response] = useMutation(gql`
    mutation ($productId: String!) {
      approveShipment(data: { productId: $productId })
    }
  `);
  return (productId: string): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    response({ variables: { productId } });
};

export const ApproveRequestMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [response] = useMutation(gql`
    mutation ($data: ApproveRequestArgs!) {
      approveRequest(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    response({ variables: { data } });
};

export const RequestProductMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [productId] = useMutation(gql`
    mutation ($data: RequestProductArgs!) {
      requestProductFromStock(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    productId({ variables: { data } });
};
