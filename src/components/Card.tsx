import React from "react";

interface CardProps{
    children:React.JSX.Element[] | React.JSX.Element
    }

export default function Card(props:CardProps){
    return (
        <div className="dark:bg-[--dark-lead-color] bg-white/75 dark:text-white rounded-md py-3 px-5 w-80 mt-5">
            {props.children}
</div>
    )
}