import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] lg:flex">
      <DashboardSidebar />
      <div className="min-w-0 flex-1">
        <DashboardTopbar />
        {children}
      </div>
    </div>
  );
}