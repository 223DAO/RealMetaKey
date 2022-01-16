import { Card, Row, Col } from 'antd';

import './granted.css';

const cardsData = [
    {
        title: 'Contribute 0.01 Matic for Stage 1', 
        content: 'You will get a silver NFT, can redeem 1 key'
    },
    {
        title: 'Contribute 0.05 Matic for Stage 1', 
        content: 'You will get a gold NFT, can redeem 6 keys'
    },
    {
        title: 'Contribute 0.1 Matic for Stage 1 & Stage 2', 
        content: 'You will get two gold NFT, can redeem 2*6 keys'
    },
];

function Granted() {
    const handleGrant = () => {
        console.log('grant');
    };

    const cardItems = cardsData.map((card, index) => {
        return (
            <Col span={8} key={index}>
                <Card title={card.title} extra={<a href="#" onClick={handleGrant}>Grant</a>} className='App-granted-page_card'>
                    {card.content}
                </Card>
            </Col>
        )
    })

    return (
        <div className="App-granted-page">
            <div className="App-granted-page_tooltip">
                Grant with superfluid, and you can cancel the flow any time if you change your mind.
            </div>
            <Row gutter={[16, 16]} className="App-granted-page_cards">
                { cardItems }
            </Row>
        </div>
    );
}

export default Granted;