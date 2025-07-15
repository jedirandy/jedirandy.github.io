import { describe, it, expect } from 'vitest'
import History from '../src/history'

describe('history', () => {
  it('pushes history', () => {
    const h = new History()
    h.push('test')
    h.push('abc')
    h.push('test')
    expect(h.entries).toHaveLength(2)
    expect(h.entries).toEqual(['abc', 'test'])
  })
  it('returns prev entry', () => {
    const h = new History(['a', 'b'])
    expect(h.prev()).toBe('b')
    expect(h.prev()).toBe('a')
    expect(h.prev()).toBe('a')
  })
  it('returns next entry', () => {
    const h = new History(['a', 'b'])
    h.prev()
    h.prev()
    expect(h.next()).toBe('b')
    expect(h.next()).toBe('')
    expect(h.next()).toBe('')
  })
})
