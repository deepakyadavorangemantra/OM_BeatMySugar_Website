import React from 'react';
import Menu from './Header'
import Footer from './Footer'

class Yoga extends React.Component
{
    render()
    {
        return(
            <div>
                <Menu></Menu>
                <main>
                    <div class="container doctors-section" >
                    <h3 class="section-title">Yoga</h3>
                    <div style={{background:"#fff"}}>
                    <img src="assets/images/comingsoon.jpg" style={{width:"700px",marginLeft:"auto",marginRight:"auto"}}></img>
                    </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        )
    }
} 

export default Yoga;