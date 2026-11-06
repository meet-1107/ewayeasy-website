// Real photos for industry and invoice pages (Unsplash License, downloaded to public/images/industries/).
// Illustrative only: the people shown are not E-Way Easy customers.

export interface Photo { src: string; alt: string; credit: string }

export const INDUSTRY_PHOTOS: Record<string, Photo> = {
  fmcg: { src: '/images/industries/fmcg.jpg', alt: 'Shelves of a busy Indian grocery store packed with packaged food and household products', credit: 'Ravi Sharma' },
  'textile-apparel': { src: '/images/industries/textile-apparel.jpg', alt: 'Freshly dyed yarn in bright colours hung up to dry at a textile unit', credit: 'Tanusree Mitra' },
  pharma: { src: '/images/industries/pharma.jpg', alt: 'A pharmacist in a white coat picking a medicine box from well-stocked shelves', credit: 'National Cancer Institute' },
  'automotive-components': { src: '/images/industries/automotive-components.jpg', alt: 'Workers operating a large industrial machine on a factory floor', credit: 'Zoshua Colah' },
  'machinery-engineering': { src: '/images/industries/machinery-engineering.jpg', alt: 'An engineering workshop with a lathe, tools and metal shavings', credit: 'Zoshua Colah' },
  'ecommerce-d2c': { src: '/images/industries/ecommerce-d2c.jpg', alt: 'A delivery man with a parcel strapped to his bicycle', credit: 'Ratul Pal' },
};

export const INVOICE_PHOTOS = {
  withGst: { src: '/images/industries/invoice-with-gst.jpg', alt: 'A trader at work in his shop, with shelves of labelled stock boxes behind him', credit: 'Ravi Sharma' },
  withoutGst: { src: '/images/industries/invoice-without-gst.jpg', alt: 'A smiling shopkeeper in a small, packed open-front store', credit: 'Wietse Jongsma' },
} satisfies Record<string, Photo>;

export const EWAY_BILL_PHOTO: Photo = {
  src: '/images/industries/eway-bill-truck.jpg',
  alt: 'A painted Indian goods truck on the road with its load',
  credit: 'Siddhesh Mangela',
};
