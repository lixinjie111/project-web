import httpaxios from '@/utils/http'

export function handleGetUserTask(data){
  return httpaxios.get('/business/summary/userTask', {
    data,
    headers: {'Content-Type': 'application/json'}
  })
}