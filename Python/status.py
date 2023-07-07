import requests
import time
import discord

token = "User Token"
status = True

status_list = [
  {
    "text": "Text 1",
    "emoji_id": "ID",
    "emoji_name": "Name", # :css:
    "interval": 3000, # Time in ms
    "status": discord.Status.dnd # online,idle,offline,dnd
  },
  {
    "text": "Text 2",
    "emoji_id": None,
    "emoji_name": None,
    "interval": 5000,
    "status": discord.Status.idle
  },
  {
    "text": "Text 3",
    "emoji_id": None,
    "emoji_name": None,
    "interval": 7000,
    "status": discord.Status.online
  }
]

def update_status(text, emoji_id, emoji_name, status):
  try:
    url = "https://discord.com/api/v10/users/@me/settings"
    headers = {"Authorization": token}
    payload = {
      "custom_status": {
        "text": text,
        "emoji_id": emoji_id,
        "emoji_name": emoji_name
      },
      "status": str(status)
    }
    response = requests.patch(url, json=payload, headers=headers)
    print("Updated")
    return response.status_code == 200
  except requests.exceptions.RequestException as error:
    print(f"Failed to update status. Error: {error}")
    return False

def main(status):
  while status:
    for status_item in status_list:
      text = status_item["text"]
      emoji_id = status_item["emoji_id"]
      emoji_name = status_item["emoji_name"]
      interval = status_item["interval"]
      status = status_item["status"]
      updated = update_status(text, emoji_id, emoji_name, status)
      time.sleep(interval / 1000)

main(status)
