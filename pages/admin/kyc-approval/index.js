import { IdentificationIcon } from "@heroicons/react/24/solid";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/Components/admin/AdminLayout";
import AllApprovals from "@/Components/admin/kyc-approval/AllApprovals";
import PendingApprovals from "@/Components/admin/kyc-approval/PendingApprovals";
import SuccessApprovals from "@/Components/admin/kyc-approval/SuccessApprovals";
import RejectedApprovals from "@/Components/admin/kyc-approval/RejectedApprovals";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function index() {
  return (
    <AdminLayout title="KYC Approval">
      <Tabs>
        <TabList className="mb-6 flex items-center">
          <Tab className="cursor-pointer py-2 px-4 font-semibold">
            <IdentificationIcon className="h-4 w-4 text-blue-400 mx-auto" />
            All
          </Tab>
          <Tab className="cursor-pointer py-2 px-4 font-semibold">
            <InformationCircleIcon className="h-4 w-4 text-yellow-400 mx-auto" />
            Pending
          </Tab>
          <Tab className="cursor-pointer py-2 px-4 font-semibold">
            <CheckCircleIcon className="h-4 w-4 text-green-400 mx-auto" />
            Approved
          </Tab>
          <Tab className="cursor-pointer py-2 px-4 font-semibold">
            <XCircleIcon className="h-4 w-4 text-red-400 mx-auto" />
            Rejected
          </Tab>
        </TabList>

        {/* All approvals */}
        <TabPanel>
          <h2 className="text-base font-semibold mb-5">All approvals</h2>
          <AllApprovals />
        </TabPanel>

        {/* Pending approvals */}
        <TabPanel>
          <h2 className="text-base font-semibold mb-5">Pending approvals</h2>
          <PendingApprovals />
        </TabPanel>

        {/* Success Approvals */}
        <TabPanel>
          <h2 className="text-base font-semibold mb-5">Success approvals</h2>
          <SuccessApprovals />
        </TabPanel>

        {/* Rejected approvals */}
        <TabPanel>
          <h2 className="text-base font-semibold mb-5">Rejected approvals</h2>
          <RejectedApprovals />
        </TabPanel>
      </Tabs>
    </AdminLayout>
  );
}

export default index;
