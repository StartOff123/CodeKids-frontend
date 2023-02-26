import React from 'react'
import style from '../Reports.module.scss'
import moment from 'moment'
import loading from '../../../assets/loading2.svg'
import { useSelector } from 'react-redux'

const Table = ({ reports }) => {
    const { studentsArr, status } = useSelector(state => state.students)
    const isStudentsLoading = status === 'loading'

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
                        <td>{isStudentsLoading 
                            ? <img src={loading} alt="loading" style={{ height: 20 }} /> 
                            : studentsArr.filter(student => student._id === report.student)[0].name + ' ' + studentsArr.filter(student => student._id === report.student)[0].surname}
                        </td>
                        <td>{moment(report.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table