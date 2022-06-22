import { ApiConfig } from "@common/types/api";
import { Product } from "@common/types/product";
import { ProductConnection } from "@framework/schema";
import { getAllProductsPathsQuery } from "@framework/utils/queries";

type ReturnType = {
	products: Pick<Product, "slug">[];
};

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
	const { data } = await config.fetch<{ products: ProductConnection }>({
		query: getAllProductsPathsQuery,
		url: config.apiUrl,
	});
	/*
	console.log(JSON.stringify(data, null, 2));
    {
      "products": {
        "edges": [
          {
            "node": {
              "handle": "cool-hat"
            }
          },
          {
            "node": {
              "handle": "lightweight-jacket"
            }
          },
          {
            "node": {
              "handle": "t-shirt"
            }
          }
        ]
      }
    }
  */
	//normalize data
	const products = data.products.edges.map(({ node: { handle } }) => {
		return {
			slug: handle,
		};
	});
	/*
  console.log(products, "products normalized");
  [
    { slug: 'cool-hat' },
    { slug: 'lightweight-jacket' },
    { slug: 't-shirt' }
  ] 
  */

	return { products };
};
export default getAllProductsPaths;
