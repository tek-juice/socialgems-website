import { CreatorMembershipsClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorMembershipsPortalPage() {
  return (
    <PortalLayout
      kind="creator"
      title="Creator Memberships"
      description="Compare Free, Creator Plus, and Creator Pro plans with details on opportunity access, visibility benefits, and creator growth features."
    >
      <CreatorMembershipsClient />
    </PortalLayout>
  );
}
