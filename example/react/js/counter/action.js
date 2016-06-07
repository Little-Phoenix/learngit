export const INCREASE = 'INCREASE'
export const REDUCE = 'REDUCE'

export function increment(){
  return {type: INCREASE}
}

export function decrement(){
  return {type: REDUCE}
}

//主要是判断页面有几个状态
