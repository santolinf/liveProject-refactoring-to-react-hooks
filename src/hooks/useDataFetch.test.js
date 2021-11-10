import { renderHook } from '@testing-library/react-hooks';
import { useDataFetch } from './useDataFetch';

it('should not call fetch when no endpoint url', () => {
  const { state } = renderHook(() => useDataFetch());

  expect(state).toBeUndefined();
});

it('should call fetch with endpoint url', async () => {
  const expected = {
    loading: false,
    success: true,
    data: [
      {
        timestamp: "2020-06-17T06:44:02.676475",
        amount: 1902,
      },
      {
        timestamp: "2020-06-17T06:45:30.983656",
        amount: 893,
      }
    ]
  };

  jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve(expected)
    };
    return Promise.resolve(fetchResponse);
  });

  const { result, waitForNextUpdate } = renderHook(() => useDataFetch("/api/sales/"));

  await waitForNextUpdate();

  expect(result.current.error).toBeUndefined();
  expect(result.current.data).toMatchObject(expected);

  window.fetch.mockRestore();
});

it('should handle error when api is unavailable', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDataFetch("/api/sales/"));

  await waitForNextUpdate();

  expect(result.current.error).toBe("Network request failed");
});

it('should return error when status is not OK', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      ok: false,
      statusText: 'Service is down for maintenance'
    };
    return Promise.resolve(fetchResponse);
  });

  const { result, waitForNextUpdate } = renderHook(() => useDataFetch("/api/sales/"));

  await waitForNextUpdate();

  expect(result.current.error).toBe("Service is down for maintenance");

  window.fetch.mockRestore();
});
