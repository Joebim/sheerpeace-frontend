import ViewProduct from "./components/ViewProduct";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  return <ViewProduct productId={id} />;
}
