import { paginated } from '@/adapters/Data.adapter';
import { Context } from '@/context/Context';
import { useContext } from 'react'
import { useState } from 'react'
import styles from './Paginated.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface IProps {
    pageQuantity: number,
}

const Paginated = ({ pageQuantity }: IProps) => {

    const { dispatch } = useContext(Context)
    const [page, setPage] = useState(1)


    const previousPage = () => {
        let prevPage = page > 0 ? page - 1 : 0
        const { data } = paginated(prevPage)
        setPage(prevPage)
        dispatch({type: 'GET_COMMENTS', payload: data})
    }

    const nextPage = () => {
        let nextPage = page <= pageQuantity ? page + 1 : pageQuantity
        const { data } = paginated(nextPage)
        setPage(nextPage)
        dispatch({type: 'GET_COMMENTS', payload: data})
    }

    return (
        <div className={styles.paginated_container}>
            <span>
                Pág.{" "} <strong>{page} de {pageQuantity}</strong>{" "}
            </span>
            <span className="ms-sm-auto ">
                <button
                    role='prev-page'
                    onClick={previousPage}
                    disabled={page === 1}
                >
                    <ArrowBackIosNewIcon style={{color: page === 1 ? 'rgba(128, 128, 128, 0.229)' : '#00a4ba95'}} />
                </button>
                <button
                    role='next-page'
                    onClick={nextPage}
                    disabled={!(page < pageQuantity)}
                >
                    <ArrowForwardIosIcon style={{color: !(page < pageQuantity) ? 'rgba(128, 128, 128, 0.229)' : '#00a4baa4'}} />
                </button>
            </span>
        </div>
    )
}

export default Paginated