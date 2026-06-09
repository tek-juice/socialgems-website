import BusinessCampaignsClient from "../../components/BusinessCampaignsClient";
import { PortalLayout } from "../../components/portal";

export default function BusinessCampaignsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Business Campaigns"
      description="Create, fund, activate, manage, and close paid or affiliate campaigns with tasks, objectives, dates, media, applications, and creator approvals."
    >
      <BusinessCampaignsClient />
    </PortalLayout>
  );
}
