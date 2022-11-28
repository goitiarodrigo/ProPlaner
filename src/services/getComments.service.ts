import { paginated } from "@/adapters/Data.adapter"
import axios from "axios"

export let ALL_COMMENTS: any[] = []

export const handleGetCommentsService = async () => {
    const response: any = await axios.get('https://jsonplaceholder.typicode.com/comments')
    ALL_COMMENTS = [...response.data]
    const { data } = paginated(1)
    return data
}