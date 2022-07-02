import { ApiFetcherOptions, ApiFetcherResults } from "@common/types/api";
import { API_URL } from "@framework/const";

const fetchApi = async <T>({ query, variables }: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		//in post request add always body property and assing query stringified
		body: JSON.stringify({ query, variables }),
	});
	const { data, errors } = await response.json();
	if (errors) {
		throw new Error(errors[0].message ?? errors.message);
	}
	return { data };
};

export default fetchApi;
