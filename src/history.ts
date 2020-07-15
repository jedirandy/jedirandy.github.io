class History {
    entries: string[]
    cursor: number

    constructor(entries: string[] = []) {
        this.entries = entries
        this.cursor = this.entries.length - 1
    }

    push(entry: string) {
        const index = this.entries.findIndex(v => v === entry)
        if (index !== -1) {
            this.entries.splice(index, 1)
        }
        this.entries.push(entry)
        this.cursor = this.entries.length - 1
    }

    prev(): string {
        if (this.cursor >= 0) {
            const index = this.cursor
            this.cursor = Math.max(this.cursor - 1, 0)
            return this.entries[index]
        }
        return ''
    }

    next(): string {
        if (this.cursor < this.entries.length - 1) {
            const index = this.cursor
            this.cursor = Math.min(this.cursor + 1, this.entries.length - 1)
            return this.entries[index + 1]
        }
        return ''
    }
}

export default History
