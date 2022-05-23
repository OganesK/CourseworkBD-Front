import * as React from 'react';
import ManufacturerTable from './Tables/ManufacturerTable';
import ProductTable from './Tables/ProductTable';
import ShipmentTable from './Tables/ShipmentTable';
import ShopTable from './Tables/ShopTable';
import DailyReportTable from './Tables/DailyReportTable';
import FirmOwnerTable from './Tables/FirmOwnerTable';
import NotApprovedShipmentsTable from './Tables/NotApprovedShipments';
import NotApprovedRequestsTable from './Tables/NotApprovedRequests';

const WareHouseTable = (props: { selectedIndex: number; selectedSection: string }) => {
  switch (props.selectedSection) {
    case 'Warehouse':
      return <ProductTable />;
    case 'Distributor':
      return <FirmOwnerTable />;
    case 'Shops':
      return <ShopTable />;
    case 'Shipments':
      return <ShipmentTable />;
    case 'Not approved shipments':
      return <NotApprovedShipmentsTable />;
    case 'Not approved requests':
      return <NotApprovedRequestsTable />;
    // case 'Daily report':
    //   return <DailyReportTable />;
  }

  return <h1>Please select the section</h1>;
};

export default WareHouseTable;
