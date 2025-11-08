import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkAuthentication } from './auth'
import api from '../api'

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Authentication Endpoints Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('checkAuthentication function', () => {
    it('should verify user authentication status', async () => {
      const mockResponse = { authenticated: true }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await checkAuthentication()

      expect(api.get).toHaveBeenCalledWith('/authentication')
      expect(result).toEqual(mockResponse)
    })

    it('should return complete authentication data including user information', async () => {
      const mockResponse = {
        authenticated: true,
        user: { id: 1, name: 'Test User' },
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await checkAuthentication()

      expect(result).toEqual(mockResponse)
    })
  })
})

