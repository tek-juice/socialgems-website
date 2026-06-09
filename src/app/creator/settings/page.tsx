import { CreatorSettingsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorSettingsPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Creator Settings"
      description="Manage account security, password, notifications, wallet, payment methods, and account deletion requests."
    >
      <CreatorSettingsClient />
    </PortalLayout>
  );
}
