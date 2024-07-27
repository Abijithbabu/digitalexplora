import AdminLayout from "../../../Components/admin/AdminLayout";
import AdminNavbar from "../../../Components/admin/AdminNavbar";
import Table from "../../../Components/Table";
import NoData from "../../../Components/NoData";
import NetworkError from "../../../Components/NetworkError";
import Modal from "../../../Components/Modal";
import Link from "next/link";

import { TemplateIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../store";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import FileUploadBtn from "../../../Components/FileUploadBtn";
import useFetchAws from "../../../hooks/useFetchAws";
import axios from "axios";
import { removeParam } from "../../../helpers/removeParams";
import { Edit, DeleteOutline } from "@mui/icons-material";
import { adminRequests } from "../../../config/requests";
import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";

function index() {
  const [isOpen, setIsOpen] = useState(false);
  const { apps, totalApps, error, loading, successMessage, deleteAppError } =
    useSelector((state) => state.app);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [appImage, setAppImage] = useState();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { getAllApps, addApp, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const COLUMNS = [
    {
      Header: "App image",
      accessor: "imageUrl",
      Cell: ({ row }) => (
        <>
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="w-52 h-32 object-contain rounded"
          />
        </>
      ),
    },
    {
      Header: "App name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Webhook",
      accessor: "webhook",
    },
    {
      Header: "Actions",
      accessor: "",
      Cell: ({ row }) => (
        <>
          <Link href={`/admin/app-manager/${row.original._id}`}>
            <p>
              <span
                title="Edit App"
                className="focus:outline-none text-gray-500 hover:text-blue-500"
              >
                <Edit fontSize="small" />
              </span>
            </p>
          </Link>
          <button
            className="focus:outline-none text-gray-500 hover:text-red-500 ml-4"
            title="Delete App"
            onClick={() => handleAppDelete(row.original._id)}
          >
            <DeleteOutline fontSize="small" />
          </button>
        </>
      ),
    },
  ];

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
        getAllApps(skip, limit);
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
    getAllApps(skip, limit);

    if (successMessage) {
      setMessage({ sc: successMessage, er: "" });
      setIsOpen(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }, [skip, limit, successMessage]);

  useEffect(() => {
    if (deleteAppError) {
      setMessage({ sc: "", er: deleteAppError });
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }, [deleteAppError]);

  function closeModal() {
    setIsOpen(false);
  }

  async function handleImage(e) {
    e.preventDefault();
    const file = e.target.files[0];

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
        setAppImage(alteredUrl);
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

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      webhook: e.target.webhook.value,
      description: e.target.description.value,
      imageUrl: appImage,
    };

    addApp(body, setIsOpen);
  }

  const TOTAL_PAGES = Math.ceil(totalApps / limit);

  return (
    <AdminLayout title="App manager">
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">App manager</h3>

        <button
          className="userBtn w-full font-medium sm:w-auto sm:ml-auto py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create new app
        </button>
      </div>

      <div className="appManager">
        {loading ? (
          "Loading"
        ) : (
          <>
            {error ? (
              <NetworkError error={error} />
            ) : (
              <>
                {apps?.length > 0 ? (
                  <Table
                    DATA={apps}
                    COLUMNS={COLUMNS}
                    skip={skip}
                    limit={limit}
                    setSkip={setSkip}
                    setLimit={setLimit}
                    totalPages={TOTAL_PAGES}
                  />
                ) : (
                  <NoData />
                )}
              </>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        modalTitle="Create new app"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>App image</label>
            <FileUploadBtn
              isLoading={isLoading}
              image={appImage}
              title="app"
              handleImage={handleImage}
            />
          </div>
          <div className="mb-4">
            <label>App name</label>
            <input
              type="text"
              name="name"
              placeholder="App name"
              className="field"
            />
          </div>
          <div className="mb-4">
            <label>Webhook</label>
            <input
              type="url"
              name="webhook"
              placeholder="Webhook"
              className="field"
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="App description here"
              className="field"
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="userBtn w-full">
              Create app
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}

export default index;
