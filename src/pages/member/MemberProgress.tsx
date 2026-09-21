import MemberPortalLayout, { useMemberSwitchTab } from "@/components/member/MemberPortalLayout";
import { MemberProgressTab } from "@/components/member/MemberProgressTab";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberProgress = () => {
  const switchTab = useMemberSwitchTab();
  return (
    <MemberPortalLayout>
      <MemberProgressTab onSwitchTab={switchTab} />
    </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberProgress, ["member"]);
