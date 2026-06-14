import { MyAffiliateLinksClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function MyAffiliateLinksPage() {
  return (
    <PortalLayout
      kind="creator"
      title="My Affiliate Links"
      description="View your joined affiliate programs and copy your unique tracking links."
    >
      <MyAffiliateLinksClient />
    </PortalLayout>
  );
}
