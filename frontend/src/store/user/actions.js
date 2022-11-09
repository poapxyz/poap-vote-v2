const poapApiUrl = 'https://api.poap.tech';
const poapApiApiKey = 'hVWzovj27w9NmjN6Vzw1Wp8rysVSnQYV06WGfMSBWRkZvSlVbadmtwSroHk4wfq9iS1J3R7rF5FxshKYEa1016XElaC6OHquA5JgYLrAwN21K1emQ1VCf08sEOR1YqLG';
const jsonFetch = (path) => fetch(`${poapApiUrl}${path}`, { headers: { 'x-api-key': poapApiApiKey } })
  .then((res) => res.json());

export async function setEthereumData({ commit }, wallet) {
  // Get user's POAP tokens
  const path = `/actions/scan/${wallet}`;
  const tokens = await jsonFetch(path);

  // Commit all state changes simultaneously to avoid UI inconsistencies
  commit('setWallet', wallet);
  commit('setTokens', tokens);
}
