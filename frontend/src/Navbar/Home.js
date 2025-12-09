import React from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../Assets/CSS/Home.css'

function Home() {
  return (
    <div id='home'>
    <Container className="mt-4">
  <Row>
    <Col md={6}>
      <Card className="border-0 shadow-none">
        <Card.Body>
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            
          
            <img src='./gym/1.jpg' className='img1' alt="Base" />
            <img src='./gym/22.jpg' className='img2' alt="Overlay" />
          
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Column 2 */}
    <Col md={6}>
      <Card className="border-0 shadow-none">
        <Card.Body style={{ 
          paddingTop:'100px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }} >
        
         <p className="fade-text delay-1">Welcome to...!</p>
          <h1 className="fade-text delay-3">Fitness Club ❚█══█❚</h1>
          <p className="fade-text delay-4">
            "Everything you need for your fitness journey is available here — 
            from top-quality gym equipment to expert guidance, all in one place."
          </p>
             </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

    </div>
  )
}

export default Home
