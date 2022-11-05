import ErrorMassage from "../errorMassage/ErrorMassage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <ErrorMassage></ErrorMassage>
            <Link to="/">Back to main page</Link>
        </div>
    )
}


export default Page404;