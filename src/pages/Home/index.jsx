import React from "react"
import { useSelector } from "react-redux"
import Popup from "reactjs-popup"
import AddRemider from "../../components/forms/AddRemider"
import TitleButton from '../../UI/Buttons/TitleButton'
import style from "./Home.module.scss"
import Remider from "./HomeComponents/Remider"
import loading from '../../assets/loading2.svg'

const Home = () => {
    document.title = "CodeKids"
    const { data } = useSelector((state) => state.auth)
    const { remidersArr, status } = useSelector((state) => state.remiders)
    const isRemiderLoading = status === 'loading'

    return (
        <div className={style.home}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Добрый день, {data.name}!</h1>
                    <p>Рабочий стол</p>
                </div>
                <div className={style.buttons}>
                    <Popup
                        position="center center"
                        trigger={
                            <TitleButton
                                content="Создать заметку"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                }
                            />
                        }
                        modal
                    >
                        {(close) => <AddRemider onClose={close} />}
                    </Popup>
                </div>
            </div>
            <div className={style.reminderPanel} style={remidersArr && remidersArr.length == 0 ? { display: 'block', textAlign: 'center' } : {}}>
                {remidersArr &&
                    !isRemiderLoading ?
                    remidersArr.length == 0 ? <h2>Создайте новую заметку</h2>
                        : remidersArr.map((remider) =>
                            <Remider key={remider._id} item={remider} />
                        )
                    : <img className={style.load} src={loading} alt="" style={{ gridColumnStart: 2, margin: '0 auto' }} />
                }
            </div>
        </div>
    );
};

export default Home
