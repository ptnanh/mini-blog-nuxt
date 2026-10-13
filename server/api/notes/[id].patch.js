// Sửa một phần ghi chú
export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    const notes = await readNotes()
    const note = notes.find((n) => n.id === id)
    if (!note) {
        throw createError({ statusCode: 404, message: 'Không tìm thấy ghi chú' })
    }

    // chỉ nhận những trường hợp lệ, bỏ qua mọi thứ khác
    if (typeof body?.text === 'string' && body.text.trim()) {
        note.text = body.text.trim()
    }
    if (typeof body?.done === 'boolean') note.done = body.done
    if (typeof body?.description === 'string') note.description = body.description
    if (Array.isArray(body?.tasks)) {
        note.tasks = body.tasks.map((t) => ({
            id: Number(t.id),
            text: String(t.text),
            done: Boolean(t.done),
        }))
    }

    await writeNotes(notes)
    return note
})