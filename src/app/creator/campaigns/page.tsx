import { CreatorCampaignsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorCampaignsPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Explore Paid Campaigns"
      description="Browse open and invite-only paid brand opportunities, including Creator Plus and Creator Pro gated campaigns."
    >
      <CreatorCampaignsClient />
    </PortalLayout>
  );
}
