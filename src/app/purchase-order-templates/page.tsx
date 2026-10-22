import CategoryLanding from '@/components/template-pages/CategoryLanding';
import { categoryMetadata } from '@/components/template-pages/routeHelpers';

export const metadata = categoryMetadata('purchase-order');

export default function Page() {
  return <CategoryLanding kind="purchase-order" />;
}
