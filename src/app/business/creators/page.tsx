import { BusinessCreatorsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessCreatorsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Discover Creators"
      description="Search, filter, review, and invite creators using the same creator discovery context available in the Flutter business flow."
    >
      <BusinessCreatorsClient />
    </PortalLayout>
  );
}
