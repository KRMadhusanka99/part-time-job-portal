
export const handleError = (res, message, error) => {
    console.log(error)
    res.status(500).json({ message, error })
}