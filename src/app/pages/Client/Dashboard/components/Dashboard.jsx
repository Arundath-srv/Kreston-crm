
/*eslint-disable*/
import  { useState, useEffect } from "react";
import {
  User,
  Users,
  Calendar,
  FileText,
  CreditCard,
  Edit3,
  Menu,
  X,
} from "lucide-react";
import { Button, Card } from "components/ui";
import Drawer from "components/Drawer";
import Profile from "./Components/Profile"; 
import Payments from "./Components/Projects";
import Booking from "./Components/Orders";
import Family from "./Components/Leads";
import Reports from "./Components/Complaints";
import CustomerDashboard from "./Components/CustomerDashboard"
import { useParams } from 'react-router';
import { get } from 'utility'; 
import { toast } from 'react-toastify'; 

const CustomerDashboard = () => {
  const { id } = useParams(); 
  const [activeTab, setActiveTab] = useState("Details/Profile");
  const [profileData, setProfileData] = useState(null); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/female.jpg"); 
  const [loading, setLoading] = useState(true); 

  const tabs = [
    { name: "CustomerDashboard", icon: Tv, component: CustomerDashboard },
    { name: "Details/Profile", icon: User, component: Profile },
    { name: "Leads/FollowUps", icon: Users, component: Family },
    { name: "Order History", icon: Calendar, component: Booking },
    { name: "Tickets", icon: FileText, component: Reports },
    { name: "Livable Projects", icon: CreditCard, component: Payments },
  ];

  const refetchCustomer = async () => {
    if (!id) {
      console.warn("No customer ID provided for refetch");
      return;
    }

    try {
      setLoading(true);
      const res = await get(`/customer/singlecust/${id}`);
      
      if (!res?.success || !res?.data) {
        throw new Error("Invalid API response");
      }

      const data = res.data;

      const profileDataMapped = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        landline: data.landline || "",
        address: data.address || "",
        uniqueId: data.uniqueId || data.customerId || "",
        profileImage: data.profileImage || "/images/female.jpg", 
      };

      setProfileData(profileDataMapped);
      setProfilePic(profileDataMapped.profileImage);

      console.log("Sidebar data updated:", profileDataMapped);

    } catch (err) {
      console.error("Failed to refetch customer data:", err);
      toast.error("Failed to refresh profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!id) {
      console.warn("No ID in URL params");
      setLoading(false);
      return;
    }

    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const res = await get(`/customer/singlecust/${id}`);

        if (!res?.success || !res?.data) {
          throw new Error("Invalid response from server");
        }

        const data = res.data;

        const profileDataMapped = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          landline: data.landline || "",
          address: data.address || "",
          city: data.location || "", 
          uniqueId: data.uniqueId || data.customerId || "",
          profileImage: data.profileImage || "/images/female.jpg",
        };

        setProfileData(profileDataMapped);
        setProfilePic(profileDataMapped.profileImage);

        console.log("Initial profile loaded:", profileDataMapped);

      } catch (err) {
        console.error("Failed to load customer:", err);
        setProfileData({
          firstName: "Unknown",
          lastName: "Customer",
          email: "",
          mobile: "",
          landline: "",
          address: "",
          city: "",
          uniqueId: "",
        });
        toast.error("Failed to load customer profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleEditProfile = () => {
    setActiveTab("Details/Profile");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSidebarOpen(false);
  };

 
  const getCurrentTabComponent = () => {
    const currentTab = tabs.find((tab) => tab.name === activeTab);
    const TabComponent = currentTab?.component;
    if (!TabComponent) return null;

    if (TabComponent === Profile) {
      return <TabComponent onProfileUpdate={refetchCustomer} />;
    }

    return <TabComponent />;
  };

 
  const ProfileCard = ({ className = "" }) => {
    if (!profileData) return null;

    return (
      <Card className={`${className}`}>
        <div className="relative">
          <div className="to-gray-00 relative h-20 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 via-gray-500 sm:h-24">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-white/10"></div>
          </div>
        </div>

        <div className="p-4 pt-8 sm:p-6 sm:pt-13">
          <div className="mb-4 sm:mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:text-base dark:text-gray-200">
              Basic Details
            </h3>
            <div className="mb-3 border-b border-gray-200 sm:mb-4 dark:border-gray-700"></div>
            <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
              <div className="flex items-start justify-between sm:items-center">
                <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  Full Name:
                </span>
                <span className="ml-2 text-right font-medium text-gray-800 dark:text-gray-300">
                  {profileData.firstName} {profileData.lastName}
                </span>
              </div>
              <div className="flex items-start justify-between sm:items-center">
                <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  Customer ID:
                </span>
                <span className="ml-2 text-right font-medium text-gray-800 dark:text-gray-300">
                  {profileData.uniqueId}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:mb-3 sm:text-base dark:text-gray-200">
              Contact Details
            </h3>
            <div className="mb-3 border-b border-gray-200 sm:mb-4 dark:border-gray-700"></div>
            <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
              <div className="flex items-start justify-between">
                <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  Email:
                </span>
                <span className="ml-2 text-right break-all text-gray-800 dark:text-gray-300">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                <span className="text-gray-800 dark:text-gray-300">
                  {profileData.mobile}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Landline:</span>
                <span className="text-gray-800 dark:text-gray-300">
                  {profileData.landline}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:mb-3 sm:text-base dark:text-gray-200">
              Location Details
            </h3>
            <div className="mb-3 border-b border-gray-200 sm:mb-4 dark:border-gray-700"></div>
             <div className="flex items-start justify-between">
                <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  Location:
                </span>
                <span className="ml-2 text-right break-all text-gray-800 dark:text-gray-300">
                  {profileData.location}
                </span>
              </div>
            <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
              <div className="flex items-start justify-between">
                <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  Address:
                </span>
                <span className="ml-2 text-right text-gray-800 dark:text-gray-300">
                  {profileData.address}
                </span>
              </div>
        
            </div>
          </div>


          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setProfilePic(imageUrl);
              }
            }}
          />

          <Button
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm mt-3 sm:px-4"
            color="primary"
            onClick={handleEditProfile}
          >
            <Edit3 size={14} />
            Edit Profile
          </Button>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen p-3 sm:p-6">
      {/* Mobile header */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Customer Dashboard
        </h1>
        <Button
          variant="flat"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        show={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        position="left"
        className="w-80 overflow-y-auto lg:hidden"
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
            <Button
              variant="flat"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="p-1"
            >
              <X size={20} />
            </Button>
          </div>
          <ProfileCard />
        </div>
      </Drawer>


      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
  
        <div className="hidden w-80 flex-shrink-0 lg:block">

          <ProfileCard key={profileData?.uniqueId || 'default'} />
        </div>
        <div className="min-w-0 flex-1">
          <Card className="rounded-lg p-3 shadow-sm sm:p-6">
            <div className="mb-6 hidden border-b sm:block dark:border-gray-600">
              <div className="flex space-x-4 overflow-x-auto pb-4 lg:space-x-8 hide-scrollbar">
                {tabs.map((tab) => (
                  <Button
                    key={tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    variant="flat"
                    unstyled
                    className={`flex flex-shrink-0 items-center gap-2 border-b-2 px-2 pb-2 text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.name
                        ? "border-primary-600 text-primary-600"
                        : "hover:text-primary-600 border-transparent text-gray-500"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mb-4 border-b sm:hidden dark:border-gray-600">
              <div className="scrollbar-hide flex space-x-4 overflow-x-auto pb-3">
                {tabs.map((tab) => (
                  <Button
                    key={tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    variant="flat"
                    unstyled
                    className={`flex flex-shrink-0 items-center gap-1 border-b-2 px-2 pb-2 text-xs whitespace-nowrap transition-colors ${
                      activeTab === tab.name
                        ? "border-primary-600 text-primary-600"
                        : "hover:text-primary-600 border-transparent text-gray-500"
                    }`}
                  >
                    <tab.icon size={14} />
                    <span className="xs:inline hidden">{tab.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="min-h-96">
              {getCurrentTabComponent()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CustomerDashboard;