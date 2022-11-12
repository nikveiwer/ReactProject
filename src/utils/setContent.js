import Spinner from '../components/spinner/Spinner';
import ErrorMassage from '../components/errorMassage/ErrorMassage';
import Skeleton from "../components/skeleton/Skeleton"



const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return <Skeleton/>;
            break;
        case "loading":
            return <Spinner/>;
            break;
        case "confirmed":
            return <Component data={data}/>;
            break;
        case "error":
            return <ErrorMassage/>;
            break;
        default:
            throw new Error("Unexpected process state")
        
    }
}


export default setContent;