import { promiseMap } from './promise-map.helper';

describe('The "promiseMap" helper function', () => {
  it('Should sequentially map over promises', async () => {
    const tasks = (pusher: (n: number) => () => {}) => [
      () => Promise.resolve(pusher(1)()).then(pusher(2)).then(pusher(3)).then(() => 3),
      () => Promise.resolve(pusher(4)()).then(pusher(5)).then(pusher(6)).then(() => 6),
      () => Promise.resolve(pusher(7)()).then(pusher(8)).then(pusher(9)).then(() => 9),
    ];

    const mutating: number[] = [];
    const push = (n: number) => () => mutating.push(n);

    const result = await promiseMap(tasks(push))();
    expect(mutating).toMatchObject([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);
    expect(result).toMatchObject([
      3, 6, 9
    ]);
  });

  it('Should produce a different output than "Promise.all"', async () => {
    const tasks = (pusher: (n: number) => () => {}) => [
      () => Promise.resolve(pusher(1)()).then(pusher(2)).then(pusher(3)).then(() => 3),
      () => Promise.resolve(pusher(4)()).then(pusher(5)).then(pusher(6)).then(() => 6),
      () => Promise.resolve(pusher(7)()).then(pusher(8)).then(pusher(9)).then(() => 9),
    ];

    const mutatingSeq: number[] = [];
    const pushSeq = (n: number) => () => mutatingSeq.push(n);

    const mutatingParallel: number[] = [];
    const pushParallel = (n: number) => () => mutatingParallel.push(n);

    const promiseMapResult = await promiseMap(tasks(pushSeq))();
    expect(mutatingSeq).toMatchObject([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);

    const promiseAllResult = await Promise.all(tasks(pushParallel).map(task => task()));
    expect(mutatingParallel).toMatchObject([
      1, 4, 7,
      2, 5, 8,
      3, 6, 9,
    ]);
    expect(promiseMapResult).toMatchObject([
      3, 6, 9
    ]);
    expect(promiseMapResult).toMatchObject(promiseAllResult);
  });
});
