// Xóa ghi chú
export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    const notes = await readNotes()
    if (!notes.some((n) => n.id === id)) {
        throw createError({ statusCode: 404, message: 'Không tìm thấy ghi chú' })
    }

    await writeNotes(notes.filter((n) => n.id !== id))
    return { ok: true }
})