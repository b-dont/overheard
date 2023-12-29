import 'dotenv/config'
import MastoConnections from '../src/connections/mastoConnector.js';

const connector = new MastoConnections(process.env.URL, process.env.STREAM_URL, process.env.TOKEN);
const connection = connector.restConnection();

function checkNobot(accountBio) {
  const re = new RegExp("\#nobot/");
  var hasNobot = re.test(accountBio);
  if (hasNobot)
    console.log("#nobot found")
  else
    console.log("#nobot not found")
};

const getBio = async(connection) => {
  const user = await connection.v1.accounts.lookup({
    acct: '@btp@fosstodon.org'
  });
  console.log(`User: ${user.note}`);
};

try {
  getBio(connection);
} catch (error) {
  console.error(error);
}
