const sortByLatest = (array) => {
  return array.sort((a, b) => {
    let dateA = new Date(a.createdAt);
    dateA = dateA.getTime();
    let dateB = new Date(b.createdAt);
    dateB = dateB.getTime();
    return dateB - dateA;
  });
}

const filterPollsBy = (polls, filterBy, userId) => {
  let filteredPolls;
  switch (filterBy) {
    case 'latest':
      filteredPolls = sortByLatest(polls);
      break;
    case 'top':
      filteredPolls = polls.sort((a, b) => b.totalAnswersCount - a.totalAnswersCount);
      break;
    case 'answered':
      if (userId === '') {
        filteredPolls = sortByLatest(polls.filter((poll) => poll.answeredBy.length !== 0));
      } else {
        filteredPolls = sortByLatest(polls.filter((poll) => poll.answeredBy.indexOf(userId) !== -1));
      }
      break;
    case 'unanswered':
      if (userId === '') {
        filteredPolls = sortByLatest(polls.filter((poll) => poll.answeredBy.length === 0));
      } else {
        filteredPolls = sortByLatest(polls.filter((poll) => poll.answeredBy.indexOf(userId) === -1));
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
  sortByLatest,
  formatAuthorizationHeaders,
}
