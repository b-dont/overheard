import 'dotenv/config'
import MastoConnections from '../src/connections/mastoConnector.js';

const accountId = "110345242357005448"

const checkNobot = async(accountBio) => {
  const re = new RegExp("\#nobot/");
  var hasNobot = re.test(accountBio);
  if (hasNobot)
    console.log("#nobot found")
  else
    console.log("#nobot not found")
};

const getBio = async(userId) => {
  const connection = new MastoConnections(process.env.URL, process.env.STREAM_URL, process.env.TOKEN);
  const mastoConnection = connection.restConnection();
  const user = mastoConnection.v1.accounts.$select(userId).note;
  const bio = user.note;

//  checkNobot(bio);
  console.log(bio)

};

try {
  await getBio(accountId);
} catch (error) {
  console.error(error);
}
