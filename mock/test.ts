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
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: null,
      };
    },
  },
  {
    url: '/api/verifyCode',
    method: 'post',
    timeout: 500,
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
    timeout: 1000,
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
  {
    url: '/api/case/detail',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: 1,
          caseName: '案件1',
          applicant: '申请人1',
          respondent: 'A large temple dedicated to the goddess Artemis, one of the Seven Wonders of the Ancient World',
          applyTime: '2021-01-01',
          filingAmount: 132323,
          filingTime: '2021-01-02',
          status: '已处理',
        },
      };
    },
  },
] as MockMethod[];
