import axios from 'axios'
import { VideosResponse } from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

const getVideos = async (
  page: number = 1,
  limit: number = 10
): Promise<VideosResponse> => {
  try {
    const response = await axios.get(ENDPOINTS.VIDEOS.GET(), {
      params: { page, limit },
    })
    return response.data as VideosResponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error(
          'Cannot connect to the backend server. Please ensure the server is running.'
        )
      }
      throw new Error(error.response?.data?.detail ?? 'Failed to fetch videos')
    }
    throw new Error('An unexpected error occurred')
  }
}

export { getVideos }
