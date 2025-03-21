import ViewProduct from "./components/ViewProduct";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  return (
    <>
      <ViewProduct productId={id} />
    </>
  );
}
