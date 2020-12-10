

  // var urlString = "https://api.beatmysugar.com/BackofficeApi/";
  // const urlString = "http://localhost:8080/BackofficeApi/";
  // const urlString = "https://65.0.39.41:8080/BackofficeApi/"; 

  const urlString = "http://13.126.17.107:8085/backofficeapi";

const PostApiCall = {
  postRequest(userData,url) {


   return fetch(urlString+url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers' : '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
     
    })
    .then(response => {
      // console.log(response)
      return(response)
     
    })
    .catch(error => { console.log('request failed', error); 
    return error;
  });
  },
};

export default PostApiCall;