import MemberPortalLayout from "@/components/member/MemberPortalLayout";
import { MemberIntelligenceTab } from "@/components/member/MemberIntelligenceTab";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberAIRunning = () => {
  return (
    <MemberPortalLayout>
      <MemberIntelligenceTab />
    </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberAIRunning, ["member"]);
