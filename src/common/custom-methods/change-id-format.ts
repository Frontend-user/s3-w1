export const changeIdFormat = (obj: any) => {
    obj.id = obj._id
    delete obj._id
    return obj
}

export const deleteMongoUserId = (obj: any) => {
    delete obj._id
    delete obj.userId
    return obj
}