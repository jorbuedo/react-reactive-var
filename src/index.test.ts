import { makeVar, useReactiveVar } from './'
import { renderHook, act } from '@testing-library/react-hooks'

describe('makeVar', () => {
  it('creates a ReactiveVariable that can be read and updated', () => {
    const testVar = makeVar('TEST_VARIABLE')

    expect(testVar()).toBe('TEST_VARIABLE')

    testVar('TEST_UPDATED')

    expect(testVar()).toBe('TEST_UPDATED')
  })

  it('creates a ReactiveVariable that can be subscribed for updates', () => {
    const testVar = makeVar('TEST_VARIABLE')
    const handler = jest.fn()

    testVar.subscribe(handler)

    testVar('TEST_UPDATED')

    expect(handler).toHaveBeenCalledWith('TEST_UPDATED')
  })

  it('creates a ReactiveVariable that can be unsuscribed after subscription', () => {
    const testVar = makeVar('TEST_VARIABLE')
    const handler = jest.fn()

    testVar.subscribe(handler)
    testVar.unsubscribe(handler)

    testVar('TEST_UPDATED')

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('useReactiveVar', () => {
  it('reacts the hooked component to a ReactiveVariable', async () => {
    const testVar = makeVar('TEST_VARIABLE')
    const hook = jest.fn()
    hook.mockImplementation(() => useReactiveVar(testVar))

    const { result, unmount } = renderHook(hook)

    expect(result.current).toBe('TEST_VARIABLE')
    expect(hook).toHaveBeenCalledTimes(1)

    act(() => {
      testVar('TEST_UPDATED')
    })

    expect(result.current).toBe('TEST_UPDATED')
    expect(hook).toHaveBeenCalledTimes(2)

    unmount()

    act(() => {
      testVar('TEST_FINISHED')
    })

    expect(hook).toHaveBeenCalledTimes(2)
    expect(result.current).toBe('TEST_UPDATED')
    expect(result.current).not.toBe('TEST_FINISHED')
    expect(testVar()).toBe('TEST_FINISHED')
  })
})
