import React from 'react'
import style from '../Reports.module.scss'
import moment from 'moment'
import loading from '../../../assets/loading2.svg'

const Table = ({ reports }) => {
    return (
        <table className={style.table}>
            <thead>
                <th>№</th>
                <th>Тема</th>
                <th>Описание</th>
                <th>Учитель</th>
                <th>Ученик</th>
                <th>Дата</th>
            </thead>
            <tbody>
                {reports.slice().reverse().map((report, index) =>
                    <tr key={report._id}>
                        <td>{reports.length - index}</td>
                        <td>{report.title}</td>
                        <td>{report.theme === '' ? '<отсутсвует>' : report.theme}</td>
                        <td>{report.teacher}</td>
                        <td>{report.student}</td>
                        <td>{moment(report.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table