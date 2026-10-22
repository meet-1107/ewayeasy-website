import CategoryLanding from '@/components/template-pages/CategoryLanding';
import { categoryMetadata } from '@/components/template-pages/routeHelpers';

export const metadata = categoryMetadata('sales-invoice');

export default function Page() {
  return <CategoryLanding kind="sales-invoice" />;
}
