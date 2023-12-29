export const Validate = ( value ) => {
    return value.split(" ").join("").length > 1 ? true : false
}