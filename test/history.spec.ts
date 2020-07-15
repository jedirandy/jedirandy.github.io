import { expect } from 'chai'
import History from '../src/history'

describe('history', () => {
    it('pushes history', () => {
        const h = new History()
        h.push('test')
        h.push('abc')
        h.push('test')
        expect(h.entries).to.have.length(2)
        expect(h.entries).to.deep.equal(['abc', 'test'])
    })
    it('returns prev entry', () => {
        const h = new History(['a', 'b'])
        expect(h.prev()).to.equal('b')
        expect(h.prev()).to.equal('a')
        expect(h.prev()).to.equal('a')
    })
    it('returns next entry', () => {
        const h = new History(['a', 'b'])
        h.prev()
        h.prev()
        expect(h.next()).to.equal('b')
        expect(h.next()).to.equal('')
        expect(h.next()).to.equal('')
    })
})