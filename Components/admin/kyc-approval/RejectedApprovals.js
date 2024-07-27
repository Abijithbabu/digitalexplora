import Table from "../../Table";
import { useState } from "react";
import Modal from "../../Modal";
import KycDetails from "./KycDetails";
import Brokenpage from "../../Brokenpage";
import { approvalColumns } from "./Columns";
import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";
import { kycApprovalRequests } from "../../../config/requests";
import useFetchData from "../../../hooks/useFetchData";
import NetworkError from "../../NetworkError";

function RejectedApprovals() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [kyc, setKyc] = useState("");

  const userIdFetch = false;

  const { state, fetchData } = useFetchData(
    `${kycApprovalRequests.getRejected}${skip}/${limit}`,
    userIdFetch
  );

  const TOTAL_PAGES = Math.ceil(state?.data?.length / limit);

  const updateStatus = async (userId, status) => {
    const body = {
      status: status,
    };

    try {
      const res = await fetchWrapper.patch(
        `${BASE_URL}/user/${userId}/kyc`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        fetchData(
          `${kycApprovalRequests.getRejected}${skip}/${limit}`,
          userIdFetch
        );
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Modal open/close functions
  function closeModal() {
    setIsOpen(false);
    setKyc("");
  }

  function showKyc(kyc) {
    setIsOpen(true);
    setKyc(kyc);
  }

  const AllStatusColumns = approvalColumns(updateStatus, showKyc);

  return (
    <>
      {state?.error ? (
        <NetworkError error={state?.error} />
      ) : (
        <div>
          {state?.data ? (
            <>
              {state.data.length > 0 ? (
                <Table
                  DATA={state?.data}
                  COLUMNS={AllStatusColumns}
                  skip={skip}
                  limit={limit}
                  setSkip={setSkip}
                  setLimit={setLimit}
                  totalPages={TOTAL_PAGES}
                />
              ) : (
                "No data found"
              )}
            </>
          ) : (
            "Loading"
          )}

          <Modal
            modalTitle="KYC details"
            closeModal={closeModal}
            isOpen={isOpen}
          >
            {kyc ? (
              <>
                {Object.keys(kyc).length > 0 ? (
                  <div className="mt-4">
                    <KycDetails kyc={kyc} />
                  </div>
                ) : (
                  "No kyc data found"
                )}
              </>
            ) : (
              "Loading..."
            )}
          </Modal>
        </div>
      )}
    </>
  );
}

export default RejectedApprovals;
