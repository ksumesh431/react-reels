//INTERSECTION OBSERVER API

import React, { useEffect, useState } from 'react'
import vid1 from './fashion.mp4'
import vid2 from './frog.mp4'
import vid3 from './tree.mp4'
import vid4 from './water.mp4'

import Video from './Video'

function Ioa() {
    const [sources, setSources] = useState([{ url: vid1 }, { url: vid2 }, { url: vid3 }, { url: vid4 }])

    // INTERSECTION OBSERVER `````````````````````
    const callback = (entries) => {

        entries.forEach(async (element) => {
            try {
                console.log(element);
                let el = element.target.childNodes[0];

                //set play on all videos as it is asynchronus and returns a promise
                //after play promise is fullfilled... pause(synchronus) the ones which are not in viewport using Inter. Observer

                await el.play();
               
                if (!element.isIntersecting) {
                    el.pause();
                }

            } catch (err) {
                console.log(err);
            }
        })

    }
    const options = {
        threshold: 0.9
    }
    const observer = new IntersectionObserver(callback, options);
    // ```````````````````````````````````````````


    //Set observer on all video elements
    useEffect(() => {
        console.log('Effect');

        let elements = document.querySelectorAll('.videos');
        elements.forEach(el => {
            observer.observe(el)
        })

    }, [])

    
    return (
        <div className='video-container'>
            <div className='videos'>
                <Video source={sources[0].url} />
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />

            </div>
            <div className='videos'>
                <Video source={sources[2].url} />

            </div>
            <div className='videos'>
                <Video source={sources[3].url} />

            </div>

        </div>
    )
}

export default Ioa
