import { promises as fs } from 'node:fs'
import { dirname, resolve } from 'node:path'

// File lưu dữ liệu, nằm ở data/notes.json trong thư mục dự án
const FILE = resolve(process.cwd(), 'data/notes.json')

// Dữ liệu mẫu cho lần chạy đầu tiên (khi chưa có file notes.json)
const seed = [
    {
        id: 1,
        text: 'Học Vue 3',
        done: false,
        description: 'Nắm vững phần cốt lõi của Vue trước khi sang Nuxt.',
        tasks: [
            { id: 1, text: 'Cú pháp template: v-if, v-for, v-model', done: true },
            { id: 2, text: 'ref và reactive', done: false },
            { id: 3, text: 'computed và watch', done: false },
            { id: 4, text: 'Component, props và emit', done: false },
            { id: 5, text: 'Vòng đời (onMounted...)', done: false },
        ],
    },
    {
        id: 2,
        text: 'Học Nuxt',
        done: false,
        description: 'Những thứ Nuxt thêm vào trên nền Vue.',
        tasks: [
            { id: 6, text: 'Routing theo file và layout', done: false },
            { id: 7, text: 'useState và composables', done: false },
            { id: 8, text: 'useFetch và server/api', done: false },
            { id: 9, text: 'useHead và SEO', done: false },
        ],
    },
    {
        id: 3,
        text: 'Đọc sách',
        done: false,
        description: 'Mỗi ngày dành 30 phút trước khi ngủ.',
        tasks: [
            { id: 10, text: 'Chọn cuốn sách tiếp theo', done: false },
            { id: 11, text: 'Đọc 20 trang mỗi ngày', done: false },
            { id: 12, text: 'Ghi lại 3 ý chính sau mỗi chương', done: false },
        ],
    },
    {
        id: 4,
        text: 'Tập gym',
        done: false,
        description: 'Ba buổi mỗi tuần, nghỉ xen kẽ giữa các buổi.',
        tasks: [
            { id: 13, text: 'Thứ 2: ngực và vai', done: false },
            { id: 14, text: 'Thứ 4: lưng và tay', done: false },
            { id: 15, text: 'Thứ 6: chân và bụng', done: false },
            { id: 16, text: 'Khởi động 10 phút trước mỗi buổi', done: false },
        ],
    },
    {
        id: 5,
        text: 'Làm slide PowerPoint',
        done: false,
        description: 'Bài thuyết trình cần nộp cuối tuần.',
        tasks: [
            { id: 17, text: 'Lên dàn ý nội dung', done: false },
            { id: 18, text: 'Chọn mẫu và màu sắc', done: false },
            { id: 19, text: 'Làm các slide chính', done: false },
            { id: 20, text: 'Chạy thử và chỉnh sửa', done: false },
        ],
    },
]

export async function readNotes() {
    try {
        return JSON.parse(await fs.readFile(FILE, 'utf-8'))
    } catch {
        // chưa có file (lần đầu chạy): tạo file từ dữ liệu mẫu
        await writeNotes(seed)
        return seed
    }
}

export async function writeNotes(notes) {
    await fs.mkdir(dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(notes, null, 2), 'utf-8')
}