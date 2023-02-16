import React from 'react'
import style from '../Home.module.scss'
import remider from '../../../assets/remider.png'
import full from '../../../assets/full.png'
import remove from '../../../assets/remove.png'
import { useDispatch } from 'react-redux'
import { fetchRemider, fetchRemoveRemider } from '../../../redux/slices/remiders'
import Popup from 'reactjs-popup'
import FullRemider from '../../../components/FullRemider'

const Remider = ({ item }) => {
    const dispatch = useDispatch()
    const onRemove = async () => {
        await dispatch(fetchRemoveRemider(item._id))
        dispatch(fetchRemider())
    }

    return (
        <div className={style.remider}>
            <div className={style.titleRemider}>
                <div className={style.left}>
                    <img src={remider} alt="remider" />
                    <h1>{item.title}</h1>
                </div>
                <div className={style.right}>
                    <Popup
                        position='center center'
                        trigger={<img src={full} alt="full" />}
                        modal
                    >
                        {close => <FullRemider remider={item} onClose={close}/>}
                    </Popup>
                    <img src={remove} alt="remove" onClick={onRemove} />
                </div>
            </div>
            <div>
                <p>{item.content}</p>
            </div>
        </div>
    )
}

export default Remider