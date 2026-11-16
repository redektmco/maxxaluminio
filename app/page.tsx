import { Home } from "@/components/home";
import { MedidaProvider } from "@/components/medida";

export default function Page() {
  return (
    <MedidaProvider>
      <Home />
    </MedidaProvider>
  );
}
