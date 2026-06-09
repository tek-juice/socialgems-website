import { CreatorCampaignsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorOpportunitiesPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Explore Opportunities"
      description="Discover product gifting, service collaborations, event access, brand experiences, barter campaigns, and other growth opportunities."
    >
      <CreatorCampaignsClient freeOnly />
    </PortalLayout>
  );
}
