// Tạo ghi chú mới
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const text = typeof body?.text === 'string' ? body.text.trim() : ''

    if (!text) {
        throw createError({ statusCode: 400, message: 'Thiếu nội dung ghi chú' })
    }

    const notes = await readNotes()
    const id = notes.reduce((max, n) => Math.max(max, n.id), 0) + 1
    const note = { id, text, done: false, description: '', tasks: [] }

    notes.push(note)
    await writeNotes(notes)

    setResponseStatus(event, 201)
    return note
})