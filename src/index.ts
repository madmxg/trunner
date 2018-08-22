export default function runner(
  jobs: ((data?: any) => Promise<any>)[],
  inputs?: { list?: any[]; value?: any },
  options: { parallel: boolean } = { parallel: false },
): Promise<any> {
  if (inputs && inputs.list && inputs.value) {
    return Promise.reject(new Error('inputs.list && inputs.value'));
  }

  let list: any[];
  let value: any;
  if (inputs && Array.isArray(inputs.list)) {
    if (jobs.length !== inputs.list.length) {
      return Promise.reject(new Error('jobs.length !== list.length'));
    }
    list = inputs.list;
  } else if (inputs && inputs.value) {
    value = inputs.value;
  }

  if (options.parallel) {
    return Promise.all(jobs.map((job, index) => job(list ? list[index] : value)));
  }

  let chain = Promise.resolve();
  const result: any[] = [];
  jobs.forEach((job, index) => {
    chain = chain.then((out) => {
      if (0 !== index) {
        result.push(out);
      }
      return job(list ? list[index] : value);
    });
  });
  return chain.then((out) => {
    result.push(out);
    return result;
  });
}
