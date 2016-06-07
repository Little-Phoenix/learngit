export const SHOW_INFO = "SHOW_INFO"
export const HIDE_INFO = 'HIDE_INFO'

export function showInfo(text){
  return {type: SHOW_INFO, text}
}

export function hideInfo(text){
  return {type: HIDE_INFO, text}
}

//主要是判断页面有几个状态
