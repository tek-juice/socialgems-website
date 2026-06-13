import { CreatorWalletClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function CreatorWalletPage() {
  return (
    <PortalLayout
      kind="creator"
      title="My Wallet"
      description="View your earnings, available balance, and withdraw your funds via M-Pesa or bank transfer."
    >
      <CreatorWalletClient />
    </PortalLayout>
  );
}
