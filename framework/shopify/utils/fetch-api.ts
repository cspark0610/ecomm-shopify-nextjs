import { ApiFetcherOptions, ApiFetcherResults } from "@common/types/api";

const fetchApi = async <T>({ url, query, variables }: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
	// const url = "http://localhost:4000/graphql";
	const response = await fetch(url, {
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
