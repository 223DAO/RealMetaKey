import { Card } from 'antd';

import './granted.css';

function Granted() {
    const handleGrant = () => {
        console.log('grant');
    };

    return (
        <div className="App-granted-page">
            <div className="App-granted-page_tooltip">
                Grant with superfluid, and you can cancel the flow any time if you change your mind.
            </div>
            <div className="App-granted-page_cards">
                <Card title="Contribute 0.01 Matic for Stage 1" extra={<a href="#" onClick={handleGrant}>Grant</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Contribute 0.05 Matic for Stage 1" extra={<a href="#" onClick={handleGrant}>Grant</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Contribute 0.1 Matic for Stage 1 & Stage 2" extra={<a href="#" onClick={handleGrant}>Grant</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        </div>
    );
}

export default Granted;