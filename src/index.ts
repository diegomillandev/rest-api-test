import colors from 'colors'
import server from './server'
import { PORT } from './constants/env'

server.listen(PORT, () => {
    console.log( colors.cyan.bold( `Server running on port ${PORT}` ))
})