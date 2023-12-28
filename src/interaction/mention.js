const checkNobot = async(event) => {
  const re = /\#nobot/;
  return re.test(event.payload.account.note);
}

const reblogParent = async(statusId, mastoConnection) => {
  console.log("Reblogging status", statusId);
  mastoConnection.v1.statuses.$select(statusId).reblog();
}
