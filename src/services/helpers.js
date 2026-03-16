import { PAGES_TO_FETCH } from './config.js';

// get multiple pages of movies from api and combine them into one list
export async function fetchMultiplePages(baseUrl) {
    const pagePromises = [];

    // make a loop to get pages 1 to 5
    for (let page = 1; page <= PAGES_TO_FETCH; page++) {
        // add the page number to the end of the url
        const url = `${baseUrl}&page=${page}`;
        // add to our list of things to wait for
        pagePromises.push(fetch(url));
    }

    // download all pages at the same time
    const responses = await Promise.all(pagePromises);

    // check if any of the downloads failed
    for (let i = 0; i < responses.length; i++) {
        const res = responses[i];
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    }

    // convert all answers to json format
    const dataPromises = [];
    for (let i = 0; i < responses.length; i++) {
        dataPromises.push(responses[i].json());
    }
    const dataArray = await Promise.all(dataPromises);

    // put all the movies together into one big list
    let allResults = [];
    for (let i = 0; i < dataArray.length; i++) {
        const pageData = dataArray[i];
        for (let j = 0; j < pageData.results.length; j++) {
            allResults.push(pageData.results[j]);
        }
    }

    // send back the combined list of movies
    return {
        page: dataArray[0].page,
        total_pages: dataArray[0].total_pages,
        results: allResults,
        total_results: allResults.length
    };
}

