interface UploadRequest {
  file: File
}

interface UploadResponse {
  status: string
  id: number
  filename: string
  path: string
}

interface DetectionStreamData {
  traffic_light_status?: string
  traffic_light_violator_counter?: number
  wrong_way_violator_counter?: number
  helmet_violator_counter?: number
}

interface DetectionVideoStreamData {
  stream: 'stream1' | 'stream2'
  url: string
}

interface ViolationStreamData {
  violation_id: number
  violation_type: string
  image_path: string
  created_at: string
  image_url: string
}

interface ViolationResponse {
  violations: Violations[]
  pagination: Pagination
}

interface Violations {
  id: number
  violation_type: string
  image_path: string
  created_at: string
}

interface VideosResponse {
  videos: Videos[]
  pagination: Pagination
}

interface Videos {
  id: number
  file_path: string
  file_name: string
  duration: string
  created_at: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  total_pages: number
}

export type {
  UploadRequest,
  UploadResponse,
  DetectionStreamData,
  DetectionVideoStreamData,
  ViolationStreamData,
  Violations,
  ViolationResponse,
  Videos,
  VideosResponse,
}
