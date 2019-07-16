import React, { Component } from 'react'
import { Toast, Modal } from 'antd-mobile'
import instance from '../../utils/api'
import './style.less'
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        this.detailData(id)
    }
    goBack() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <div className="home-title">
                    <a onClick={this.goBack.bind(this)}>
                        <svg t="1515032582529" viewBox="0 0 1024 1024" version="1.1" p-id="2903">
                            <path d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z" p-id="2904"></path>
                        </svg>
                    </a>
                    <h1>详情</h1>
                </div>
                <div className="detail-box">
                    <div className="detail-title">
                        <h1>{this.state.data.title}</h1>
                        <p>
                            <span>• 发布时间：{this.state.data.create_at && this.state.data.create_at.split('T')[0]}</span>
                            <span>• 作者：{this.state.data.author && this.state.data.author.loginname}</span>
                            <span>• {this.state.data.visit_count} 人浏览</span>
                            <span>• 主题：{this.state.data.tab}</span>
                        </p>
                    </div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html: this.state.data.content }}>

                    </div>
                    <div className="detail-reply">
                        <div className="detail-reply-title">
                            {this.state.data.reply_count} replies
                        </div>
                        <div className="detail-reply-list">
                            {this.state.data.replies && this.state.data.replies.map((data, index) => (
                                <li key={index}>
                                    <div className="detail-reply-list-user">
                                        <img src={data.author.avatar_url} />
                                        <span>{data.author.loginname}</span>
                                        <span>{data.create_at.split('T')[0]}•{index + 1}楼</span>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: data.content }}>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    detailData(id) {
        Toast.loading('加载中...', 0)
        instance.get(`topic/${id}`, { params: {} }).then(res => {
            this.setState({
                data: res.data.data
            })
            Toast.hide()
        }).catch(err => {
            Toast.hide()
            console.log(err)
        })
    }
}

export default Detail

