import React from 'react'
import styled from 'styled-components'


export default function ArticlesList({articles}){
    return(    
        <ul>
            {articles.map(e=>(
                <li key={e.objectID}>
                    <a href={e.url} target="_blank" rel="noreferrer" >
                        {e.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}