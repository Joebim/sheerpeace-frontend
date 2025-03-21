import ViewProduct from "./components/ViewProduct";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  return <ViewProduct productId={params.id} />;
}
