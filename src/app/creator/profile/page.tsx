import { CreatorProfileClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorProfilePage() {
  return (
    <PortalLayout
      kind="creator"
      title="Creator Profile"
      description="Manage profile details, social platform connections, industries, content form, ranks, and creator visibility."
    >
      <CreatorProfileClient />
    </PortalLayout>
  );
}
