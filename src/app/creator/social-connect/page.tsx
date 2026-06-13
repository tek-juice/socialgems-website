import { SocialConnectClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function SocialConnectPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Social Connect"
      description="Link your social media accounts to SocialGems so brands can see your reach and you can join platform-specific campaigns."
    >
      <SocialConnectClient />
    </PortalLayout>
  );
}
