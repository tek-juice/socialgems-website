import { BusinessApplicantsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessApplicantsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Manage Creator Applications"
      description="View and manage creator applications for your campaigns, jobs, affiliate programs, and collaborations from one dashboard."
    >
      <BusinessApplicantsClient />
    </PortalLayout>
  );
}
