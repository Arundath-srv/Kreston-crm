import { memo, useState, useEffect, useCallback } from "react";
import { Card, Button } from "components/ui";
import {
    Calendar,
    FileText,
    User,
    CreditCard,
    Loader2,
} from "lucide-react";
import { get } from "utility";
import { useParams } from "react-router";
const CustomerDashboard = () => {
    const { id: customerUniqueId } = useParams();
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchDashboardStats = useCallback(async () => {
        if (!customerUniqueId) {
            setError("Customer ID not found in URL");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await get(`/client/dashboard/${customerUniqueId}`);

            if (response?.status) {
                setDashboardStats(response.data);
            } else {
                throw new Error(response?.message || "Failed to load dashboard data");
            }
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(err.message || "An unexpected error occurred");
            setDashboardStats(null);
        } finally {
            setLoading(false);
        }
    }, [customerUniqueId]);
    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);
    if (loading && !dashboardStats) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <span className="ml-3 text-gray-600 text-lg font-medium">
                    Loading your dashboard...
                </span>
            </div>
        );
    }
    if (error && !dashboardStats) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <p className="text-red-500 font-semibold text-lg">{error}</p>
                <Button onClick={fetchDashboardStats} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }
    const stats = {
        totalProjects: dashboardStats?.stats?.totalProjects ?? 0,
        // totalLeads: dashboardStats?.stats?.totalLeads ?? 0,
        // totalOrders: dashboardStats?.stats?.totalOrders ?? 0,
        // totalTickets: dashboardStats?.stats?.totalTickets ?? 0,
        cancelledProjectCount: dashboardStats?.stats?.cancelledProjectCount ?? 0,
        wipProjectCount: dashboardStats?.stats?.wipProjectCount ?? 0,
        completedProjectCount: dashboardStats?.stats?.completedProjectCount ?? 0,
    };
    const StatCard = ({ title, value, icon: Icon, pattern, color }) => (
        <Card
            className={`relative overflow-hidden p-6 rounded-2xl border border-gray-100 shadow-md transition-all transform hover:-translate-y-1 hover:shadow-lg bg-white`}
        >
            <div
                className={`absolute inset-0 opacity-20 bg-[${pattern}]`}
                style={{
                    backgroundImage: pattern,
                    backgroundSize: "120px 120px",
                    backgroundRepeat: "repeat",
                }}
            ></div>
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">{value}</p>
                </div>
                <div
                    className={`p-3 rounded-xl bg-opacity-20 ${color.bg} flex items-center justify-center`}
                >
                    <Icon className={`h-7 w-7 ${color.text}`} />
                </div>
            </div>
        </Card>
    );
    const pastelPatterns = [
        "radial-gradient(circle at 20% 80%, #c3e7ff 0%, transparent 60%)",
        "linear-gradient(135deg, #ffe0e0 0%, #fff5f5 100%)",
        "radial-gradient(circle at 70% 20%, #d6ffe0 0%, transparent 60%)",
        "linear-gradient(120deg, #fff1e6 0%, #fff9f2 100%)",
    ];
    const colors = {
        blue: { bg: "bg-blue-200", text: "text-blue-600" },
        green: { bg: "bg-green-200", text: "text-green-600" },
        purple: { bg: "bg-purple-200", text: "text-purple-600" },
        orange: { bg: "bg-orange-200", text: "text-orange-600" },
    };
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
            
               
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard
                    title="Cancelled"
                    value={stats.cancelledProjectCount}
                    icon={User}
                    pattern={pastelPatterns[2]}
                    color={colors.purple}
                />
                <StatCard
                    title="WIP"
                    value={stats.wipProjectCount}
                    icon={CreditCard}
                    pattern={pastelPatterns[3]}
                    color={colors.orange}
                />
                <StatCard
                    title="Completed"
                    value={stats.completedProjectCount}
                    icon={FileText}
                    pattern={pastelPatterns[1]}
                    color={colors.green}
                />
               
                <StatCard
                    title="Projects"
                    value={stats.totalProjects}
                    icon={Calendar}
                    pattern={pastelPatterns[0]}
                    color={colors.blue}
                />
                
                
            </div>
        </div>
    );
};
export default memo(CustomerDashboard);