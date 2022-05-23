export interface ProductTypes {
  id: string;
  name: string;
  amount: number;
  unit: string;
  stockDate: string;
  expirationDate: string;
  manufacturer: {
    name: string;
  };
}

export interface ShopsTypes {
  id: string;
  name: string;
  owner: {
    firstname: string;
    lastname: string;
  };
}

export interface ManufacturersTypes {
  id: string;
  name: string;
  owner: {
    firstname: string;
    lastname: string;
  };
}

export interface ShipmentTypes {
  id: string;
  amount: number;
  expirationDate: string;
  name: string;
  manufacturer: {
    name: string;
  };
}

export interface RequestTypes {
  id: string;
  product: {
    id: string;
    name: string;
    expirationDate: string;
    manufacturer: {
      name: string;
    };
  };
  amount: number;
}
