import instance from '../../utils/api'

export const TOPICS = 'topics'

import { Toast, Modal } from 'antd-mobile'

export const dataTopics = data => {
    return {
        type: TOPICS,
        ...data
    }
}

export const getTopics = (param = {}) => (dispatch, getState) => {
    Toast.loading('加载中...', 0)
    instance.get('topics', {params: {...param, limit: 10}}).then(res => {
        if(param.page > 1) {
            const resData = getState()
            dispatch(dataTopics({data: resData.topics.data.concat(res.data.data), ...param}))
        }else{
            dispatch(dataTopics({data: res.data.data, ...param}))
        }
        Toast.hide()
    }).catch(err => {
        Toast.hide()
        console.log(err)
    })
}

