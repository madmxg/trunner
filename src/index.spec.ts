import 'mocha';
import { expect } from 'chai';
import runner from './index';

describe('runner', function() {
  it('Pass promise function to runner', async () => {
    function exec(data: any): Promise<any> {
      return Promise.resolve(1);
    }
    const result: any[] = await runner([exec]);
    expect(result[0]).to.equal(1);
  });

  // it('Pass async function to runner', async () => {
  //   async function exec(): Promise<any> {
  //     function sleep(time: number) {
  //       return new Promise((resolve) => {
  //         setTimeout(resolve, time);
  //       });
  //     }

  //     await sleep(50);
  //     return Promise.resolve(1);
  //   }

  //   const result = await runner([exec]);
  //   expect(result).to.equal(1);
  // });

  // it('Pass array of async function to runner', async () => {
  //   async function exec(): Promise<any> {
  //     function sleep(time: number) {
  //       return new Promise((resolve) => {
  //         setTimeout(resolve, time);
  //       });
  //     }

  //     await sleep(50);
  //     return Promise.resolve(1);
  //   }

  //   const result = await runner([exec]);
  //   expect(result[0]).to.equal(1);
  //   expect(result[1]).to.equal(1);
  // });
});
