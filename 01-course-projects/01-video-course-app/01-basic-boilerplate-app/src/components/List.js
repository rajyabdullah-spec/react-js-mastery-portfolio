import React from "react";
import Button from "./Button";

function List(props) {
    return (
        <div>
            <ul>
                {
                props.data && props.data.map( val => {
                    return (
                        <li>{val}</li>
                    )
                })
                }
            </ul>
            <Button title="from list" />
        </div>
    );
}

export default List;