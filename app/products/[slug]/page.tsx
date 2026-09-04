import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailTemplate } from "@/components/content/product-detail-template";
import { PRODUCTS } from "@/lib/products";

// branded-water has its own route (app/products/branded-water/page.tsx) that
// breaks this template per spec §7.4 — Next.js matches that static segment
// before falling back to this dynamic one, so it never reaches here.
const STANDARD_SLUGS = PRODUCTS.filter((p) => p.slug !== "branded-water").map((p) => p.slug);

export function generateStaticParams() {
  return STANDARD_SLUGS.map((slug) => ({ slug }));
}

function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug && STANDARD_SLUGS.includes(slug));
}

// Next.js 15 made route params a Promise — see
// https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Levati Water`,
    description: product.descriptor,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetailTemplate product={product} />;
}
