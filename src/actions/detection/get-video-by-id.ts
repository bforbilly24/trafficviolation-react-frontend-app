import axios from 'axios'
import { Videos } from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

const getVideoById = async (videoId: string): Promise<Videos> => {
  try {
    const response = await axios.get(ENDPOINTS.VIDEOS.GET_BY_ID(videoId))

    const modifiedData: Videos = {
      ...response.data,
      file_path: `${ENDPOINTS.BASE.API}/${response.data.file_path.replace(/\\/g, '/')}`,
    }

    return modifiedData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error(
          'Cannot connect to the backend server. Please ensure the server is running.'
        )
      }
      throw new Error(
        error.response?.data?.detail ?? 'Failed to fetch video by id'
      )
    }
    throw new Error('An unexpected error occurred')
  }
}

export { getVideoById }
