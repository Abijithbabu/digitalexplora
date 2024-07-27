import { MenuAlt1Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Breadcrump from "../../../../Components/Breadcrump";
import ELoading from "../../../../Components/ELoading";
import { actionCreators } from "../../../../store";
import { adminRequests } from "../../../../config/requests";

import useFetchAws from "../../../../hooks/useFetchAws";
import { removeParam } from "../../../../helpers/removeParams";
import FileUploadBtn from "../../../../Components/FileUploadBtn";
import { fetchWrapper } from "../../../../helpers";
import { BASE_URL } from "../../../../config";
import AdminLayout from "../../../../Components/admin/AdminLayout";
import axios from "axios";

function index() {
  const router = useRouter();
  const { id } = router.query;

  const { aside } = useSelector((state) => state.utils);
  const { app } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { getSingleApp, setAside, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getSingleApp(id);
    }
  }, [id]);

  const [data, setData] = useState({
    name: "",
    description: "",
    webhook: "",
    imageUrl: "",
  });

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleImage(event) {
    const file = event.target.files[0];

    const url = await useFetchAws(file, "app");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        setLoading(percent);
      },
    };

    await axios
      .put(url, file, options)
      .then(({ config }) => {
        const alteredUrl = removeParam("Content-Type", config.url);
        // Use a functional state update
        setData({ ...data, imageUrl: alteredUrl });
        setMessage({ sc: "Uploaded successfully", er: "" });

        setTimeout(() => {
          setLoading(null);
          setMessage({ sc: "", er: "" });
        }, 2000);
      })
      .catch((err) => {
        setMessage({ sc: "", er: err.message });
        console.log(err.message);
      });

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }

  async function onUpdate(e) {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/app-manager/edit-app/${id}`,
        data
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        getSingleApp(id);
        setMessage({ sc: resJson.message, er: "" });
        setSubmitting(false);
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setMessage({ sc: "", er: "Something went wrong!" });
      setSubmitting(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  // delete app
  async function handleAppDelete(appId) {
    const confirmMsg = window.confirm(
      "Do you want to delete the app permanently?"
    );

    if (!confirmMsg) return;

    try {
      const res = await fetchWrapper.delete(
        `${BASE_URL}${adminRequests.deleteApp}${appId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        router.push("/admin/app-manager");
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
      console.log(error.message);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }

  useEffect(() => {
    if (app) {
      setData({
        ...data,
        imageUrl: app?.imageUrl,
        name: app?.name,
        description: app?.description,
        webhook: app?.description,
      });
    }
  }, [app]);

  return (
    <AdminLayout title={app?.name ?? "Loading..."}>
      <div className="flex flex-between items-center mb-6">
        <Breadcrump
          baseLink="/admin/app-manager"
          baseTitle="Apps"
          id={id}
          edit={false}
          item="App"
          itemName={app?.name}
        />
      </div>

      {app ? (
        <>
          <h2 className="font-semibold tracking-wider">Information</h2>
          <hr className="my-4" />
          {/* app details */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Details
              </h3>
              <p className="text-sm">Change information about your app.</p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8">
              <form onSubmit={onUpdate}>
                <div className="mb-6">
                  <label htmlFor="appName">App Name:</label>
                  <input
                    type="text"
                    className="field"
                    placeholder="Enter your app name..."
                    name="appName"
                    value={data?.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows="8"
                    className="field"
                    placeholder="Enter your description..."
                    name="description"
                    value={data?.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-6 items-center">
                    <div>
                      <label>App image</label>
                      <FileUploadBtn
                        isLoading={isLoading}
                        image={data?.imageUrl}
                        title="app"
                        handleImage={handleImage}
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold">Recommended format</h5>
                      <ul className="list-disc list-outside ml-4 text-sm mt-2 leading-6">
                        <li>Image format: JPG/PNG</li>
                        <li>Aspect Ratio: 16:9</li>
                        <li>Recommended size: 3840x2160 or 1920x1080 pixels</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="webhook">Webhook:</label>
                  <input
                    type="text"
                    placeholder="Enter webhook url..."
                    className="field"
                    name="webhook"
                    value={data?.webhook}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <button
                    className="userBtn py-2 mb-4 w-full"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* app details */}
          <hr className="my-4" />
          {/* app action */}

          <div className="lg:grid lg:grid-cols-3 lg:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Actions
              </h3>
              <p className="text-sm">Take action to delete</p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8 flex items-center">
              <button
                className="btn bg-white border-red-500 text-red-600 ml-4"
                onClick={() => handleAppDelete(id)}
              >
                Delete App Permanently
              </button>
            </div>
          </div>
        </>
      ) : (
        <ELoading />
      )}
    </AdminLayout>
  );
}

export default index;
