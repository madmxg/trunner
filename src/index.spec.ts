import 'mocha';
import { expect } from 'chai';
import runner from './index';

describe('runner', function() {
  it('Pass promise function to runner', async () => {
    const reference = new Date().valueOf();
    function exec(data: any = reference): Promise<any> {
      return Promise.resolve(data);
    }

    const result: any[] = await runner([exec]);
    expect(result[0]).to.equal(reference);
  });

  it('Pass async function to runner', async () => {
    const reference = new Date().valueOf();
    async function exec(data: any = reference): Promise<any> {
      function sleep(time: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      await sleep(12);
      return Promise.resolve(data);
    }

    const result: any[] = await runner([exec]);
    expect(result[0]).to.equal(reference);
  });

  it('Pass array of async function to runner', async () => {
    const reference = new Date().valueOf();
    async function exec(data: any = reference): Promise<any> {
      function sleep(time: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      await sleep(12);
      return Promise.resolve(data);
    }

    const result: any[] = await runner([exec, exec, exec]);
    expect(result.length).to.equal(3);
    expect(result[0]).to.equal(reference);
    expect(result[1]).to.equal(reference);
    expect(result[2]).to.equal(reference);
  });
});
