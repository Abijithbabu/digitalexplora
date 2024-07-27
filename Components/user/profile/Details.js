import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProfileSettings from "./ProfileSettings";
import ProfileKyc from "./ProfileKyc";

function Details({ person, getUser, kyc, getKyc }) {
  return (
    <div className="max-w-7xl mx-auto">
      <Tabs>
        <TabList>
          <Tab>Profile Settings</Tab>
          <Tab>KYC</Tab>
        </TabList>

        <TabPanel>
          {person ? (
            <ProfileSettings preloadedValues={person} getUser={getUser} />
          ) : (
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-2 md:gap-4">
              <div className="leftCol bg-white rounded-lg shadow-xl p-8 h-full animate-pulse w-full">
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
              </div>
              <div className="rightCol bg-white rounded-lg shadow-xl p-8 h-full animate-pulse w-full">
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
                <p className="w-full h-5 bg-gray-200 animate-pulse mb-2"></p>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <ProfileKyc preloadedValues={kyc} getKyc={getKyc} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Details;
