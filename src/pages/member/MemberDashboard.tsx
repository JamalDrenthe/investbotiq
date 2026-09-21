import MemberPortalLayout, { useMemberSwitchTab } from "@/components/member/MemberPortalLayout";
import { MemberDashboardTab } from "@/components/member/MemberDashboardTab";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { useAuth } from "@/components/AuthProvider";

const MemberDashboard = () => {
  const { user } = useAuth();
  const switchTab = useMemberSwitchTab();

  const getFirstName = () => {
    if (!user || !user.email) return "Investeerder";
    const namePart = user.email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).split(".")[0];
  };

  return (
    <MemberPortalLayout>
      <MemberDashboardTab onSwitchTab={switchTab} userName={getFirstName()} />
    </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberDashboard, ["member"]);
