import React from 'react'
import ReactDOM from 'react-dom';

function Video(props) {
    const handleAutoScroll = e => {
        let next = ReactDOM.findDOMNode(e.target).nextSibling;
        if (next) {
            next.scrollIntoView({ behaviour: 'smooth' });
            e.target.muted = true;
        }

    }
    const handleMute = e => {
        e.preventDefault();

        e.target.muted = !e.target.muted;
    }
    return (
        <video
            onEnded={handleAutoScroll}
            src={props.source}
            className='videos'
            onClick={handleMute}
            muted='muted'
            type='video/mp4'
            style={{
                marginBottom:'10px',
                marginTop:'10px'
            }}
            
        ></video>
    )
}

export default Video
