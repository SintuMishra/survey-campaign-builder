import { CampaignProvider } from "./context/CampaignContext";
import BuilderLayout from "./components/layout/BuilderLayout";

export default function App() {
  return (
    <CampaignProvider>
      <BuilderLayout />
    </CampaignProvider>
  );
}