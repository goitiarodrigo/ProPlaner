const regexTypes = {
    email: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
}

const errorTypes = {
    email: 'The email type is incorrect',
    password: 'Must contain at least 6 digits, letters and numbers'
}

export const validateData = (data: string, typeData: string): string | undefined => {
    if (data.length === 0) return 'You must complete all fields'
    const regex = new RegExp(regexTypes[typeData])
    const isValid = regex.test(data)
    if (!isValid) return errorTypes[typeData]
}