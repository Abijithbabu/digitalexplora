import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AllUsers from "./AllUsers";
import PaidUsers from "./PaidUsers";
import PendingUsers from "./PendingUsers";
import RefundUsers from "./RefundUsers";

function PayoutPage() {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h3 className="text-center text-xl font-bold mb-6">Payouts</h3>

      <div className="p-8">
        <Tabs>
          <TabList className="mb-6 flex cursor-pointer">
            <Tab>All</Tab>
            <Tab>Paid</Tab>
            <Tab>Pending</Tab>
            <Tab>Refund</Tab>
          </TabList>

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
        </Tabs>
      </div>
    </div>
  );
}

export default PayoutPage;
