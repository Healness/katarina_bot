import R from 'ramda';
import { RichEmbed } from 'discord.js';

import { COLOR_INFO } from '../util/constants';
import { formatDescription } from '../util';
import { joinWithArray } from '../util/helpers';

export const handler = R.once(async ({ commands, message }) => {
  const embed = new RichEmbed();

  embed.setColor(COLOR_INFO).setTitle('COMMANDS LIST');

  const keys = Array.from(commands.commands.keys());

  keys.forEach((key) => {
    if (key !== 'help') {
      const { name, description, aliases, parameters } = commands.get(key);
      embed.addField(
        joinWithArray(name, aliases),
        formatDescription({ parameters, description, commandName: name })
      );
    }
  });

  return message.channel.send({ embed });
});

export default () => ({
  handler,
  triggers: ['help'],
  description: 'Prints all available commands',
});
