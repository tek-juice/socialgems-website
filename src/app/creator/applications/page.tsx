import { CreatorApplicationsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorApplicationsPage() {
  return (
    <PortalLayout
      kind="creator"
      title="My Applications"
      description="Track your campaign, job, affiliate, and collaboration applications from one dashboard."
    >
      <CreatorApplicationsClient />
    </PortalLayout>
  );
}
