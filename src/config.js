const HOST = "https://htid.hungthinhcorp.com.vn";
const LOCAL_HOST = "https://localhost:9443";

export const CONFIG = {
    // endpoint to request authorization code
    AUTHORIZE_ENDPOINT: `${HOST}/oauth2/authorize`,

    // endpoint to request access token
    TOKEN_ENDPOINT: `${HOST}/oauth2/token`,

    LOGOUT_URL: `${HOST}/oidc/logout`,
    RESPONSE_TYPE: "code",
    SCOPE: "openid profile phone",
    REDIRECT_URI: "https://topen-car.herokuapp.com",

    // id of 'Demo - SPA' Service Provider
    CLIENT_ID: "djJZinXs_OeJ9j5R7ETec4KFLGMa",
    // secret of 'Demo - SPA' Service Provider
    CLIENT_SECRET: "pWVTzZStieMoLBfRFFqLMUhzhEIa",

    GRANT_TYPE: "authorization_code",
    CLIENT_URL: `https://localhost:8000`,
    COOKIE_PATH: "/",

    // endpoint of User Profile service
    PROFILE_SERVICE_URL: "https://profile-demo-ht.herokuapp.com",

    APIM_URL: "http://api-profile-dev.hungthinhcorp.com.vn:8080",
    // consumer key of API subscription on devportal
    APIM_ID: "e14sQyGGufr7dW5N8omkS2xHeVga",
    // consumer secret of API subscription on devportal
    APIM_SECRET: "NFZvypAiDQWkBrVjbNScKD8OM1wa",
};
