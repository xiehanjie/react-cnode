import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './style.less'
import { getTopics } from '../../store/actions/topics'
const tabs = [
    {title: '全部', value: 'all'},
    {title: '精华', value: 'good'},
    {title: '分享', value: 'share'},
    {title: '问答', value: 'ask'},
    {title: '招聘', value: 'job'},
]
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: tabs,
            scrollStart: true,
            tab: 'all',
            page: 1
        }
        // 绑定this的指向
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount() {
        // 返回时直接获取store数据不用重新请求
        this.props.topics.length == 0 ? this.props.getTopics({tab: 'all', page: 1}) : this.setState({
            page: this.props.page,
            tab: this.props.tab
        })
        // 绑定滚动事件
        window.addEventListener('scroll', this.handleScroll)
    }
    
    componentWillUnmount() {
        // 卸载滚动事件
        window.removeEventListener("scroll", this.handleScroll)
    }

    componentWillReceiveProps() {
        // 下拉状态 ： 开
        this.setState({
            scrollStart: true
        })
    }
    render() {
        return (
            <div>
                <div className="nav-box">
                    { this.state.nav.map((item, key) => 
                        <a 
                            className={this.state.tab == item.value ? 'nav-act' : ''}
                            key={key} 
                            onClick={this.tabs.bind(this, item.value)}
                        >
                            {item.title}
                        </a>
                    )}
                </div>
                <div className='list-box'>
                    {this.props.topics ? this.props.topics.map((item, key) => 
                        <Link to={`/detail/${item.id}`} className='list-box-li' key={key}>
                            <div className='list-box-li-top'>
                                <img className='list-box-li-img' src={item.author.avatar_url}/>
                                <div className='list-box-li-text'>
                                    <div className='list-box-li-title'>{item.title}</div>
                                    <div className='list-box-li-type' >
                                        <span 
                                            style={{
                                                background: item.tab == 'share' ? '#53dc9b' : item.tab == 'ask' ? '#fbf173' : item.good == 'good' ? '#dc5353' : '#49a0f9'
                                            }}
                                        >
                                            {item.tab == 'good' ? '精华' : item.tab == 'share' ? '分享' : item.tab == 'ask' ? '问答' : '招聘'}
                                        </span>
                                        { item.top && <span style={{background: '#dc5353',marginLeft: '20px'}}>置顶</span> }
                                    </div>
                                </div>
                            </div>
                            <div className='list-box-li-bottom'>
                                <div>{item.reply_count}/{item.visit_count}</div>
                                <div>{item.time}</div>
                            </div>
                        </Link>
                    ) : ''}
                </div>
            </div>
        )
    }
    // 切换主题
    tabs(value) {
        if(this.state.tab != value) {
            // scroll返回顶部
            document.documentElement.scrollTop = 0
            // 页数初始化
            this.setState({
                tab: value,
                page: 1
            })
            // 请求新主题数据
            this.props.getTopics({tab: value, page: 1})
        }
    } 

    handleScroll() {
        const top = document.body.scrollTop || document.documentElement.scrollTop
        const windowHeight = document.documentElement.clientHeight
        const bodyHeight = document.body.offsetHeight

        const {scrollStart, tab, page} = this.state

        if(Math.ceil(top + windowHeight) >= bodyHeight) {
            scrollStart && this.setState({
                scrollStart: false,
                page: page + 1
            }, () => {
                // 加载下拉数据
                this.props.getTopics({tab: tab, page: page + 1})
                
            })
        }
        
    }
}

const mapStateToProps = state => ({ topics: state.topics.data, tab: state.topics.tab, page: state.topics.page})

const mapDispatchToProps = {
    getTopics
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)