const fetch = jest.fn(() => { Promise.then(() => ({message:'ok', status:200})) .catch(() => ({message:'fail', status:400}))});

export default fetch