import { notFound } from 'next/navigation';
import TemplateLanding from '@/components/template-pages/TemplateLanding';
import { resolveTemplate, templateMetadata, templateParams } from '@/components/template-pages/routeHelpers';

const KIND = 'purchase-order' as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return templateParams(KIND);
}

export async function generateMetadata({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  return templateMetadata(KIND, template);
}

export default async function Page({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const id = resolveTemplate(KIND, template);
  if (!id) notFound();
  return <TemplateLanding id={id} />;
}
