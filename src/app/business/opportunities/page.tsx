import BusinessCampaignsClient from "../../components/BusinessCampaignsClient";
import { BusinessJobsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessOpportunitiesPage() {
  return (
    <PortalLayout
      kind="business"
      title="Create Opportunities"
      description="Create paid campaigns, affiliate programs, creator jobs, product gifting, event access, and brand experiences from one business workspace."
    >
      <div className="grid gap-6">
        <BusinessCampaignsClient />
        <BusinessJobsClient />
      </div>
    </PortalLayout>
  );
}
