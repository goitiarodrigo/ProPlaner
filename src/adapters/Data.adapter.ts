import { ALL_COMMENTS } from "@/services/getComments.service"

const dataAdapter = (dataArray: any) => {
    let newDataArray: any[] = []
    for (let i = 0; i < dataArray.length; i++) {
        newDataArray = [...newDataArray, {
            id: dataArray[i].id,
            name: dataArray[i].name,
            email: dataArray[i].email,
            body: dataArray[i].body
        }]
    }
    return newDataArray
}

export const paginated = (nextPage: number) => {
    const currentData = ALL_COMMENTS?.slice((nextPage-1)*100, nextPage*100)
    return {
        data: dataAdapter(currentData),
        pages: ALL_COMMENTS.length / 100,
    }
}