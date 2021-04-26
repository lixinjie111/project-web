import httpaxios from '@/utils/http'

export function getUserInfo() {
    return httpaxios.get('', {})
}