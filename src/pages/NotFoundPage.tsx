//TODO
import {Link} from "react-router";

function NotFoundPage() {
    return (
        <div>
            <h2> Page not found</h2>
            <p>404</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default NotFoundPage;