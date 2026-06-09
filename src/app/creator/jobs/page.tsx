import { CreatorJobsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorJobsPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Creator Jobs"
      description="Find creator jobs posted by businesses, filter by niche, view compensation and requirements, and apply directly through SocialGems."
    >
      <CreatorJobsClient />
    </PortalLayout>
  );
}
