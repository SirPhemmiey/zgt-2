import Interest from "../../models/interest";
import Lead from "../../models/lead"

const isDevelopment = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Lead.sync({ alter: isDevelopment });
    Interest.sync({ alter: isDevelopment });
}

export default dbInit;