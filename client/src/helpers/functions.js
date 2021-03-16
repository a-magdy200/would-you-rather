const filterPollsBy = (polls, filterBy, userId) => {
  let filteredPolls;
  switch (filterBy) {
    case 'latest':
      filteredPolls = polls.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'top':
      filteredPolls = polls.sort((a, b) => b.totalAnswersCount - a.totalAnswersCount);
      break;
    case 'answered':
      if (userId === '') {
        filteredPolls = polls.filter((poll) => poll.answeredBy.length !== 0);
      } else {
        filteredPolls = polls.filter((poll) => poll.answeredBy.indexOf(userId) !== -1);
      }
      break;
    case 'unanswered':
      if (userId === '') {
        filteredPolls = polls.filter((poll) => poll.answeredBy.length === 0);
      } else {
        filteredPolls = polls.filter((poll) => poll.answeredBy.indexOf(userId) === -1);
      }
      break;
    default:
      filteredPolls = [...polls];
  }
  return filteredPolls;
};

const formatAuthorizationHeaders = token => {
  return {'Authorization': `Bearer ${token}`};
}
export {
  filterPollsBy,
  formatAuthorizationHeaders,
}
