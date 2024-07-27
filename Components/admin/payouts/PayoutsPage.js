import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllUsers from "./AllUsers";
import PaidUsers from "./PaidUsers";
import PendingUsers from "./PendingUsers";
import RefundUsers from "./RefundUsers";

function PayoutsPage() {
  return (
    <>
      <Tabs>
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Payouts</h3>

          <div className="flex ml-auto">
            <TabList className="mb-0">
              <Tab>All</Tab>
              <Tab>Paid</Tab>
              <Tab>Pending</Tab>
              <Tab>Refund</Tab>
            </TabList>
          </div>
        </div>

        <div className="payouts">
          {/* All users */}
          <TabPanel>
            <AllUsers />
          </TabPanel>

          {/* paid users */}
          <TabPanel>
            <PaidUsers />
          </TabPanel>

          {/* Pending users */}
          <TabPanel>
            <PendingUsers />
          </TabPanel>

          {/* Refund users */}
          <TabPanel>
            <RefundUsers />
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
}

export default PayoutsPage;
