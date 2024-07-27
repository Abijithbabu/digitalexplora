import { BanknotesIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import EmailPage from "./EmailPage";
import ResetPassword from "./ResetPassword";
import PaymentPage from "./PaymentPage";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import { fetchWrapper } from "@/helpers";
import { BASE_URL } from "@/config";
import { emailRequests } from "@/config/requests";
import { MailLock } from "@mui/icons-material";

function AdminSettings() {
  const [emailTypes, setEmailTypes] = useState([]);
  const [typeId, setTypeId] = useState();
  const [data, setData] = useState({
    subject: "",
    body: "",
    emailType: "",
  });

  function handleChange(e) {
    if (e.target.name === "emailType") {
      setData({ ...data, [e.target.name]: e.target.value });
      setTypeId(e.target.value);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}${emailRequests.save}${typeId}`,
        data
      );
      const resJson = await res.json();

      console.log(resJson);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmailType();
  }, []);

  useEffect(() => {
    if (typeId) {
      getEmailContent(typeId);
    }
  }, [typeId]);

  async function getEmailContent(typeId) {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${emailRequests.getType}${typeId}`
      );
      const { data } = await res.json();

      setData({
        subject: data.subject,
        emailType: data.emailType,
        body: data.body,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmailType() {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${emailRequests.getAllTypes}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setEmailTypes(resJson.data);
        setTypeId(resJson.data[0]._id);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Tabs>
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Settings</h3>

          <TabList className="ml-auto flex items-center">
            <Tab>
              <div className="flex cursor-pointer">
                <MailLock className="h-5 w-5 text-yellow-600 mr-2" />
                Email settings
              </div>
            </Tab>
            <Tab>
              <div className="flex cursor-pointer">
                <BanknotesIcon className="h-5 w-5 text-green-600 mr-2" />
                Payment integration
              </div>
            </Tab>
            <Tab>
              <div className="flex cursor-pointer">
                <LockOpenIcon className="h-5 w-5 text-red-600 mr-2" />
                Reset password
              </div>
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <EmailPage
            emailTypes={emailTypes}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            data={data}
          />
        </TabPanel>

        <TabPanel>
          <PaymentPage />
        </TabPanel>

        <TabPanel>
          <ResetPassword />
        </TabPanel>
      </Tabs>
    </>
  );
}

export default AdminSettings;
