import axios from 'axios'
import { UploadRequest, UploadResponse } from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

export const postVideoFile = async (
  data: UploadRequest
): Promise<UploadResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', data.file)
    const response = await axios.post(ENDPOINTS.VIDEO.POST, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data as UploadResponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail ?? 'Upload failed')
    }
    throw new Error('An unexpected error occurred during upload file')
  }
}

export const uploadMutation = () => ({
  mutationFn: (data: UploadRequest) => postVideoFile(data),
})
