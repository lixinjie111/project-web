import httpaxios from '@/utils/http'

export function getHomeInit() {
    return httpaxios.get('', {})
}