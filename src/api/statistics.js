import httpaxios from '@/utils/http'

export function handleGetUserTask(data){
  return httpaxios.post('/business/summary/userTask', {data})
}