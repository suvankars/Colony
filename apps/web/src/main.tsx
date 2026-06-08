import { createRoot } from "react-dom/client";
import { Header } from "@repo/ui";
import { Layout } from "./components/Layout/layout";

const App = () => (
  <Layout>
    <Header title="web" />
    <p>This is where your main page content goes.</p>
  </Layout>
);

createRoot(document.getElementById("app")!).render(<App />);
