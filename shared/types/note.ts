export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export interface Note {
  id: number;
  text: string;
  done: boolean;
  description: string;
  tasks: Task[];
}

export type NoteFilter = "all" | "todo" | "done";

// dữ liệu được phép gửi lên khi sửa một ghi chú (tất cả đều không bắt buộc)
export type NotePatch = Partial<
  Pick<Note, "text" | "done" | "description" | "tasks">
>;
