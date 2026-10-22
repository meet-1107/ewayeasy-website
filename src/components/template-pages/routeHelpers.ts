import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { TEMPLATE_KIND, TEMPLATE_IDS, categoryHref, templateHref, templatesOf, type DocumentKind, type TemplateId } from '@/lib/templates/ids';
import { categoryContent, templateContent } from '@/lib/templates/catalog';

/** Metadata for a category landing page. */
export function categoryMetadata(kind: DocumentKind): Metadata {
  const c = categoryContent(kind);
  return pageMeta({ title: c.seoTitle, description: c.metaDescription, path: categoryHref(kind) });
}

/** Static params for a category's [template] route. */
export function templateParams(kind: DocumentKind): { template: string }[] {
  return templatesOf(kind).map((template) => ({ template }));
}

/** Narrow a route param to a TemplateId belonging to the given category, or null. */
export function resolveTemplate(kind: DocumentKind, slug: string): TemplateId | null {
  const id = (TEMPLATE_IDS as readonly string[]).includes(slug) ? (slug as TemplateId) : null;
  return id && TEMPLATE_KIND[id] === kind ? id : null;
}

/** Metadata for a template page. */
export function templateMetadata(kind: DocumentKind, slug: string): Metadata {
  const id = resolveTemplate(kind, slug);
  if (!id) return {};
  const t = templateContent(id);
  return pageMeta({ title: t.seoTitle, description: t.metaDescription, path: templateHref(id) });
}
