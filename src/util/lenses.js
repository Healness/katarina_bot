import R from 'ramda';

export const lensInvoker = R.curry((arity, prop) => R.lens(R.invoker(arity, prop), R.assoc(prop)));
export const last = R.lens(R.last, (val, array) => R.update(R.dec(R.length(array)), val, array));

export const lensIsFalsy = R.curry((lens, data) => R.compose(R.not, R.view)(lens, data));

const message = R.lensProp('message');
const attachments = R.lensProp('attachments');
const url = R.lensProp('url');
const size = R.lensProp('size');
const args = R.lensProp('args');
const guild = R.lensProp('guild');
const images = R.lensProp('images');
const image = R.lensProp('image');
const ref = R.lensProp('ref');
const user = R.lensProp('user');
const parameters = R.lensProp('parameters');
const description = R.lensProp('description');
const optional = R.lensProp('optional');
const name = R.lensProp('name');
const member = R.lensProp('member');
const voiceChannel = R.lensProp('voiceChannel');
const voiceChannelID = R.lensProp('voiceChannelID');
const voiceConnection = R.lensProp('voiceConnection');
const id = R.lensProp('id');
const channel = R.lensProp('channel');
const joinable = R.lensProp('joinable');
const speakable = R.lensProp('speakable');
const entities = R.lensProp('entities');
const allIds = R.lensProp('allIds');

const first = lensInvoker(0, 'first');

const head = R.lensIndex(0);

const messageAttachments = R.compose(message, attachments);
const messageAttachmentsSize = R.compose(messageAttachments, size);
const messageAttachmentsFirst = R.compose(messageAttachments, first);
const messageAttachmentsFirstUrl = R.compose(messageAttachmentsFirst, url);
const messageMember = R.compose(message, member);
const messageMemberVoiceChannelID = R.compose(messageMember, voiceChannelID);
const messageMemberVoiceChannel = R.compose(messageMember, voiceChannel);
const messageMemberVoiceChannelJoinable = R.compose(messageMemberVoiceChannel, joinable);
const messageMemberVoiceChannelSpeakable = R.compose(messageMemberVoiceChannel, speakable);
const messageGuild = R.compose(message, guild);
const messageGuildVoiceConnection = R.compose(messageGuild, voiceConnection);
const messageGuildVoiceConnectionChannel = R.compose(messageGuildVoiceConnection, channel);
const messageGuildVoiceConnectionChannelId = R.compose(messageGuildVoiceConnectionChannel, id);

const argsUrl = R.compose(args, url);
const argsRef = R.compose(args, ref);

const guildImages = R.compose(guild, images);

const userImages = R.compose(user, images);

const allIdsLast = R.compose(allIds, last);
const allIdsHead = R.compose(allIds, head);

export default {
  parameters,
  description,
  image,
  optional,
  name,
  ref,
  entities,
  args: Object.assign(args, {
    url: argsUrl,
    ref: argsRef,
  }),
  message: Object.assign(message, {
    attachments: Object.assign(messageAttachments, {
      size: messageAttachmentsSize,
      first: Object.assign(messageAttachmentsFirst, {
        url: messageAttachmentsFirstUrl,
      }),
    }),
    member: Object.assign(messageMember, {
      voiceChannelID: messageMemberVoiceChannelID,
      voiceChannel: Object.assign(messageMemberVoiceChannel, {
        joinable: messageMemberVoiceChannelJoinable,
        speakable: messageMemberVoiceChannelSpeakable,
      }),
    }),
    guild: Object.assign(messageGuild, {
      voiceConnection: Object.assign(messageGuildVoiceConnection, {
        channel: Object.assign(messageGuildVoiceConnectionChannel, {
          id: messageGuildVoiceConnectionChannelId,
        }),
      }),
    }),
  }),
  guild: Object.assign(guild, {
    images: guildImages,
  }),
  user: Object.assign(user, {
    images: userImages,
  }),
  allIds: Object.assign(allIds, {
    last: allIdsLast,
    head: allIdsHead,
  }),
};
