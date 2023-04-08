const developmentUrl = 'https://www.innopadsolutions.com/projects/androidapi/webservice/';

const baseUrl =
  developmentUrl;

const baseUrlApi = `${developmentUrl}`;

let ApiConfig = {
  baseUrl,
  baseUrlApi,
  token: null as string | null,
  login: `${baseUrlApi}auth/login`,
  products: `${baseUrlApi}getProduct`,
  addProduct: `${baseUrlApi}AddProduct`,
  productCategories: `${baseUrlApi}getCategory`
};

export { ApiConfig };
