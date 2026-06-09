import { BusinessJobsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessJobsPage() {
  return (
    <PortalLayout
      kind="business"
      title="Creator Jobs"
      description="Post and manage creator jobs using the real job board model from the Flutter app."
    >
      <BusinessJobsClient />
    </PortalLayout>
  );
}
