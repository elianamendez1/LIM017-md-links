const fetch = jest.fn(() => { Promise.resolve ({message:"ok", status:200}) });

export default fetch