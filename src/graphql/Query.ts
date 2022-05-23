import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      role
      firstname
      lastname
      email
      manufactures {
        id
        name
      }
      shops {
        id
        name
      }
    }
  }
`;

export const GET_NOT_APPROVED_PRODUCTS_QUERY = gql`
  query {
    getNotApprovedProduct {
      id
      name
      amount
      unit
      stockDate
      manufacturer {
        name
      }
      expirationDate
    }
  }
`;

export const GET_APPROVED_PRODUCTS_QUERY = gql`
  query {
    getApprovedProduct {
      id
      name
      amount
      unit
      stockDate
      manufacturer {
        name
      }
      expirationDate
    }
  }
`;

export const GET_SHOPS_QUERY = gql`
  query {
    shops {
      id
      name
      owner {
        firstname
        lastname
      }
    }
  }
`;

export const GET_MANUFACTURERS_QUERY = gql`
  query {
    getNotApprovedProduct {
      id
      name
      expirationDate
      manufacturer {
        name
      }
      amount
    }
  }
`;

export const GET_SHIPMENTS_QUERY = gql`
  query {
    getNotApprovedProduct {
      id
      name
      expirationDate
      manufacturer {
        name
      }
      amount
    }
  }
`;

export const GET_NOT_APPROVED_REQUESTS = gql`
  query {
    getNotApprovedRequests {
      id
      product {
        id
        name
        expirationDate
        manufacturer {
          name
        }
      }
      amount
    }
  }
`;

export const GET_DAILY_REPORT_QUERY = gql`
  query {
    getDailyReport {
      id
      product {
        name
      }
      createdAt
      count
      shop {
        name
      }
    }
  }
`;
