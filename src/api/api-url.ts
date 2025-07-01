import { apiUrl, baseApiUrl, rtspApiUrl, wsApiUrl } from '@/types/environment'

export const ENDPOINTS = {
  BASE: {
    API: `${baseApiUrl}`,
  },
  VIDEO: {
    POST: `${apiUrl}/upload`,
  },
  DETECTIONS: {
    STREAM_DETECTIONS: (videoId: string) =>
      `${wsApiUrl}/ws/detectViolation/${videoId}`,
    STREAM_VIOLATIONS: (videoId: string) =>
      `${wsApiUrl}/ws/streamViolation/${videoId}`,
    RTSP_STREAM: () => `${wsApiUrl}/ws/rtspStream`,
  },
  VIOLATIONS: {
    GET: (videoId: string) => `${apiUrl}/violations/${videoId}`,
  },
  VIDEOS: {
    GET: () => `${apiUrl}/videos`,
    GET_BY_ID: (videoId: string) => `${apiUrl}/videos/${videoId}`,
  },
  RTSP: {
    RTSP_URL: () => `${rtspApiUrl}/stream?rtsp_transport=udp`,
  },
} as const
