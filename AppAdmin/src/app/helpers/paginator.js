export const Paginator = ({ data = [] , step = 0, page = 0 }) => {
    let _data = []
    let limit = step + 1
    for(let index = step * page; index < limit * page ; index++){
        if(data[index]){
            _data.push(data[index])
        }
    }    
    return _data

}