import axios from "axios";

const checkPullRequest = (github_url) => {
  axios
    .head(github_url)
    .then((response) => {
      return response.status === 302 ? true : false;
    })
    .catch(() => {
      return false;
    });
};

export default checkPullRequest;
