
const checkParent = async(event) => {
  const re = /\#nobot/;
  return re.test(event.payload.account.note);
}

const reblogParent = async(statusId, mastoConnection) => {
  mastoConnection.v1.statuses.$select(statusId).reblog();
}
