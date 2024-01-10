/**
 * Makes a POST request to api with given endpoint and data
 * @param {string} endpoint - eg. "triage" or "diagnosis"
 * @param {number} age - Age of user
 * @param {string} sex - Value of user's gender
 * @param {evidence} evidence - gathered evidences.
 * @param {object} bodyAssign - object with properties spreaded and added to body
 */

const api = async (
  endpoint,
  age,
  sex,
  evidence,
  interviewId,
  method,
  bodyAssign
) => {
  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Interview-Id": interviewId,
    },
  };
  if (method !== "GET")
    Object.assign(options, {
      body: JSON.stringify({
        age: {
          value: age,
        },
        sex,
        evidence,
        ...bodyAssign,
      }),
    });
  return fetch(`http://localhost:8082/${endpoint}`, options);
};

export default api;
