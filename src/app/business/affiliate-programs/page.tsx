import BusinessCampaignsClient from "../../components/BusinessCampaignsClient";
import { PortalLayout } from "../../components/portal";

export default function BusinessAffiliateProgramsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Affiliate Programs"
      description="Affiliate programs are represented in the Flutter app as campaigns with earning_type and affiliate_link fields."
    >
      <BusinessCampaignsClient />
    </PortalLayout>
  );
}
