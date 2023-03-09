function doThrow(e) {
  throw e;
}


const url = "https://backend-iv1201-group9.herokuapp.com";

/**
 * Makes an API call using HTTP GET method with the provided parameters and token
 * @function
 * @memberof ApiCall
 * @param {string} params - The API endpoint and parameters
 * @param {string} token - The user token for authentication
 * @returns {Promise} A Promise that resolves to the API response data
 * @throws {Error} If the API response status is not 200
 */

const ApiCall = {
  apiCall(params,token) {
      // .then((response) => {
    return fetch(url + params, {
      method: "GET", // HTTP method
      crossDomain: true,
      headers: {
        // HTTP headers
        "Authorization" : token,
        "Content-Type": "application/json",
        "Access-Control-Request-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
      },
    })
        .then(( response) =>
            response.status === 200
                ? response.json()
                : doThrow(
                    response.status
                    // "Status was: " + response.statusText + " " + response.status

                )
        )
    //   if (response.status === 200) {
      //     console.log("Row 42: ApiCall")
      //     return response.json();
      //   } else if(response.status !== 200){
      //     return response.json()
      //     }
      // });
  },
  test() {
    const testEndPoint = "/api/v1/testEndpoint/anotherTestEndpoint";
    const token = "Bearer "+ localStorage.getItem("token");
    return ApiCall.apiCall(testEndPoint,token).then((data) => data);
  },
  getApplications() {
    const getQueueEndpoint = "/api/v1/recruiters/applicants";
    const token = "Bearer "+ localStorage.getItem("token");
    return ApiCall.apiCall(getQueueEndpoint, token).then((data) => data);
  },
  getCompetence() {
    const getQueueEndpoint = "/api/v1/applicants/competences";
    const token = "Bearer "+ localStorage.getItem("token");
    return ApiCall.apiCall(getQueueEndpoint, token).then((data) => data);
  }
};

export default ApiCall;
