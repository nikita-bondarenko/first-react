export const getPageCount = (totalCount, limit) => {
return Math.ceil(totalCount/limit)
}

export const getPagesArray = (totalPages) => {
    const res = []
   for(let i = 0 ; i < totalPages; i ++) {
       res.push(i+1)
   }
    return res
}