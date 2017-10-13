import R from 'ramda';

import { createContext } from '../../../util/tests';
import { lenses } from '../../../util';
import expectRefToBeUnique, { messages } from '../expectRefToBeUnique';

describe('expectRefToBeUnique', () => {
  const next = R.identity;

  it('should dispatch an error when the image with given ref already exists', async () => {
    const ref = 'foo';
    const context = createContext({
      args: { ref },
      user: {
        images: [{ ref: 'bar' }, { ref }],
      },
      guild: {
        images: [{ ref: 'bar' }, { ref }],
      },
    });
    const errorResponseA = await expectRefToBeUnique(R.view(lenses.user.images))(next, context);
    const errorResponseB = await expectRefToBeUnique(R.view(lenses.guild.images))(next, context);
    const responseA = await errorResponseA.executor(context);
    const responseB = await errorResponseB.executor(context);

    expect(responseA.embed.fields[1].value).toBe(messages.msg1);
    expect(responseB.embed.fields[1].value).toBe(messages.msg1);
  });

  it('should successfully pass through when the image with given ref isn\'t found', async () => {
    const ref = 'foo';
    const context = createContext({
      args: { ref },
      user: {
        images: [{ ref: 'bar' }],
      },
    });
    const nextContext = await expectRefToBeUnique(R.view(lenses.user.images))(next, context);

    expect(nextContext).toEqual(context);
  });
});