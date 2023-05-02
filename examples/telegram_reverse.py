"""
MIT License

Copyright (c) 2023 SOME-1HING

This file uses the "google-reverse-image-api" API made by "SOME-1HING"
(https://github.com/SOME-1HING/google-reverse-image-api) under the terms of the MIT license.

"""

import requests
from pyrogram import filters, client  # Pyrogram v2.0 and up
from pyrogram.enums import ParseMode
from pyrogram.types import InlineKeyboardButton, InlineKeyboardMarkup, Message

from Shikimori import pbot, TOKEN  # Look https://www.github.com/SOME-1HING/ShikimoriBot

API_URL = "https://google-reverse-image-api.vercel.app/reverse"


async def get_file_id_from_message(message: Message):
    file_id = None
    message = message.reply_to_message
    if not message:
        return None
    if message.document:
        if int(message.document.file_size) > 3145728:
            return
        mime_type = message.document.mime_type
        if mime_type not in ("image/png", "image/jpeg"):
            return
        file_id = message.document.file_id

    if message.sticker:
        if message.sticker.is_animated:
            if not message.sticker.thumbs:
                return
            file_id = message.sticker.thumbs[0].file_id
        else:
            file_id = message.sticker.file_id

    if message.photo:
        file_id = message.photo.file_id

    if message.animation:
        if not message.animation.thumbs:
            return
        file_id = message.animation.thumbs[0].file_id

    if message.video:
        if not message.video.thumbs:
            return
        file_id = message.video.thumbs[0].file_id
    return file_id


@pbot.on_message(filters.command(["pp", "grs", "reverse"]))
async def reverse(app: client, msg: Message):
    text = await msg.reply("```Parsing Media...```", parse_mode=ParseMode.MARKDOWN)
    file_id = await get_file_id_from_message(msg)
    if not file_id:
        return await text.edit(
            "Reply to a Photo or sticker", parse_mode=ParseMode.MARKDOWN
        )
    await text.edit("```Searching...```", parse_mode=ParseMode.MARKDOWN)

    r = requests.post(
        f"https://api.telegram.org/bot{TOKEN}/getFile?file_id={file_id}"
    ).json()
    file_path = r["result"]["file_path"]

    data = {
        "imageUrl": f"https://images.google.com/searchbyimage?safe=off&sbisrc=tg&image_url=https://api.telegram.org/file/bot{TOKEN}/{file_path}"
    }

    response = requests.post(API_URL, json=data)

    if response.status_code == 200:
        result = response["data"]
        return await text.edit(
            f'Sauce: ```{result["output"]}```',
            parse_mode=ParseMode.MARKDOWN,
            reply_markup=InlineKeyboardMarkup(
                [[InlineKeyboardButton("Link", url=result["similar"])]]
            ),
        )
    elif response.status_code == 401:
        return await text.edit(
            "```Couldn't find anything```", parse_mode=ParseMode.MARKDOWN
        )
    elif response.status_code == 402:
        return await text.edit(
            "```Failed to reverse image```", parse_mode=ParseMode.MARKDOWN
        )
    elif response.status_code <= 500:
        return await text.edit("```Error in API```", parse_mode=ParseMode.MARKDOWN)
    else:
        return await text.edit(
            "```Unknown Error Occurred```", parse_mode=ParseMode.MARKDOWN
        )
