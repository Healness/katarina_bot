import R from 'ramda';
import { Response } from 'ghastly/command';
import { RichEmbed } from 'discord.js';

import { COLORS } from '../../util/constants';

export class ImageResponse extends Response {
  constructor(image, content, { message }) {
    super(async () => {
      const embed = new RichEmbed();
      embed
        .setColor(COLORS.INFO)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(content)
        .setImage(image);

      return message.channel.send({ embed });
    });
  }
}

export default R.construct(ImageResponse);
