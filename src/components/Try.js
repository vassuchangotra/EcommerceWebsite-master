import React from 'react';
import BackgroundSlider from 'react-background-slider';
import Navnav from './Navnav';
function Try() {
    const img=process.env.PUBLIC_URL + `/image/womom.jpg`
    const img1=process.env.PUBLIC_URL + `/image/womom1.jpg`
    const img2=process.env.PUBLIC_URL + `/image/mon.jpg`
    const img3=process.env.PUBLIC_URL + `/image/mon1.jpg`
    return (
        <header>
            <Navnav/>
            <BackgroundSlider style={{height:"100vh"}} images={[img, img1,img2,img3]} duration={10} transition={2} />
        </header>
    )
}

export default Try
