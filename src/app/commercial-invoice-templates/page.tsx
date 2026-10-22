import CategoryLanding from '@/components/template-pages/CategoryLanding';
import { categoryMetadata } from '@/components/template-pages/routeHelpers';

export const metadata = categoryMetadata('commercial-invoice');

export default function Page() {
  return <CategoryLanding kind="commercial-invoice" />;
}
