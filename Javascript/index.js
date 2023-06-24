const axios = require('axios');
const { DateTime } = require('luxon');

const token = "User Token";
let status = true;

// Made by Mr Cerise

const statusList = [
  {
    text: "Text 1",
    emojiId: "ID",
    interval: 3000
  },
  {
    text: "Text 2",
    emojiId: null,
    interval: 5000
  },
  {
    text: "Text 3",
    emojiId: null,
    interval: 7000 // Interval in MS
  }
];

// Made by Mr Cerise

async function updateStatus(text, emojiId ) {
  try {
    const url = "https://discord.com/api/v10/users/@me/settings";
    const headers = { "Authorization": token };
    const payload = {
      "custom_status": {
        "text": text,
        "emoji_id": emojiId
      }
    };
    const response = await axios.patch(url, payload, { headers });
    return response.status === 200;
  } catch (error) {
    console.log(`Failed to update status. Error: ${error}`);
    return false;
  }
}

// Made by Mr Cerise

async function main() {
  while (status) {
    for (const statusItem of statusList) {
      const { text, emojiId, interval } = statusItem;
      const updated = await updateStatus(text, emojiId);
      if (updated) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      } else {
        break;
      }
    }
  }
}

// Made by Mr Cerise
console.log("Working - By Mr Cerise");

main();