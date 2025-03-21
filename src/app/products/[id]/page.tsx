import ViewProduct from "./components/ViewProduct";

export default async function Page({ params }: Awaited<{ params: { id: string } }>) {
  return <ViewProduct productId={params.id} />;
}