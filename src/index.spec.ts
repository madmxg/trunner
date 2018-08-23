import 'mocha';
import { expect } from 'chai';
import runner from './index';

describe('runner', function() {
  function sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  function promiseJob(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  async function asyncJob(data: any): Promise<any> {
    await sleep(12);
    return Promise.resolve(data);
  }

  it('Pass promise function to runner', async () => {
    const reference = new Date().valueOf();
    const result: any[] = await runner([promiseJob.bind(null, reference)]);
    expect(result[0]).to.equal(reference);
  });

  it('Pass async function to runner', async () => {
    const reference = new Date().valueOf();
    const result: any[] = await runner([asyncJob.bind(null, reference)]);
    expect(result[0]).to.equal(reference);
  });

  it('Pass array of async function to runner', async () => {
    const reference1 = new Date().valueOf();
    const reference2 = new Date().valueOf();
    const reference3 = new Date().valueOf();
    const result: any[] = await runner([
      asyncJob.bind(null, reference1),
      asyncJob.bind(null, reference2),
      asyncJob.bind(null, reference3),
    ]);
    expect(result.length).to.equal(3);
    expect(result[0]).to.equal(reference1);
    expect(result[1]).to.equal(reference2);
    expect(result[2]).to.equal(reference3);
  });
});
