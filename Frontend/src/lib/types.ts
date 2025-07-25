export interface User {
  _id: string
  name: string
  avatar: string
}

export interface Mission {
  _id: string
  title: string
  description: string
  status: "ongoing" | "completed" | "failed" | "martyred"
  assignedTo: User[]
  createdAt: Date
  updatedAt: Date
}
