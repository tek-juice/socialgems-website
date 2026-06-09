import { CreatorCampaignsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorAffiliateProgramsPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Affiliate Programs"
      description="Join affiliate programs, receive affiliate links, promote products or services, and earn commissions on successful referrals."
    >
      <CreatorCampaignsClient affiliateOnly />
    </PortalLayout>
  );
}
