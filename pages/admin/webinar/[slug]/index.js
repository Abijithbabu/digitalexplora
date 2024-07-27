import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import AdminLayout from "../../../../Components/admin/AdminLayout";
import { actionCreators } from "../../../../store";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Breadcrump from "../../../../Components/Breadcrump";
import SingleWebinar from "../../../../Components/admin/webinar/SingleWebinar";
import { useEffect } from "react";

function WebinarDetail({ slug }) {
  const { aside } = useSelector((state) => state.utils);
  const { webinar } = useSelector((state) => state.webinar);

  const dispatch = useDispatch();
  const { setAside, setMessage, fetchWebinar } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchWebinar(slug);
  }, [slug]);

  return (
    <AdminLayout title={`Webinar | ${webinar ? webinar?.webinarName : ""}`}>
      <nav className="bg-white flex flex-between items-center p-4 lg:px-10 sticky top-0">
        {aside ? (
          <XMarkIcon
            className="block lg:hidden w-6 h-6 mr-8 cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out"
            onClick={() => setAside(!aside)}
          />
        ) : (
          <Bars3CenterLeftIcon
            className="block lg:hidden w-6 h-6 mr-8 cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out"
            onClick={() => setAside(!aside)}
          />
        )}

        <Breadcrump
          baseLink="/admin/webinar"
          baseTitle="Webinars"
          id={webinar?.slug}
          edit={false}
          item="Webinar"
          itemName={webinar?.webinarName}
        />
      </nav>

      {webinar ? (
        <SingleWebinar slug={slug} webinar={webinar} setMessage={setMessage} />
      ) : (
        <div className="p-8">Loading</div>
      )}
    </AdminLayout>
  );
}

WebinarDetail.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

export default WebinarDetail;
