import React, { Component } from 'react'
import styles from './index.module.less'
export class Index extends Component {
    constructor(props) {
        super(props)
        let date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            pday: null,
            cday: null
        }


    }
    componentDidMount() {
        this.initData();
    }
    initData = (iyear, imonth) => {
        let { year, month } = this.state;
        year = iyear ? iyear : year;
        month = imonth ? imonth : month;
        //获取上个月天数
        let pdayc
        if (month === 1) {
            pdayc = new Date(year - 1, 12, 0)
        } else {
            pdayc = new Date(year, month - 1, 0)
        }

        //获取最后一天是星期几
        let pdays = new Array(pdayc.getDay()).fill(1);
        let pday = pdays.map((item, index) => {
            return pdayc.getDate() - index
        }).sort(function (a, b) {
            return a - b
        })

        //获取这个月一共有多少天
        let cdayc = new Date(year, month, 0)
        let cdays = new Array(cdayc.getDate()).fill(1);
        let cday = cdays.map((item, index) => {
            return cdayc.getDate() - index
        }).sort(function (a, b) {
            return a - b
        })

        //获取下个月第一天星期几
        let ndays;
        if (month === 12) {
            ndays = new Array(8 - new Date(`${year + 1}-1-1`).getDay()).fill(1);
        } else {
            ndays = new Array(8 - new Date(`${year}-${month + 1}-1`).getDay()).fill(1);
        }
        let nday = ndays.map((item, index) => {
            return ++index;
        })
        this.setState({
            pday,
            cday,
            nday
        })
    }
    nextfunc = () => {
        let { year, month } = this.state;
        if (month >= 12) {
            this.setState({
                month: 1,
                year: ++year
            }, () => {
                this.initData(this.state.year, this.state.month)
            })
        } else {
            this.setState({
                month: ++month
            }, () => {
                this.initData(null, this.state.month)
            })
        }

    }
    prevfunc = () => {
        let { year, month } = this.state;
        if (month <= 1) {
            this.setState({
                month: 12,
                year: --year
            }, () => {
                this.initData(this.state.year, this.state.month)
            })
        } else {
            this.setState({
                month: --month
            }, () => {
                this.initData(null, this.state.month)
            })
        }
    }
    gotoday = () => {
        let date = new Date();
        this.setState({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        })
    }
    render() {
        let week = ['一', '二', '三', '四', '五', '六', '日']
        let { year, month, day, pday, cday, nday } = this.state;
        let date = new Date();
        return (
            <div className={styles.calendar}>
                <div className={styles.calendarTop}>
                    <div className={styles.calendarTopBtn} onClick={this.prevfunc}><i className="iconfont icon-fenyeshangyiye"></i></div>
                    <div className={styles.calendarToptext}><p>{year}年{month}月</p><span onClick={this.gotoday}>今</span></div>
                    <div className={styles.calendarTopBtn} onClick={this.nextfunc}><i className="iconfont icon-fenyeshangyiye1"></i></div>
                </div>
                <ul className={styles.calendarWeek}>
                    {
                        week.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
                <ul className={styles.calendarDay}>
                    {
                        pday && pday.map((item, index) => {
                            return <li key={index} className={styles.pday}>{item}</li>
                        })
                    }
                    {
                        cday && cday.map((item, index) => {
                            return <li key={index} className={day === item && month === date.getMonth() + 1 && year === date.getFullYear() ? styles.cenday : null}>{item}</li>
                        })
                    }
                    {
                        nday && nday.map((item, index) => {
                            return <li key={index} className={styles.nday}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Index
