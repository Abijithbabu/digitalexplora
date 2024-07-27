import LinkView from "./LinkView";
import CollapsibleItem from "../../Collapsible";
import useUserLinks from "../../../hooks/useUserLinks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import NetworkError from "../../NetworkError";

function AffiliatePage() {
  const { user } = useSelector((state) => state.auth);
  const { generalLinks, productLinks, error, loading } = useSelector(
    (state) => state.affiliate
  );

  const dispatch = useDispatch();
  const { getAffiliateLinks } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getAffiliateLinks(user._id);
  }, [user._id]);

  return (
    <>
      {error ? (
        <NetworkError error={error} />
      ) : loading ? (
        "Loading..."
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="p-6 lg:p-10">
            <h3 className="text-center text-xl font-bold mb-6">
              Affiliate links
            </h3>

            {/* general links */}
            <CollapsibleItem bgColor="blue" title="General Links">
              <div className="collapseBody p-6">
                {/* affiliate link details */}
                {generalLinks?.length > 0 ? (
                  <>
                    {generalLinks?.map((link) => (
                      <LinkView
                        name={link?.affiliateName}
                        url={link?.affiliateLink}
                        id={link?._id}
                        userName={user.userName}
                        key={link?._id}
                      />
                    ))}
                  </>
                ) : (
                  <p className="text-center mb-2">No Links found.</p>
                )}
              </div>
            </CollapsibleItem>

            {/* product links */}

            <div>
              <h3 className="text-gray-500 text-xs uppercase font-bold mb-2 mt-4">
                Product Affiliate links
              </h3>
            </div>

            {productLinks?.length > 0 ? (
              <>
                {productLinks?.map((item) => (
                  <div key={item?._id}>
                    <CollapsibleItem bgColor="gray" title={item?.productName}>
                      <div className="collapseBody p-6">
                        {/* affiliate link details */}
                        {item?.affiliateLinks?.length > 0 ? (
                          <>
                            {item?.affiliateLinks?.map((affiliate) => (
                              <LinkView
                                id={affiliate?._id}
                                name={affiliate?.affiliateName}
                                url={affiliate?.affiliateLinks}
                                userName={user.userName}
                                key={affiliate?._id}
                                productLink
                              />
                            ))}
                          </>
                        ) : (
                          <p className="text-center mb-2">No Links found.</p>
                        )}
                      </div>
                    </CollapsibleItem>
                  </div>
                ))}
              </>
            ) : (
              <p className="bg-yellow-50 text-yellow-500 border border-yellow-500 p-2 rounded text-center">
                No products found...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AffiliatePage;
