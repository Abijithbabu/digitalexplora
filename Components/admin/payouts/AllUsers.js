import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { payoutRequests } from "../../../config/requests";
import { fetchWrapper } from "../../../helpers";
import Table from "../../Table";
import { allStatusColumns } from "./Columns";
import Brokenpage from "../../Brokenpage";
import Modal from "../../Modal";
import { fetchKyc } from "../../../hooks/useKyc";
import KycDetails from "./KycDetails";

import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

import NoData from "../../NoData";
import TableFilter from "../table/TableFilter";

function AllUsers() {
  const { payouts, error, totalPayouts, loading, statusChange } = useSelector(
    (state) => state.payout
  );
  const { dateRange, referralValue, searchQuery } = useSelector(
    (state) => state.table
  );
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [kyc, setKyc] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { handleFilters, setReferralValue, setSearchTerm, setDateRange } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!searchQuery) {
      handleFilters(skip, limit);
    } else {
      const body = {
        query: searchQuery,
      };
      handleFilters(skip, limit, body);
    }
  }, [skip, limit, searchQuery, statusChange]);

  const TOTAL_PAGES = Math.ceil(totalPayouts / limit);

  const updateStatus = async (payoutId, status) => {
    setLoading(true);

    const body = {
      status: status,
    };

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}${payoutRequests.updateStatus}${payoutId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        handleFilters(skip, limit);
        setLoading(false);
      } else {
        console.log(resJson.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Modal open/close functions
  function closeModal() {
    setIsOpen(false);
    setKyc("");
  }

  async function showKyc(referredId) {
    setIsOpen(true);
    const response = await fetchKyc(referredId);
    console.log(response);
    setKyc(response);
  }

  const AllStatusColumns = allStatusColumns(updateStatus, showKyc);

  function applyFilters() {
    var body;
    if (dateRange[0].endDate !== null) {
      body = {
        range: {
          createdDate: {
            gte: dateRange[0].startDate + 1,
            lte: dateRange[0].endDate + 1,
          },
          referralEarned: {
            gte: referralValue[0],
            lte: referralValue[1],
          },
        },
      };
    } else {
      body = {
        range: {
          referralEarned: {
            gte: referralValue[0],
            lte: referralValue[1],
          },
        },
      };
    }

    handleFilters(skip, limit, body);
  }

  function resetFilters() {
    handleFilters(skip, limit);
    setReferralValue([0, 100000]);
    setSearchTerm("");
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  }

  if (error) return <Brokenpage error={error} />;

  return (
    <>
      {/* filter */}
      <TableFilter
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        handleFilters={handleFilters}
        skip={skip}
        limit={limit}
        searchQuery={searchQuery}
      />
      {payouts?.length > 0 ? (
        <div>
          <Table
            DATA={payouts}
            COLUMNS={AllStatusColumns}
            totalPages={TOTAL_PAGES}
            skip={skip}
            limit={limit}
            setSkip={setSkip}
            setLimit={setLimit}
            multiSelect
          />
        </div>
      ) : loading || isLoading ? (
        "Loading..."
      ) : (
        <NoData />
      )}

      <Modal modalTitle="KYC details" closeModal={closeModal} isOpen={isOpen}>
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
    </>
  );
}

export default AllUsers;
