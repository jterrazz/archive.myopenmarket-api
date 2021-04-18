const getQueueMock = () => ({
  add: jest.fn(),
});

export const orderQueue = getQueueMock();
export const emailQueue = getQueueMock();
