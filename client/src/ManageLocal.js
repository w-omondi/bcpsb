export const updateLocation = (location) => {
  localStorage.setItem("location", location);
};
export const updateApplicantId = (applicantId) => {
  localStorage.setItem("applicantId", applicantId);
};
export const updateApplicantionStatus = (completed) => {
  localStorage.setItem("done", completed);
};
