import { BusinessWalletClient } from "../../components/PortalDataClients";
import { PortalLayout } from "../../components/portal";

export default function BusinessWalletPage() {
  return (
    <PortalLayout
      kind="business"
      title="Business Wallet"
      description="View your wallet balance, fund your account to run campaigns and pay creators, and track all transactions."
    >
      <BusinessWalletClient />
    </PortalLayout>
  );
}
