import MemberPortalLayout from "@/components/member/MemberPortalLayout";
import { TasksPage } from "@/components/tasks/TasksPage";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberTasks = () => {
  return (
    <MemberPortalLayout>
      <TasksPage embedded showHeader />
    </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberTasks, ["member"]);
