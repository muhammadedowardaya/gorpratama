import { useState } from "react";
import Loading from "./Loading";

export default function PageLoading() {
    const [show, setShow] = useState(false);

    setShow(true);
    document.body.onload = () => {
        setShow(false);
    };

    return <Loading display={show} />;
}
