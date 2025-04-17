import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN || ''
});

export const createPreference = async (items: any[], backUrls: any) => {
  const preference = new Preference(client);
  return preference.create({
    body: {
      items,
      back_urls: backUrls,
      auto_return: 'approved'
    }
  });
};
