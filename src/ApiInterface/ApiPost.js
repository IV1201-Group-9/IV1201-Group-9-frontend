function doThrow(e) {
    throw e;
}

const url = "http://localhost:8080";
const ApiPost = {
    apiCall(params, object, token) {
        return fetch(url + params, {
        method: "POST", // HTTP method
        crossDomain: true,
        headers: {
            "Authorization" : token ,
            "Content-Type": "application/json",
            "Access-Control-Request-Headers":
                "Authorization , Origin, X-Requested-With, " +
                "Content-Type, Accept",
            },

        body: JSON.stringify(object),
        }
        // ).then((response) =>
        //     response.status === 200
        //         ? response
        //         : console.log(response) && doThrow(
        //             new Error(
        //             "Status was: " + response.statusText + " " + response.status + response.ErrorMessage
        //             )
        //         )
            ).then((response) => {
                console.log(response);
                    return response.json()
            });
        },
        signUp(object) {
            const signUpEndpoint = "/api/v1/auth/signup";
            const token = null;
            return ApiPost.apiCall(signUpEndpoint, object, token).then((data) => data);
        },
        logIn(object) {
            const logInEndpoint = "/api/v1/auth/authenticate";
            let token = "Bearer "+ localStorage.getItem("token");
            if(token === "Bearer undefined"){
                token = "Bearer null";
            }
            return ApiPost.apiCall(logInEndpoint, object, token).then((data) => data);
        },
        setStatus(object) {
            const statusEndpoint = "/api/v1/recruiters/status";
             const token = "Bearer "+ localStorage.getItem("token");
            return ApiPost.apiCall(statusEndpoint, object, token).then((data) => data);
        },
        setOptions(object) {
            const statusEndpoint = "/api/v1/applicants/competence";
            const token = "Bearer "+ localStorage.getItem("token");
            return ApiPost.apiCall(statusEndpoint, object, token).then((data) => data);
        }
    };

export default ApiPost;

