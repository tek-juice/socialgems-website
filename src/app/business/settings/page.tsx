import { BusinessSettingsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessSettingsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Register & Verify Your Business"
      description="Create or update your business profile and complete verification to unlock campaigns, jobs, affiliate programs, collaborations, and creator management tools."
    >
      <BusinessSettingsClient />
    </PortalLayout>
  );
}
