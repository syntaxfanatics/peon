import { promiseForEach } from './promise-for-each.helper';

describe('The "promiseForEach" helper function', () => {
  it('Should sequentially trigger promises', async () => {
    const tasks = (pusher: (n: number) => () => {}) => [
      () => Promise.resolve(pusher(1)()).then(pusher(2)).then(pusher(3)),
      () => Promise.resolve(pusher(4)()).then(pusher(5)).then(pusher(6)),
      () => Promise.resolve(pusher(7)()).then(pusher(8)).then(pusher(9)),
    ];

    const mutating: number[] = [];
    const push = (n: number) => () => mutating.push(n);

    await promiseForEach(tasks(push))();
    expect(mutating).toMatchObject([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);
  });

  it('Should produce a different output than "Promise.all"', async () => {
    const tasks = (pusher: (n: number) => () => {}) => [
      () => Promise.resolve(pusher(1)()).then(pusher(2)).then(pusher(3)),
      () => Promise.resolve(pusher(4)()).then(pusher(5)).then(pusher(6)),
      () => Promise.resolve(pusher(7)()).then(pusher(8)).then(pusher(9)),
    ];

    const mutatingSeq: number[] = [];
    const pushSeq = (n: number) => () => mutatingSeq.push(n);

    const mutatingParallel: number[] = [];
    const pushParallel = (n: number) => () => mutatingParallel.push(n);

    await promiseForEach(tasks(pushSeq))();
    expect(mutatingSeq).toMatchObject([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);

    await Promise.all(tasks(pushParallel).map(task => task()));
    expect(mutatingParallel).toMatchObject([
      1, 4, 7,
      2, 5, 8,
      3, 6, 9,
    ]);
  });
});
