import { type MockMethod } from 'vite-plugin-mock';

const mockCaseList = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `案件${index + 1}`,
  content: `案件${index + 1}内容`,
  createTime: '2021-01-01',
  status: '已处理',
}));

export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: null,
      };
    },
  },
  {
    url: '/api/case/list',
    method: 'post',
    response: ({ body }) => {
      console.log(body);
      return {
        code: 200,
        message: 'success',
        data: {
          list: mockCaseList.slice((body.page - 1) * body.pageSize, body.page * body.pageSize),
          total: mockCaseList.length,
        },
      };
    },
  },
] as MockMethod[];
