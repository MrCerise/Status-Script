const fetch = require('node-fetch');
const axios = require('axios');
const { DateTime } = require('luxon');

const token = "User Token";
let status = true;

const statusList = [
  {
    "text": "Text 1",
    "emoji_id": "ID",
    "emoji_name": "Name", // :css:
    "interval": 3000, // Time in ms
    "status": "dnd" // online,idle,offline,dnd
  },
  {
    "text": "Text 2",
    "emoji_id": null,
    "emoji_name": null,
    "interval": 5000,
    "status": "idle"
  },
  {
    "text": "Text 3",
    "emoji_id": null,
    "emoji_name": null,
    "interval": 7000,
    "status": "online"
  }
];

async function updateStatus(text, emoji_id, emoji_name, status) {
  try {
    const url = 'https://discord.com/api/v10/users/@me/settings';
    const headers = { Authorization: token };
    const payload = {
      custom_status: {
        text,
        emoji_id,
        emoji_name
      },
      status: status.toString()
    };
    const response = await axios.patch(url, payload, { headers });
    console.log('Updated');
    return response.status === 200;
  } catch (error) {
    console.log(`Failed to update status. Error: ${error}`);
    return false;
  }
}

async function main(status) {
  while (status) {
    for (const statusItem of statusList) {
      const { text, emoji_id, emoji_name, interval } = statusItem;
      const updated = await updateStatus(text, emoji_id, emoji_name, statusItem.status);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
}

main(status);
