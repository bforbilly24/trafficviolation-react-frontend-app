import axios from 'axios'
import { ViolationResponse } from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

const getViolation = async (
  videoId: string,
  page: number = 1,
  limit: number = 10
): Promise<ViolationResponse> => {
  try {
    const response = await axios.get(ENDPOINTS.VIOLATIONS.GET(videoId), {
      params: { page, limit },
    })

    const modifiedData: ViolationResponse = {
      ...response.data,
      violations: response.data.violations.map((violation: any) => ({
        ...violation,
        image_path: `${ENDPOINTS.BASE.API}/${violation.image_path.replace(/\\/g, '/')}`,
      })),
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
        error.response?.data?.detail ?? 'Failed to fetch violations'
      )
    }
    throw new Error('An unexpected error occurred')
  }
}

export { getViolation }
