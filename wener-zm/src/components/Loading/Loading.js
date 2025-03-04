import React from 'react'
import { BeatLoader, BounceLoader } from 'react-spinners'

function Loading() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <BeatLoader loading color='#212529' size={40}></BeatLoader>
            {/* <BounceLoader loading color='orange' size={50}></BounceLoader> */}
        </div>
    )
}

export default Loading
