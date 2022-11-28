import { useContext, useMemo } from 'react'
import { useQuery  } from 'react-query'
import { handleGetCommentsService } from '@/services/getComments.service'
import { paginated } from '@/adapters/Data.adapter'
import styles from './Dashboard.module.scss'
import Loader from '@/components/common/loader/Loader'
import DynamicTable from '@/components/common/dynamicTable/DynamicTable'
import { insertComponent } from '@/utils/insertComponent'
import { Context } from '@/context/Context'
import Paginated from '@/components/paginated/Paginated'




const Dashboard = () => {

    const columns = useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'id', // accessor is the "key" in the data
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Open',
            accessor: 'user_open',
          },
        ],
        []
    )

    const handleGetComments = async () => {
        const response = await handleGetCommentsService()
        dispatch({type: 'GET_COMMENTS', payload: response})
        return response
    }

    const { dispatch, allComments } = useContext(Context)
    const response = useQuery(['getComments'], handleGetComments)

    if (response.isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={styles.dashboard_container}>
            <div className={styles['table-filter_container']}>
                <span className={styles.title}>ProDashboard</span>
                <DynamicTable columns={columns} rowData={insertComponent(allComments)}/>
            </div>
        </div>
    )
}

export default Dashboard